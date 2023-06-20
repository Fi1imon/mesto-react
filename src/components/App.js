import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import api from "../utils/api";
import {InitialCardsContext} from "../contexts/InitialCardsContext";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [isCardPopupOpen, setIsCardPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [initialCards, setInitialCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
      .then((user) => {
        setCurrentUser(user)
      })
      .catch((err) => {
        console.log(`'catch' поймал ошибку: ${err}`)
      })
  }, []);

  React.useEffect(() => {
    api.getInitialCards()
      .then((cards) => {
        setInitialCards(cards)
      })
      .catch((err) => {
        console.log(`'catch' поймал ошибку: ${err}`)
      })
  }, []);

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
    setIsConfirmPopupOpen(false)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.toggleLike(card._id, isLiked)
      .then((newCard) => {
        setInitialCards((cards) => cards.map(c => c._id === card._id ? newCard : c))
      })
  }

  function handleDeleteCardClick(cardId) {
    api.deleteCard(cardId)
      .then(() => {
        setInitialCards((cards) => cards.filter(c => c._id !== cardId))
      })
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
      <InitialCardsContext.Provider value={initialCards}>
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddCard={handleAddCardClick}
          onCardClick={handleCardClick}
          handleCardLike={handleCardLike}
          handleDeleteCardClick={handleDeleteCardClick}
        />
        <Footer />
        {/*Попап информации профиля*/}
        <PopupWithForm
          name={'profile'}
          title={'Редактировать профиль'}
          isOpened={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          buttonText={'Сохранить'}
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
          buttonText={'Сохранить'}
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
        <PopupWithForm
          name={'delete'}
          title={'Вы уверены?'}
          isOpened={isConfirmPopupOpen}
          onClose={closeAllPopups}
          buttonText={'Да'}
        />
        {/*Попап обновления фото авы*/}
        <PopupWithForm
          name={'avatar'}
          title={'Обновить аватар'}
          isOpened={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          buttonText={'Сохранить'}
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
      </InitialCardsContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
