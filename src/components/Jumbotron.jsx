import React from "react";
import iPhone from "../assets/images/iphone-14.jpg"
import HoldingIphone from "../assets/images/iphone-hand.png"

function Jumbotron () {

    const handleLearnMore = () => {
        const element = document.querySelector(".sound-section");
        window.scrollTo({
            top: element?.getBoundingClientRect().top,
            left: 0,
            behavior: "smooth"
        })
    }

    return (  
        <div className="jumbotron-section wrapper">
                <div className="header">
                    <p className="description">All-New</p>
                    <p className="description">iPhone 15 Pro</p>
                </div>
                <ul className="links">
                    <li>
                        <a onClick={handleLearnMore} className="link">Learn More</a>
                    </li>
                </ul>
                {/* <img className="iphone-img" src={HoldingIphone} alt='iPhone'/> */}
        </div>
    );
}

export default Jumbotron;