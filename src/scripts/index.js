//Импорты: массива карточек, модуля создания карточки, модуля открытия 
//и закрытия всплывающих окон, модуля валидации форм, главный файл стилей
import { makeCard, deleteCard, likeCard } from '../components/card.js';
import { openModal, closeModal } from '../components/modal.js';
import { enableValidation, clearValidation } from '../components/validation.js';
import { getProfileInfo, getInitialCards, updateProfileInfo } from '../components/api.js';
import '../pages/index.css';

//Место в DOM для карточек, шаблон карточки, пакет компонентов для создания
const cardsPosition = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const cardParts = {
  cardTemplate,
  deleteCard,
  likeCard,
  openLargeImage,
  profileId: ''
};

//Для работы с всплывающими окнами
const popups = document.querySelectorAll('.popup');
const modalEdit = document.querySelector('.popup_type_edit');
const modalNew = document.querySelector('.popup_type_new-card');
const modalImg = document.querySelector('.popup_type_image');
const modalImgData = document.querySelector('.popup__image');
const modalImgText = document.querySelector('.popup__caption');

//Для работы с полями профиля и его формой
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const editProfileForm = document.forms['edit-profile'];
const nameInput = editProfileForm.elements['name'];
const jobInput = editProfileForm.elements['description'];
const profileFormButton = editProfileForm.querySelector('.popup__button');

//Для работы с формой добавления карточки
const newPlaceForm = document.forms['new-place'];
const placeNameInput = newPlaceForm.elements['place-name'];
const placeLinkInput = newPlaceForm.elements['link'];
const newPlaceFormButton = newPlaceForm.querySelector('.popup__button');

//Для работы валидаторов форм
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

//Ф. обработки события редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileFormButton.textContent = 'Сохранение...';
  updateProfileInfo(nameInput.value, jobInput.value)
    .then(res => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
      profileFormButton.textContent = 'Сохранить';
      closeModal(modalEdit);
    })
    .catch(err => {
      profileFormButton.textContent = err;
      setTimeout(btn => { btn.textContent = 'Сохранить'; }, 5000, profileFormButton)
    });
};

//Ф. обработки события создания новой карточки
//TODO переделать
function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  const cardItem = {};
  cardItem.name = placeNameInput.value;
  cardItem.link = placeLinkInput.value;
  cardsPosition.prepend(makeCard({ cardTemplate, cardData: cardItem, deleteCard, likeCard, openLargeImage }));
  newPlaceForm.reset();
  closeModal(modalNew);
  clearValidation(newPlaceForm, validationConfig);
};

//Ф. открытия всплывающего окна с большой картинкой
function openLargeImage(evt) {
  modalImgData.src = evt.target.src;
  modalImgData.alt = evt.target.alt;
  modalImgText.textContent = evt.target.closest('.card').querySelector('.card__title').textContent;
  openModal(modalImg);
};

//Добавление слушателей событий
//На кнопки редактирования и добавления на гл. странице
document.querySelector('.profile__edit-button').addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(editProfileForm, validationConfig);
  openModal(modalEdit);
});
document.querySelector('.profile__add-button').addEventListener('click', () => {
  openModal(modalNew);
});

//На каждый попап с реакцией на оверлэй и крестик
//mousedown - что-бы не было бага, когда клавиша была зажата
//внутри, а отпущена на оверлее - происходит ненужное закрытие 
popups.forEach(popup => {
  popup.addEventListener('mousedown', evt => {
    if (evt.target.classList.contains('popup_is-opened')) {
      closeModal(popup);
    };
    if (evt.target.classList.contains('popup__close')) {
      closeModal(popup);
    };
  });
});

//На нажатие кн. отправки форм
editProfileForm.addEventListener('submit', handleProfileFormSubmit);
newPlaceForm.addEventListener('submit', handlePlaceFormSubmit);

//Первичная инициализация
//Формирование и активация валидации форм
enableValidation(validationConfig);

//Загрузка профиля и карточек
Promise.all([getProfileInfo(), getInitialCards()])
  .then(([userData, cardsData]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style['background-image'] = `url(${userData.avatar})`
    cardParts.profileId = userData['_id'];
    cardsData.forEach(item => {
      cardsPosition.append(makeCard(item, cardParts))
    });
  })
  .catch(err => {
    console.log(err);
  });


//TODO попап для ошибок, убрать лишние console.log