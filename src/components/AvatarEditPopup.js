import React from "react";
import PopupWithForm from "./PopupWithForm";

function AvatarEditPopup(props) {
  const [buttonText, setButtonText] = React.useState('Сохранить')
  const imageUrl = React.useRef()

  React.useEffect(() => {
    imageUrl.current.value = ''
  }, [props.isOpened])

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({imageUrl: imageUrl.current.value, setButtonText})
  }

  return (
    <PopupWithForm
      name={'avatar'}
      title={'Обновить аватар'}
      isOpened={props.isOpened}
      onClose={props.onClose}
      handleSubmit={handleSubmit}
      buttonText={buttonText}
    >
      <input
        type="url"
        id="avatar-url-input"
        className="popup__input popup__input_position_top"
        name="url"
        placeholder="https://somewebsite.com/someimage.jpg"
        ref={imageUrl}
        required/>
      <span className="popup__input-error avatar-url-input-error"/>
    </PopupWithForm>
  )
}

export default AvatarEditPopup
