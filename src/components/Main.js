function handleEditAvatarClick() {
  document.querySelector('.popup-avatar').classList.add('popup_opened')
}

function handleEditProfileClick() {
  document.querySelector('.popup-profile').classList.add('popup_opened')
}

function handleAddCardClick() {
  document.querySelector('.popup-item').classList.add('popup_opened')
}


function Main() {
  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-container">
          <div onClick={handleEditAvatarClick} className="profile__avatar-overlay"/>
          <img className="profile__avatar" src='thatWillBeChanged' alt="Аватар"/>
        </div>
        <div className="profile__info">
          <h1 className="profile__name"/>
          <p className="profile__job"/>
          <button
            onClick={handleEditProfileClick}
            className="profile__edit-button image-button"
            type="button"
            aria-label="Редактировать"
          />
        </div>
        <button
          onClick={handleAddCardClick}
          className="profile__add-button image-button"
          type="button"
          aria-label="Добавить изображение"
        />
      </section>
      <section className="elements">
        <template id="element">
          <div className="element">
            <button className="element__delete image-button" aria-label="Удалить"/>
            <img className="element__photo" src="someSrcThatWillBeChanged" alt="АльтКоторыйИзменится"/>
            <div className="element__info">
              <h3 className="element__name"/>
              <div className="element__likes">
                <button className="element__like-button image-button" type="button" aria-label="нравится"/>
                <p className="element__likes-number"/>
              </div>
            </div>
          </div>
        </template>
      </section>
    </main>
  )
}

export default Main
