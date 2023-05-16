import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ onCardClick, onCardDelete, onCardLike, name, link, like, card }) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner === currentUser._id;
    const isLiked = card.likes.some((id) => id === currentUser._id);

    const cardLikeButtonClassName = (
        `element__btn-like ${isLiked ? 'element__btn-like_active' : ''}`
    );

    const cardDeleteButtonClassName = (
        `element__btn-remove ${!isOwn ? 'element__btn-remove' : ''}`
    );

    function handleClick() {
        onCardClick(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    return (
        <div className="element">
            <img className="element__image" onClick={handleClick} src={link} alt={name} />
            <h2 className="element__name">{name}</h2>
            <button onClick={handleLikeClick} type="button" className={cardLikeButtonClassName}></button>
            {isOwn && <button onClick={handleDeleteClick} className={cardDeleteButtonClassName} />}
            <p className="element__likes">{like.length}</p>
        </div>
    );
}

export default Card;