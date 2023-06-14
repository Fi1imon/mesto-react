import React from "react";
import Card from "./Card";

function Main(props) {
  const [userAvatar, setUserAvatar] = React.useState()
  const [userName, setUserName] = React.useState()
  const [userDescription, setUserDescription] = React.useState()
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    import("../utils/api")
      .then((api) => {
        api.default.getUserInfo()
          .then((user) => {
            setUserAvatar(user.avatar)
            setUserName(user.name)
            setUserDescription(user.about)
          })
      })
  }, [])

  React.useEffect(() => {
    import("../utils/api")
      .then((api) => {
        api.default.getInitialCards()
          .then((initialCards) => {
            setCards(initialCards)
          })
      })
  }, [])


  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-container">
          <div onClick={props.onEditAvatar} className="profile__avatar-overlay"/>
          <img className="profile__avatar" src={userAvatar} alt="Аватар"/>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <p className="profile__job">{userDescription}</p>
          <button
            onClick={props.onEditProfile}
            className="profile__edit-button image-button"
            type="button"
            aria-label="Редактировать"
          />
        </div>
        <button
          onClick={props.onAddCard}
          className="profile__add-button image-button"
          type="button"
          aria-label="Добавить изображение"
        />
      </section>
      <section className="elements">
        {cards.map(card => <Card
          key={card._id}
          card={card}
          onCardClick={props.onCardClick}
          onDeleteCardClick={props.onDeleteCardClick}
        />)}
      </section>
    </main>
  )
}

export default Main
