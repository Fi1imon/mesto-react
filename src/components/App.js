import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false)
  const [isCardPopupOpen, setIsCardPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({})


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddCardClick() {
    setIsAddCardPopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
    setIsCardPopupOpen(true)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddCardPopupOpen(false)
    setIsCardPopupOpen(false)
    setSelectedCard({})
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddCard={handleAddCardClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      {/*Попап информации профиля*/}
      <PopupWithForm
        name={'profile'}
        title={'Редактировать профиль'}
        isOpened={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        children={(
          <>
            <input
              type="text"
              id="name-input"
              className="popup__input popup__input_position_top"
              name="name"
              placeholder="Имя"
              minLength="2"
              maxLength="40"
              required/>
            <span className="popup__input-error name-input-error"/>
            <input
              type="text"
              id="job-input"
              className="popup__input popup__input_position_bottom"
              name="job"
              placeholder="О себе"
              minLength="2"
              maxLength="200"
              required/>
            <span className="popup__input-error job-input-error"/>
          </>
        )}
      />
      {/*Попап добавления карточки*/}
      <PopupWithForm
        name={'item'}
        title={'Новое Место'}
        isOpened={isAddCardPopupOpen}
        onClose={closeAllPopups}
        children={(
          <>
            <input
              type="text"
              id="title-input"
              className="popup__input popup__input_position_top"
              name="title"
              placeholder="Название"
              minLength="2"
              maxLength="30"
              required/>
            <span className="popup__input-error title-input-error"/>
            <input
              type="url"
              id="image-url-input"
              className="popup__input popup__input_position_bottom"
              name="url"
              placeholder="Ссылка на картинку"
              required/>
            <span className="popup__input-error image-url-input-error"/>
          </>
        )}
      />
      {/*Попап просмотра фото*/}
      <ImagePopup isOpened={isCardPopupOpen} onClose={closeAllPopups} card={selectedCard}/>
      {/*Попап удаления карточки*/}
      <section className="popup popup-delete">
        <div className="popup-delete__container">
          <button className="popup__close-button image-button" type="button" aria-label="Закрыть"/>
          <div className="popup-delete__section">
            <h2 className="popup__title">Вы уверены?</h2>
            <button className="popup__submit-button popup-delete__button" type="submit">Да</button>
            <button className="popup__loading-button" type="button">Сохранение...</button>
          </div>
        </div>
      </section>
      {/*Попап обновления фото авы*/}
      <PopupWithForm
        name={'avatar'}
        title={'Обновить аватар'}
        isOpened={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        children={(
          <>
            <input
              type="url"
              id="avatar-url-input"
              className="popup__input popup__input_position_top"
              name="url"
              placeholder="https://somewebsite.com/someimage.jpg"
              required/>
            <span className="popup__input-error avatar-url-input-error"/>
          </>
        )}
      />
    </div>
  );
}

export default App;
