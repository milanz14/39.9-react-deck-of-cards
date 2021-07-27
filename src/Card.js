import React from "react";
import "./Card.css";

const Card = (props) => {
    return (
        <div className="Card">
            <img src={props.image}></img>
        </div>
    );
};

export default Card;
