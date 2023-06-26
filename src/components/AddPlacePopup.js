import React from "react";
import PopupWithForm from "./PopupWithForm";
import Input from "./Input";

function AddPlacePopup(props) {
  const [formValues, setFormValue] = React.useState({title: '', imageUrl: ''});
  const [buttonText, setButtonText] = React.useState('Сохранить');

  React.useEffect(() => {
    setFormValue({title: '', imageUrl: ''});
  }, [props.isOpened])

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddCard({title: formValues.title, imageUrl: formValues.imageUrl, setButtonText})
  }

  return(
    <PopupWithForm
      name={'item'}
      title={'Новое Место'}
      isOpened={props.isOpened}
      onClose={props.onClose}
      handleSubmit={handleSubmit}
      buttonText={buttonText}
    >
      <Input
        type="text"
        id="title-input"
        inputClassName="popup__input popup__input_position_top"
        errorClassName="popup__input-error name-input-error"
        name="title"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        value={formValues.title}
        handleChange={e => setFormValue({...formValues, title: e.target.value})}
        required/>
      <Input
        type="url"
        id="image-url-input"
        inputClassName="popup__input popup__input_position_bottom"
        errorClassName="popup__input-error job-input-error"
        name="url"
        placeholder="Ссылка на картинку"
        value={formValues.imageUrl}
        handleChange={e => setFormValue({...formValues, imageUrl: e.target.value})}
        required/>
    </PopupWithForm>
  )
}

export default AddPlacePopup
