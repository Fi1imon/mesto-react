import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";

function App() {
  return (
    <div className="page">
      <Header />
      <Main />
      <Footer />
      {/*Попап информации профиля*/}
      <section className="popup popup-profile">
        <div className="popup__container">
          <button className="popup__close-button image-button" type="button" aria-label="Закрыть"/>
          <div className="popup__form-container">
            <h2 className="popup__title">Редактировать профиль</h2>
            <form className="popup__form" name="profileEdit" noValidate>
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
                  <button className="popup__submit-button" type="submit">Сохранить</button>
                  <button className="popup__loading-button" type="button">Сохранение...</button>
            </form>
          </div>
        </div>
      </section>
      {/*Попап добавления карточки*/}
      <PopupWithForm name={'item'} title={'Новое Место'} children={(
        <form className="popup__form" name="addPhoto" noValidate>
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
          <button className="popup__submit-button" type="submit">Сохранить</button>
          <button className="popup__loading-button" type="button">Сохранение...</button>
        </form>
      )}/>
      {/*Попап просмотра фото*/}
      <section className="popup popup-image">
        <div className="popup-image__container">
          <button className="popup__close-button image-button" type="button" aria-label="Закрыть"/>
          <img className="popup-image__photo" src="<%=require('./images/street.png')%>" alt="АльтКоторыйИзменится"/>
            <p className="popup-image__name"/>
        </div>
      </section>
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
      <section className="popup popup-avatar">
        <div className="popup__container">
          <button className="popup__close-button image-button" type="button" aria-label="Закрыть"/>
          <div className="popup-avatar__form-container">
            <h2 className="popup__title">Обновить аватар</h2>
            <form className="popup__form" name="newAvatar" noValidate>
              <input
                type="url"
                id="avatar-url-input"
                className="popup__input popup__input_position_top"
                name="url"
                placeholder="https://somewebsite.com/someimage.jpg"
                required/>
                <span className="popup__input-error avatar-url-input-error"/>
                <button className="popup__submit-button" type="submit">Сохранить</button>
                <button className="popup__loading-button" type="button">Сохранение...</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
