import React from 'react';
import Close from '../../images/close__navPanel.svg'
import './InfoToolTip.css';


function InfoTooltip({ onClose, isSuccess, isUpdate }) {
  return (
    <section
      className={`popup ${!isSuccess ? 'popup_opened' : ''}`}
      onClick={({ target }) => {
        if (target.classList.contains('popup_opened') || target.classList.contains('popup__close-button')) {
          onClose();
        }
      }}>
      <div className="popup__container">
      <button className="button" type="button" onClick={onClose}>
          <img
          src={Close} alt="Крест для закрытия"
            className="popup__close-popup popup__close-card-popup"
             />
        </button>
        <p className="info-tooltip__text">{isUpdate? 'Все прошло успешно!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
      </div>
    </section>
  )
}

export default InfoTooltip
