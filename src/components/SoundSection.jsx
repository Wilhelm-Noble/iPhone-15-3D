import React from "react";

function SoundSection() {

    const handleLearnMore = () => {
        const element = document.querySelector(".display-section");
        window.scrollTo({
            top: element?.getBoundingClientRect().bottom,
            left: 0,
            behavior: "smooth"
        })
    }

    return ( 
        <div className="sound-section wrapper">
            <div className="body">
                <div className="sound-section-content content">
                    <h2 className="title">Forged in real</h2>
                    <p className="text">Titanium.</p>
                    <span className="description">Just $41.62/mo. for 24 months or $999 before trade-in </span>
                    <ul className="links">
                        <li>
                            <button className="button">Buy</button>
                        </li>
                        <li>
                            <a onClick={handleLearnMore} className="link">Learn More</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
     );
}

export default SoundSection;