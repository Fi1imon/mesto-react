import React from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import Input from "./Input";

function EditProfilePopup(props) {
  const [formValues, setFormValue] = React.useState({name: '', description: ''});
  const [buttonText, setButtonText] = React.useState('Сохранить')
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setFormValue({name: currentUser.name, description: currentUser.about});
  }, [currentUser, props.isOpened])

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdate({name: formValues.name, about: formValues.description, setButtonText})
  }

  return (
    <PopupWithForm
      name={'profile'}
      title={'Редактировать профиль'}
      isOpened={props.isOpened}
      onClose={props.onClose}
      buttonText={buttonText}
      handleSubmit={handleSubmit}

    >
      <Input
        type="text"
        id="name-input"
        inputClassName="popup__input popup__input_position_top"
        errorClassName="popup__input-error name-input-error"
        name="name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        value={formValues.name || ''}
        handleChange={e => setFormValue({...formValues, name: e.target.value})}
        required/>
      <Input
        type="text"
        id="job-input"
        inputClassName="popup__input popup__input_position_bottom"
        errorClassName="popup__input-error job-input-error"
        name="job"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        value={formValues.description || ''}
        handleChange={e => setFormValue({...formValues, description: e.target.value})}
        required/>
    </PopupWithForm>
  )
}

export default EditProfilePopup
