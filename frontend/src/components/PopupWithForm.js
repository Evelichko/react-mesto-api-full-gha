function PopupWithForm(props) {

  return (

    <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className={props.container}>
        <p className="popup__title">{props.title}</p>
        <form className="popup__form" name={props.name} onSubmit={props.onSubmit} noValidate="">
          {props.children}
          <button className="popup__btn-save" type="submit">
            {props.button}
          </button>
        </form>

        <button className="popup__btn-close" type="button" onClick={props.onClose} />
      </div>
    </div>
  );
}


export default PopupWithForm;