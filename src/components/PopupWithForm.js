import React from "react";
import {FormContext} from "../contexts/FormContext";
// import Form from "./Form";

function PopupWithForm(props) {
  const [formValues, setFormValues] = React.useState({})
  const [isValid, setIsValid] = React.useState(false)
  const FormContextValue = { onInputChange };


  function onInputChange(value, name) {
    setFormValues(prevValues => ({
      ...prevValues,
        [name]: value
    }))
    console.log(name, value)
  }

  // function handleChange() {
  //   console.log(formsValues)
  // }


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
            // onChange={handleChange}
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
