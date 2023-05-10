function ImagePopup(props) {
  return (
    <div className={`popup popup_picture ${props.card.link ? 'popup_opened' : ''}`}>
      <div className="popup__box">
        <button className="popup__btn-close" type="button" onClick={props.onClose} />
        <img className="popup__image" src={props.card ? props.card.link : ''} alt={props.card.name} />
        <p className="popup__description">{props.card.name}</p>
      </div>
    </div>

  );
}

export default ImagePopup;