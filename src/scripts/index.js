import { initialCards } from './cards.js';
import { makeCard, deleteCard, likeCard } from '../components/card.js';
import { openModal, closeModal, closeModalByOverlay } from '../components/modal.js';
import '../pages/index.css';

const cardsPosition = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

const modalEdit = document.querySelector('.popup_type_edit');
const modalNew = document.querySelector('.popup_type_new-card');
const modalImg = document.querySelector('.popup_type_image');
let modalImgSrc = document.querySelector('.popup__image');
let modalImgText = document.querySelector('.popup__caption');

initialCards.forEach(item => {
  cardsPosition.append(makeCard(cardTemplate, item, deleteCard, likeCard, openModal, modalImg, modalImgSrc, modalImgText));
});

document.querySelector('.profile__edit-button').addEventListener('click', evt => {
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
