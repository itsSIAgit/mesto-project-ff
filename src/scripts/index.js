import { initialCards } from './cards.js';
import { makeCard, deleteCard, likeCard } from '../components/card.js';
import { openModal, closeModal, closeModalByOverlay } from '../components/modal.js';
import '../pages/index.css';

const cardsPosition = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

const modalEdit = document.querySelector('.popup_type_edit');
const modalNew = document.querySelector('.popup_type_new-card');
const modalImg = document.querySelector('.popup_type_image');
const modalImgSrc = document.querySelector('.popup__image');
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
  cardsPosition.prepend(makeCard(cardTemplate, cardItem, deleteCard, likeCard, openModal, modalImg, modalImgSrc, modalImgText));
  newPlaceForm.reset();
  closeModal(modalNew);
};

editProfileForm.addEventListener('submit', handleProfileFormSubmit);
newPlaceForm.addEventListener('submit', handlePlaceFormSubmit);

initialCards.forEach(item => {
  cardsPosition.append(makeCard(cardTemplate, item, deleteCard, likeCard, openModal, modalImg, modalImgSrc, modalImgText));
});

document.querySelector('.profile__edit-button').addEventListener('click', evt => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(modalEdit);
});
document.querySelector('.profile__add-button').addEventListener('click', evt => {
  openModal(modalNew);
});

modalEdit.addEventListener('click', closeModalByOverlay);
modalEdit.querySelector('.popup__close').addEventListener('click', evt => {
  closeModal(modalEdit);
});

modalNew.addEventListener('click', closeModalByOverlay);
modalNew.querySelector('.popup__close').addEventListener('click', evt => {
  closeModal(modalNew);
});

modalImg.addEventListener('click', closeModalByOverlay);
modalImg.querySelector('.popup__close').addEventListener('click', evt => {
  closeModal(modalImg);
});
