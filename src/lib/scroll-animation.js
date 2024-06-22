import gsap from "gsap";

export const scrollAnimation = (position,target,isMobile, onUpdate) => {
    const tl= gsap.timeline();



    //Second Section
    tl.to(position,{
        x: !isMobile ? -3.38 : -7.0,
        y: !isMobile ? -10.74: -12.2,
        z: !isMobile ? -5.93 : -6.0,
        scrollTrigger: {
            trigger: '.sound-section', //the targeted section in which animation takes place
            start: 'top bottom',//starts animation when top of sound section and bottom of viewport meets 
            end: 'top top', //when the top of the viewport and the top of the sound section meets. the animation will end
            scrub: 2,
            immediateRender: false
        },
        onUpdate
    })

    .to(target,{
        x: !isMobile ? 1.52  : 0.7,
        y: !isMobile ? 0.77  : 1.9,
        z: !isMobile ? -1.08 : 0.7,
        scrollTrigger: {
            trigger: '.sound-section', //the targeted section in which animation takes place
            start: 'top bottom',//starts animation when top of sound section and bottom of viewport meets 
            end: 'top top', //when the top of the viewport and the top of the sound section meets. the animation will end
            scrub: 2,
            immediateRender: false
        },
    })
    .to('.jumbotron-section',{
        opacity: 0,
        scrollTrigger: {
            trigger: '.sound-section', //the targeted section in which animation takes place
            start: 'top bottom',//starts animation when top of sound section and bottom of viewport meets 
            end: 'top top', //when the top of the viewport and the top of the sound section meets. the animation will end
            scrub: 2,
            immediateRender: false
        },
    })

    .to('.sound-section-content',{
        opacity: 1,
        scrollTrigger: {
            trigger: '.sound-section', //the targeted section in which animation takes place
            start: 'top bottom',//starts animation when top of sound section and bottom of viewport meets 
            end: 'top top', //when the top of the viewport and the top of the sound section meets. the animation will end
            scrub: 2,
            immediateRender: false
        },
    })


    //Third Section
    .to(position,{
        x: !isMobile ? -0.01 : -0.05,
        y: !isMobile ? 5.43 : 7.21,
        z: !isMobile ? 2.05 : 10.18,
        scrollTrigger: {
            trigger: '.display-section', //the targeted section in which animation takes place
            start: 'top bottom',//starts animation when top of sound section and bottom of viewport meets 
            end: 'top top', //when the top of the viewport and the top of the sound section meets. the animation will end
            scrub: 2,
            immediateRender: false
        },
        onUpdate
    })

    .to(target,{
        x: !isMobile ? 0.01 : 0.01,
        y: !isMobile ? 1 : 1,
        z: !isMobile ? -0.16 : -0.14,
        scrollTrigger: {
            trigger: '.display-section', //the targeted section in which animation takes place
            start: 'top bottom',//starts animation when top of sound section and bottom of viewport meets 
            end: 'top top', //when the top of the viewport and the top of the sound section meets. the animation will end
            scrub: 2,
            immediateRender: false
        },
    })
    .to('.display-section',{
        opacity: 1,
        scrollTrigger: {
            trigger: '.display-section', //the targeted section in which animation takes place
            start: 'top bottom',//starts animation when top of sound section and bottom of viewport meets 
            end: 'top top', //when the top of the viewport and the top of the sound section meets. the animation will end
            scrub: 2,
            immediateRender: false
        },
    })
}