import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import api from "../utils/api";
import {InitialCardsContext} from "../contexts/InitialCardsContext";
import EditProfilePopup from "./EditProfilePopup";
import AvatarEditPopup from "./AvatarEditPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletionConfirmationPopup from "./DeletionConfirmationPopup";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [isCardPopupOpen, setIsCardPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [initialCards, setInitialCards] = React.useState([]);
  const [cardIdForDeleting, setCardIdForDeleting] = React.useState('')

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

  function handleDeleteCardClick(cardId) {
    setIsConfirmPopupOpen(true)
    setCardIdForDeleting(cardId)
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
      .catch((err) => {
        console.log(`'catch' поймал ошибку: ${err}`)
      })
  }

  function handleDeleteCardSubmit({setButtonText}) {
    setButtonText('Сохранение...')
    api.deleteCard(cardIdForDeleting)
      .then(() => {
        setInitialCards((cards) => cards.filter(c => c._id !== cardIdForDeleting));
        setButtonText('Да');
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`'catch' поймал ошибку: ${err}`)
      })
  }

  function handleUpdateUser({name, about, setButtonText}) {
    setButtonText('Сохранение...')
    api.setUserInfo({name, about})
      .then(user => {
        setButtonText('Сохранить')
        setCurrentUser({...currentUser, name: user.name, about: user.about});
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`'catch' поймал ошибку: ${err}`)
      })
  }

  function handleUpdateAvatar({imageUrl, setButtonText}) {
    setButtonText('Сохранение...')
    api.uploadAvatar({imageUrl})
      .then(user => {
        setButtonText('Сохранить')
        setCurrentUser({...currentUser, avatar: user.avatar});
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`'catch' поймал ошибку: ${err}`)
      })
  }

  function handleAddCardSubmit({title, imageUrl, setButtonText}) {
    setButtonText('Сохранение...');

    api.addCard({title, imageUrl})
      .then(card => {
        setInitialCards([card, ...initialCards]);
        setButtonText('Сохранить');
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`'catch' поймал ошибку: ${err}`)
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
        <ImagePopup isOpened={isCardPopupOpen} onClose={closeAllPopups} card={selectedCard}/>
        {/*Попапы с формами*/}
        <EditProfilePopup
          isOpened={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdate={handleUpdateUser}
        />
        <AddPlacePopup
          isOpened={isAddCardPopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddCardSubmit}
        />
        {/*Попап удаления карточки*/}
        <DeletionConfirmationPopup isOpened={isConfirmPopupOpen} onClose={closeAllPopups} handleSubmit={handleDeleteCardSubmit} />
        <AvatarEditPopup
          isOpened={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
      </InitialCardsContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
