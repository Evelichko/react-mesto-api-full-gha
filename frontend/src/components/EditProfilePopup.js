import { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function EditProfilePopup(props) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState(currentUser.name);
    const [about, setAbout] = useState(currentUser.about);

    useEffect(() => {
        setName(currentUser.name);
        setAbout(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setAbout(e.target.value);
    }

    function handleSubmit(e) {

        e.preventDefault();
        props.onUpdateUser({
            name,
            about
        });
    }


    return (
        <PopupWithForm
            name="profile"
            container="popup__container"
            title="Редактировать профиль"
            button="Сохранить"
            onSubmit={handleSubmit}
            isOpen={props.isOpen}
            onClose={props.onClose}>
            <label className="popup__label">
                <input
                    id="input-name"
                    type="text"
                    name={name}
                    onChange={handleChangeName}
                    className="popup__form-input popup__form-input_value_name"
                    minLength={2}
                    maxLength={40}
                    required=""
                    placeholder="Имя"
                    value={name || ''}
                />
                <span className="input-name-error popup__form-error" />
            </label>
            <label className="popup__label">
                <input
                    id="input-job"
                    type="text"
                    name={about}
                    onChange={handleChangeDescription}
                    className="popup__form-input popup__form-input_value_job"
                    placeholder="О себе"
                    minLength={2}
                    maxLength={200}
                    required=""
                    value={about || ''}
                />
                <span className="input-job-error popup__form-error" />
            </label></PopupWithForm>
    );
}


export default EditProfilePopup;