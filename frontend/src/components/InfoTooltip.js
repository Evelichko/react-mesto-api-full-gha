import React from 'react';
import ok from '../images/ok.png';
import err from '../images/err.png';

function InfoTooltip({ onClose, name, result: { isOpen, successful }, responceErr, responceOk }) {

  return (
    <div className={`popup popup_${name} popup${isOpen ? '_opened' : ''}`}>
      <div className="popup__container popup__infoTooltip">
        <img className="popup__response-image" src={successful ? ok : err} alt='Значок результата операции' />
        <h2 className={`popup__title_type_infoTooltip`}>{successful ? responceOk : responceErr}</h2>
        <button onClick={onClose} className="popup__btn-close" type="button" />
      </div>
    </div>
  );
}

export default InfoTooltip;