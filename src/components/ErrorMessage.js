import React from "react";

export default function ErrorMessage(props){
    return (
        <span className="text-danger m-1">
            <img className="small-icon" src="../img/x-button.png" title="Error" alt="Error" />
            <span className="m-1">{props.msg}</span>
        </span>
    );
}