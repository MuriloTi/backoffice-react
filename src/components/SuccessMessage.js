import React from "react";

export default function SuccessMessage(props){
    return (
        <span className="text-success m-1">
            <img className="small-icon" src="../img/check.png" title="Success" alt="Success" />
            <span className="m-1">{props.msg}</span>
        </span>
    );
}