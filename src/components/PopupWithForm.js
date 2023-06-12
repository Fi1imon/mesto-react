function PopupWithForm(props) {


  return (
    <section className={`popup popup-${props.name}`}>
      <div className="popup__container">
        <button className="popup__close-button image-button" type="button" aria-label="Закрыть"/>
        <div className="popup__form-container">
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
        </div>
      </div>
    </section>
  )
}

export default PopupWithForm
