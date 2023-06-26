import React from "react";
import {FormContext} from "../contexts/FormContext";

function PopupWithForm(props) {
  const [formValidation, setFormValidation] = React.useState({})
  const [isValid, setIsValid] = React.useState(false)
  const FormContextValue = { saveValidationResult };


  function saveValidationResult(inputName, isInputValid) {
    setFormValidation(prevValues => ({
      ...prevValues,
      [inputName]: isInputValid
    }))
  }

  React.useEffect(() => {
    const formValidity = Object.values(formValidation).every(i => {return  i === true})

    setIsValid(formValidity)
  }, [formValidation])

  return (
    <section className={`popup popup-${props.name} ${props.isOpened ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button onClick={props.onClose} className="popup__close-button image-button" type="button" aria-label="Закрыть"/>
        <div className="popup__form-container">
          <h2 className="popup__title">{props.title}</h2>
          <form
            className="popup__form"
            name={props.name}
            onSubmit={props.handleSubmit}
            noValidate
          >
            <FormContext.Provider value={FormContextValue} >
              {props.children}
            </FormContext.Provider>
            <button disabled={!isValid} className={`popup__submit-button ${!isValid ? "popup__submit-button_disabled" : ""}`} type="submit">{props.buttonText}</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default PopupWithForm
