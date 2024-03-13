import { initialCards } from './cards.js';
import { makeCard, deleteCard, likeCard } from '../components/card.js';
import { openModal } from '../components/modal.js';
import '../pages/index.css';

const cardsPosition = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

initialCards.forEach(item => {
  cardsPosition.append(makeCard(cardTemplate, item, deleteCard, likeCard, openModal));
});

document.querySelector('.profile__edit-button').addEventListener('click', openModal);
document.querySelector('.profile__add-button').addEventListener('click', openModal);
