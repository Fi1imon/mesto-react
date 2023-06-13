function PopupWithForm(props) {


  return (
    <section className={`popup popup-${props.name}`}>
      <div className="popup__container">
        <button className="popup__close-button image-button" type="button" aria-label="Закрыть"/>
        <div className="popup__form-container">
          <h2 className="popup__title">{props.title}</h2>
          <form className="popup__form" name={props.name} noValidate>
            {props.children}
            <button className="popup__submit-button" type="submit">Сохранить</button>
            <button className="popup__loading-button" type="button">Сохранение...</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default PopupWithForm
