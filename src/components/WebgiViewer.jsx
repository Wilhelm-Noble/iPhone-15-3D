import React, {
  useRef,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import {
  ViewerApp,
  AssetManagerPlugin,
  GBufferPlugin,
  ProgressivePlugin,
  TonemapPlugin,
  SSRPlugin,
  SSAOPlugin,
  GammaCorrectionPlugin,
  mobileAndTabletCheck,
  BloomPlugin
} from "webgi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollAnimation } from "../lib/scroll-animation";



gsap.registerPlugin(ScrollTrigger);


const  WebgiViewer = forwardRef((props,ref)=>{
    const canvasRef = useRef(null);
    const [viewerRef, setViewerRef] = useState(null);
    const [targetRef, setTargetRef] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [positionRef, setPositionRef] = useState(null);
    const canvasContainerRef = useRef(null);
    const [previewMode, setPreviewMode] = useState(false);
    const [isMobile, setIsMobile] = useState(null);

    useImperativeHandle(ref,()=>({
      triggerPreview(){
        setPreviewMode(true);
        props.contentRef.current.style.opacity = '0';
        canvasContainerRef.current.style.pointerEvents = 'all'

        gsap.to(positionRef,{
          x: 13.04,
          y:-2.01,
          z: 2.29,
          duration: 2,
          onUpdate: ()=> {
            viewerRef.setDirty();
            cameraRef.positionTargetUpdated(true);
          }
        });

        gsap.to(targetRef,{
          x: 0.11,
          y: 0.0,
          z: 0.0,
          duration: 2,
          onUpdate: ()=> {
            viewerRef.setDirty();
            cameraRef.positionTargetUpdated(true);
          }
        });

        viewerRef.scene.activeCamera.setCameraOptions({controlsEnabled: true});

      }
    }));

    
  
    const memoizedScrollAnimnation = useCallback(
      (position, target,isMobileorTablet, onUpdate) => {
          if (position && target && onUpdate) {
              scrollAnimation(position, target, isMobileorTablet, onUpdate);
          }
      },[]
    )
  
    const setupViewer = useCallback(async () => {
      const viewer = new ViewerApp({
        canvas: canvasRef.current,
      });

      setViewerRef(viewer);
      const isMobileorTablet = mobileAndTabletCheck();
      setIsMobile(isMobileorTablet);
  
      const manager = await viewer.addPlugin(AssetManagerPlugin);
  
      const camera = viewer.scene.activeCamera;
      const position = camera.position;
      const target = camera.target;

      setCameraRef(camera);
      setPositionRef(position);
      setTargetRef(target);
  
      await viewer.addPlugin(GBufferPlugin);
      await viewer.addPlugin(new ProgressivePlugin(32));
      await viewer.addPlugin(new TonemapPlugin(true));
      await viewer.addPlugin(GammaCorrectionPlugin);
      await viewer.addPlugin(SSRPlugin);
      await viewer.addPlugin(SSAOPlugin);
      await viewer.addPlugin(BloomPlugin);
  
      viewer.renderer.refreshPipeline();
  
      await manager.addFromPath("iphone15.glb");
      viewer.getPlugin(TonemapPlugin).config.clipBackground = true;
  
      viewer.scene.activeCamera.setCameraOptions({ controlsEnabled: false });
  

      if(isMobileorTablet){
        position.set(0.06, -1.07,-10.28);
        target.set(0,0.09,0.03);
        props.contentRef.current.className = 'mobile-or-tablet';
      }
      window.scrollTo(0, 0);
  
      let needsUpdate = true;
  
      const onUpdate = () => {
        needsUpdate = true;
      };
  
      viewer.addEventListener("preFrame", () => {
        if (needsUpdate) {
          camera.positionTargetUpdated(true);
          needsUpdate = false;
          viewer.setDirty();
        }
      });
      
      memoizedScrollAnimnation(position, target, isMobileorTablet, onUpdate);
    }, []);
  
    useEffect(() => {
      setupViewer();
    }, []);

    const handleExit = useCallback(()=>{
      props.contentRef.current.style.opacity = '1';
      canvasContainerRef.current.style.pointerEvents = 'none'
      viewerRef.scene.activeCamera.setCameraOptions({controlsEnabled: false});
      setPreviewMode(false);


      //needs changing 
      gsap.to(positionRef,{
        x: !isMobile ? -0.01 : -0.05, 
        y: !isMobile ? 5.43 :  7.21,
        z: !isMobile ? 2.05 : 10.18,
        scrollTrigger: {
            trigger: '.display-section', //the targeted section in which animation takes place
            start: 'top bottom',//starts animation when top of sound section and bottom of viewport meets 
            end: 'top top', //when the top of the viewport and the top of the sound section meets. the animation will end
            scrub: 2,
            immediateRender: false
        },
        onUpdate: ()=>{
          viewerRef.setDirty();
          cameraRef.positionTargetUpdated(true);
        }
    })

    gsap.to(targetRef,{
        x: !isMobile ? 0.01 : 0.01,
        y: !isMobile ? 1 : 1,
        z: !isMobile ? -0.16 :  -0.14,
        scrollTrigger: {
            trigger: '.display-section', //the targeted section in which animation takes place
            start: 'top bottom',//starts animation when top of sound section and bottom of viewport meets 
            end: 'top top', //when the top of the viewport and the top of the sound section meets. the animation will end
            scrub: 2,
            immediateRender: false
        },
    })
      

    },[canvasContainerRef,viewerRef,positionRef,cameraRef,targetRef]); 
    return (
      <div  ref= {canvasContainerRef} id="webgi-canvas-container">
        <canvas id="webgi-canvas" ref={canvasRef} />
        {
          previewMode && (
            <button className="button" onClick={handleExit}>Exit</button>)
        }
      </div>
    );
  }

) 

export default WebgiViewer;
