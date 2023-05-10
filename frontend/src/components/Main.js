import { useContext } from 'react'
import Card from '../components/Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardDelete, onCardLike }) {

    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-overlay" onClick={onEditAvatar}>
                    <img
                        className="profile__avatar"
                        alt="Фото Жака-Ив Кусто"
                        src={currentUser.avatar}
                    />
                    <div className="profile__avatar-edit"></div>
                </div>
                <h1 className="profile__author">{currentUser.name}</h1>
                <p className="profile__author-info">{currentUser.about}</p>
                <button className="profile__btn-edit" type="button" onClick={onEditProfile}></button>
                <button className="profile__btn-add" type="button" onClick={onAddPlace} />
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {cards.map((item) => {
                        return (
                            <Card
                                key={item._id}
                                onCardClick={onCardClick}
                                card={item}
                                link={item.link}
                                name={item.name}
                                onCardDelete={onCardDelete}
                                onCardLike={onCardLike}
                                like={item.likes}
                            />
                        )
                    })};
                </ul>
            </section>
        </main>
    );
}

export default Main;