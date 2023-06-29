import React from "react";

function Input(props) {
  const inputElement = React.createRef()

  return (
    <>
      <input
        type={props.type}
        id={props.id}
        className={props.inputClassName}
        name={props.name}
        placeholder={props.placeholder}
        minLength={props.minLength}
        maxLength={props.maxLength}
        value={props.value}
        onChange={props.handleChange}
        ref={inputElement}
        required
      />
      <span
        className={props.errorClassName}
      >
        {props.error}
      </span>
    </>
  )
}

export default Input
