import React from "react";

function Button(props, className) {

    return ( 
        <button type={props.type} className={className} disabled={props.disabled} onClick={props.onClick}>
            <span>{props.text}</span>
        </button>
    );
}

const _default = {
    Primary: (props) => {
        return ( 
            Button(props, "btn btn-primary btn-sm w-100")
        );
    },
    Secondary: (props) => {
        return ( 
            Button(props, "btn btn-secondary btn-sm w-100")
        );
    },
    Success: (props) => {
        return ( 
            Button(props, "btn btn-success btn-sm w-100")
        );
    },
    Warning: (props) => {
        return ( 
            Button(props, "btn btn-warning btn-sm w-100")
        );
    },
    Danger: (props) => {
        return ( 
            Button(props, "btn btn-danger btn-sm w-100")
        );
    }
};

export default _default;