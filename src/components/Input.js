import React from "react";
import {FormContext} from "../contexts/FormContext";

function Input(props) {
  const [errorText, setErrorText] = React.useState('')
  const formContext = React.useContext(FormContext)
  const inputElement = React.createRef()

  React.useEffect(() => {
    if(inputElement.current.validity.valid) {
      formContext.saveValidationResult(props.name, true)
      setErrorText('')
    } else {
      formContext.saveValidationResult(props.name, false)
      setErrorText(inputElement.current.validationMessage)
    }
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
        ref={inputElement}
        required
      />
      <span
        className={props.errorClassName}
      >
        {errorText}
      </span>
    </>
  )
}

export default Input
