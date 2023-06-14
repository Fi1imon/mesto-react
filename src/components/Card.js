function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <div className="element">
      <button onClick={props.onDeleteCardClick} className="element__delete image-button" aria-label="Удалить"/>
      <img onClick={handleClick} className="element__photo" src={props.card.link} alt={props.card.name}/>
      <div className="element__info">
        <h3 className="element__name">{props.card.name}</h3>
        <div className="element__likes">
          <button className="element__like-button image-button" type="button" aria-label="нравится"/>
          <p className="element__likes-number">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  )


}

export default Card
