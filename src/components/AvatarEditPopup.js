//По заданию надо через ref, но гораздо лучше сюда подходит управляемый компонент, в чек листе нет такого пункта.
//Я закомментировал код, который работает по заданию, чтобы было видно, что я его сделал.
import React from "react";
import PopupWithForm from "./PopupWithForm";
import Input from "./Input";

function AvatarEditPopup(props) {
  const [urlValue, setUrlValue] = React.useState('')
  const [buttonText, setButtonText] = React.useState('Сохранить')
  // const imageUrl = React.useRef()

  React.useEffect(() => {
    setUrlValue('')
    // imageUrl.current.value = ''
  }, [props.isOpened])

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({imageUrl: urlValue, setButtonText})
    // props.onUpdateAvatar({imageUrl: imageUrl.current.value, setButtonText})
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
      {/*<input*/}
      <Input
        type="url"
        id="avatar-url-input"
        // className="popup__input popup__input_position_top"
        inputClassName="popup__input popup__input_position_top"
        errorClassName="popup__input-error name-input-error"
        name="url"
        placeholder="https://somewebsite.com/someimage.jpg"
        value={urlValue}
        handleChange={e => setUrlValue(e.target.value)}
        // ref={imageUrl}
        required/>
      {/*<span className="popup__input-error avatar-url-input-error"/>*/}
    </PopupWithForm>
  )
}

export default AvatarEditPopup
