import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";


function EditAvatarPopup(props) {

    const refInput = useRef();
    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: refInput.current.value,
        });
    }

    return (
        <PopupWithForm name="avatar"
            container="popup__avatar-box"
            title="Обновить аватар?"
            button="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <label className="popup__label">
                <input
                    id="input-avatar"
                    type="url"
                    ref={refInput}
                    name="avatar"
                    className="popup__form-input popup__form-input_value_link"
                />
                <span className="input-avatar-error popup__form-error" />
            </label>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;