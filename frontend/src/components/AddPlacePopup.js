import React from 'react';
import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from "react";


function AddPlacePopup({onAddPlace, isOpen, onClose, isAddPlacePopupOpen}) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    function handleChangePlace(event) {
        setName(event.target.value);
    }

    function handleChangeLink(event) {
        setLink(event.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name,
            link
        })
    }
    useEffect(() => {
        setName(''); 
        setLink('');
    }, [onAddPlace]);

    return (
        <PopupWithForm
            name="place"
            container="popup__container"
            title="Новое место"
            button="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            handleAddPlaceClick={isAddPlacePopupOpen}
            onSubmit={handleSubmit}
        >
            <label className="popup__label">
                <input
                    onChange={handleChangePlace}
                    id="input-place"
                    type="text"
                    name="name"
                    className="popup__form-input popup__form-input_value_place"
                    placeholder="Название"
                    required=""
                    minLength={2}
                    maxLength={30}
                    value={name}
                />
                <span className="input-place-error popup__form-error" />
            </label>
            <label className="popup__label">
                <input
                    onChange={handleChangeLink}
                    id="input-link"
                    type="url"
                    name="link"
                    className="popup__form-input popup__form-input_value_link"
                    placeholder="Ссылка на картинку"
                    required=""
                    value={link}
                />
                <span className="input-link-error popup__form-error" />
            </label>
        </PopupWithForm>
    );
}


export default AddPlacePopup;