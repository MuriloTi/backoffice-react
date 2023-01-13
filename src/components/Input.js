import React from "react";

const _default = {
    Text: (props) => {
        return (
            <div className="form-group form-floating mb-3">
                <input type="text" name={props.name} id={props.id} className="form-control" placeholder={props.label}
                    defaultValue={props.defaultValue} onChange={props.onChange} />
                <label htmlFor={props.id} className="form-label">{props.label}</label>
            </div>
        );
    },
    TextReadOnly: (props) => {
        return (
            <div className="form-group form-floating mb-3">
                <input type="text" name={props.name} id={props.id} className="form-control" placeholder={props.label}
                    value={props.value} onChange={props.onChange} readOnly />
                <label htmlFor={props.id} className="form-label">{props.label}</label>
            </div>
        );
    },
    Date: (props) => {
        return (
            <div className="form-group form-floating mb-3">
                <input type="date" name={props.name} id={props.id} className="form-control" placeholder={props.label}
                    defaultValue={props.defaultValue} onChange={props.onChange} />
                <label htmlFor={props.id} className="form-label">{props.label}</label>
            </div>
        );
    },
    Password: (props) => {
        return (
            <div className="form-group form-floating mb-3">
                <input type="password" name={props.name} id={props.id} className="form-control" placeholder={props.label}
                    defaultValue={props.defaultValue} onChange={props.onChange} />
                <label htmlFor={props.id} className="form-label">{props.label}</label>
            </div>
        );
    },
    Email: (props) => {
        return (
            <div className="form-group form-floating mb-3">
                <input type="email" name={props.name} id={props.id} className="form-control" placeholder={props.label}
                    defaultValue={props.defaultValue} onChange={props.onChange} />
                <label htmlFor={props.id} className="form-label">{props.label}</label>
            </div>
        );
    },
    Number: (props) => {
        return (
            <div className="form-group form-floating mb-3">
                <input type="number" step="0.01" name={props.name} id={props.id} className="form-control" placeholder={props.label}
                    defaultValue={props.defaultValue} onChange={props.onChange} />
                <label htmlFor={props.id} className="form-label">{props.label}</label>
            </div>
        );
    },
    TextArea: (props) => {
        return (
            <div className="form-group mb-3">
                <textarea name={props.name} id={props.id} className="form-control" placeholder={props.label}
                    defaultValue={props.defaultValue} onChange={props.onChange} rows={props.rows} ></textarea>
            </div>
        );
    },
    Radio: (props) => {
        return (
            <>
                <input type="radio" className="btn-check" name={props.name} id={props.id} value={props.value} onChange={props.onChange} checked={props.checked} autoComplete="off" />
                <label className="btn btn-outline-info" htmlFor={props.id}>{props.text}</label>
            </>
        );
    }
};

export default _default;