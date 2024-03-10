import './cards.js';
import '../pages/index.css';

const cardsPosition = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function makeCard(cardData, delCard) {
  const cardToMake = cardTemplate.querySelector('.card').cloneNode('true');
  cardToMake.querySelector('.card__image').src = cardData.link;
  cardToMake.querySelector('.card__title').textContent = cardData.name;
  cardToMake.querySelector('.card__delete-button').addEventListener('click', delCard);
  return cardToMake;
};

function deleteCard(evt) {
  evt.target.closest('.card').remove();
};

initialCards.forEach(item => {
  cardsPosition.append(makeCard(item, deleteCard));
});