import React from "react";
import {FormContext} from "../contexts/FormContext";

function Input(props) {
  const formContext = React.useContext(FormContext)

  React.useEffect(() => {
    formContext.onInputChange(props.value, props.name)
  }, [props.value])

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
        required
      />
      <span
        className={props.errorClassName}
      />
    </>
  )
}

export default Input
