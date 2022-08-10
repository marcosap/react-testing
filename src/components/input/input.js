import React from "react";

export default function Input({id, label, value, onChange, onBlur, errorMessage}) {

    return <div className="input-group">

        <label htmlFor={id}>{label}</label>

        <input
            id={id}
            data-testid={id}
            value={value}
            onChange={onChange}
        ></input>

        <div className="input-error" data-testid={`${id}-error`}>
            {errorMessage}
        </div>

    </div>
}