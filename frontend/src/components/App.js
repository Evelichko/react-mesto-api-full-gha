
import './../index.css'
import Header from './Header.js'
import Main from "./Main.js"
import Footer from "./Footer.js"
import PopupWithForm from "./PopupWithForm.js"
import { useState, useEffect } from "react";
import ImagePopup from './ImagePopup'
import { CurrentUserContext } from './../contexts/CurrentUserContext.js';
import newApi from '../utils/Api.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute.js";
import InfoTooltip from './InfoTooltip.js';
import Register from './Register.js';
import Login from './Login.js';
import * as auth from '../utils/Auth.js';



function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setUserInfo] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [tooltipState, setTooltipState] = useState({ isOpen: false, successful: false });
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      auth.checkToken(token)
        .then(data => {
          if (data) {
            setEmail(email);
            handleLoggedIn();
            navigate("/");
          }
        })
        .catch((err) => console.log(err))
    }
  }, [email, navigate]);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([
        newApi.getAllCards(),
        newApi.getUserData()])

        .then(([userCards, userInfo]) => {
          setCards(userCards);
          setUserInfo(userInfo);
        })
        .catch((err) => console.log(err))
    }
  },
    [loggedIn]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleLoggedIn() {
    setLoggedIn(true);

  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((id) => id === currentUser._id);
    newApi.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    newApi
      .removeCard(card._id)
      .then((res) => {
        setCards((cards) => cards.filter((item) => item._id !== card._id))
      })
      .catch((err) => console.log(err))
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setTooltipState({ isOpen: false });
  }

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }

  function handleUpdateUser({ name, about }) {

    newApi
      .editProfileInfo({
        name: name,
        about: about,
      })
      .then((res) => {
        setUserInfo(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  function handleUpdateAvatar(link) {

    newApi
      .editAvatar(link)
      .then((res) => {
        setUserInfo(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  function handleAddPlaceSubmit({ name, link }) {

    newApi
      .addNewCard({
        name: name,
        link: link
      })
      .then((data) => {
        const newCard = data;
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  function openInfoTooltip(result) {
    setTooltipState({ ...tooltipState, isOpen: true, successful: result });
  }

  function handleRegister(password, email) {
    auth.register(password, email)
      .then(data => {
        if (data) {
          openInfoTooltip(true);
          navigate('/signin', { replace: true })
        }
      })
      .catch(err => {
        console.log(err);
        openInfoTooltip(false);
      })
  }

  function handleLogin(password, email) {
    auth.login(password, email)
      .then(data => {
       if (data.jwt) {
          setEmail(email);
          handleLoggedIn();
           localStorage.setItem('token', data.jwt);
          navigate('/', { replace: true })
        }
      })
      .catch(err => {
        openInfoTooltip(false);
        console.log(err);
      })
  }

  function handleSignOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setEmail('');
    navigate('/signin', { replace: true })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header email={email} onSignOut={handleSignOut} />
      <Routes>
        <Route
          exact path="/"
          element={
            <ProtectedRoute
              loggedIn={loggedIn}>
              <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                email={email}
              />
            </ProtectedRoute>
          } />

        <Route
          path="/signup"
          element={<Register onRegister={handleRegister} />}
        />

        <Route
          path="/signin"
          element={
            <Login
              onLogin={handleLogin}
            />
          }
        />
      </Routes>
      <Footer />

      <InfoTooltip
        name='registration'
        result={tooltipState}
        onClose={closeAllPopups}
        responceOk="Вы успешно зарегистрировались!"
        responceErr="Что-то пошло не так! Попробуйте еще раз."
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <PopupWithForm name="submit" container="popup__case" title="Вы уверены?" button="Да" />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

    </CurrentUserContext.Provider>
  );
}


export default App;
