import { initialCards } from './cards.js';
import { makeCard, deleteCard } from '../components/card.js';
import '../pages/index.css';

const cardsPosition = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

initialCards.forEach(item => {
  cardsPosition.append(makeCard(cardTemplate, item, deleteCard));
});
