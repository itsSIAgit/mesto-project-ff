import { initialCards } from './cards.js';
import { makeCard, deleteCard, likeCard } from '../components/card.js';
import { openModal, closeModal } from '../components/modal.js';
import '../pages/index.css';

const cardsPosition = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

const popups = document.querySelectorAll('.popup');
const modalEdit = document.querySelector('.popup_type_edit');
const modalNew = document.querySelector('.popup_type_new-card');
const modalImg = document.querySelector('.popup_type_image');
const modalImgData = document.querySelector('.popup__image');
const modalImgText = document.querySelector('.popup__caption');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editProfileForm = document.forms['edit-profile'];
const nameInput = editProfileForm.elements['name'];
const jobInput = editProfileForm.elements['description'];

const newPlaceForm = document.forms['new-place'];
const placeNameInput = newPlaceForm.elements['place-name'];
const placeLinkInput = newPlaceForm.elements['link'];

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(modalEdit);
};

function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  const cardItem = {};
  cardItem.name = placeNameInput.value;
  cardItem.link = placeLinkInput.value;
  cardsPosition.prepend(makeCard({ cardTemplate, cardData: cardItem, deleteCard, likeCard, openLargeImage }));
  newPlaceForm.reset();
  closeModal(modalNew);
};

function openLargeImage(evt) {
  modalImgData.src = evt.target.src;
  modalImgData.alt = evt.target.alt;
  modalImgText.textContent = evt.target.closest('.card').querySelector('.card__title').textContent;
  openModal(modalImg);
};

editProfileForm.addEventListener('submit', handleProfileFormSubmit);
newPlaceForm.addEventListener('submit', handlePlaceFormSubmit);

initialCards.forEach(item => {
  cardsPosition.append(makeCard({ cardTemplate, cardData: item, deleteCard, likeCard, openLargeImage }));
});

document.querySelector('.profile__edit-button').addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(modalEdit);
});
document.querySelector('.profile__add-button').addEventListener('click', () => {
  openModal(modalNew);
});

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

