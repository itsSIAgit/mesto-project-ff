//Импорты: массива карточек, модуля создания карточки, модуля
//открытия и закрытия всплывающих окон, главный файл стилей 
import { initialCards } from './cards.js';
import { makeCard, deleteCard, likeCard } from '../components/card.js';
import { openModal, closeModal } from '../components/modal.js';
import '../pages/index.css';

//Место в DOM для карточек и шаблон карточки
const cardsPosition = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

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
const editProfileForm = document.forms['edit-profile'];
const nameInput = editProfileForm.elements['name'];
const jobInput = editProfileForm.elements['description'];

//Для работы с формой добавления карточки
const newPlaceForm = document.forms['new-place'];
const placeNameInput = newPlaceForm.elements['place-name'];
const placeLinkInput = newPlaceForm.elements['link'];

//Ф. обработки формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(modalEdit);
};

//Ф. обработки формы создания новой карточки
function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  const cardItem = {};
  cardItem.name = placeNameInput.value;
  cardItem.link = placeLinkInput.value;
  cardsPosition.prepend(makeCard({ cardTemplate, cardData: cardItem, deleteCard, likeCard, openLargeImage }));
  newPlaceForm.reset();
  closeModal(modalNew);
};

//Ф. открытия всплывающего окна с большой картинкой
function openLargeImage(evt) {
  modalImgData.src = evt.target.src;
  modalImgData.alt = evt.target.alt;
  modalImgText.textContent = evt.target.closest('.card').querySelector('.card__title').textContent;
  openModal(modalImg);
};

//Парсинг массива карточек с добавлением в DOM
initialCards.forEach(item => {
  cardsPosition.append(makeCard({ cardTemplate, cardData: item, deleteCard, likeCard, openLargeImage }));
});

//Добавление слушателей событий
//На кнопки редактирования и добавления на гл. странице
document.querySelector('.profile__edit-button').addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
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
