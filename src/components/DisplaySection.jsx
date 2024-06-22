import React from "react";

function DisplaySection ({triggerPreview}) {

    const handleScrollReset = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    }

    return (  
        <div className="display-section wrapper">
            <p className="text">Brilliant</p>
            <span className="description">Sharp Edge Pro Cinematic Camera </span>
            <button className="button" onClick = {triggerPreview} >Try me!</button>
            <button  onClick={handleScrollReset} className="back-button">Top</button>
        </div>

    );
}

export default DisplaySection;