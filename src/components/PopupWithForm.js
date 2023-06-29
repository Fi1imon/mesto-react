import React from "react";

function PopupWithForm(props) {

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
              {props.children}
            <button disabled={!props.isValid} className={`popup__submit-button ${!props.isValid ? "popup__submit-button_disabled" : ""}`} type="submit">{props.buttonText}</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default PopupWithForm
