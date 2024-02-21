// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


function makeCard(cardData, delCard) {
  const cardTemplate = document.querySelector('#card-template').content
  const cardToMake = cardTemplate.querySelector('.card').cloneNode('true');
  cardToMake.querySelector('.card__image').src = cardData.link;
  cardToMake.querySelector('.card__title').textContent = cardData.name;
  cardToMake.querySelector('.card__delete-button').addEventListener('click', e => { delCard(e); });
  return cardToMake;
};

function parseCards(cards) {
  const cardsPosition = document.querySelector('.places__list');
  const cardsForPosting = [];
  cards.forEach((item, index) => {
    cardsForPosting[index] = makeCard(item, evt => { evt.target.closest('.card').remove(); });
  });
  cardsPosition.append(...cardsForPosting);
};

parseCards(initialCards);

// console.log(performance.now());
// console.time('test');
// console.timeEnd('test');

// const cardsList = new DocumentFragment();
// initialCards.forEach((item, index) => {
//   cardsList.append(makeCard(item, function() {}));
//   });

// function parseCards(cards) {
//   const cardsPosition = document.querySelector('.places__list');
//   const cardsToPlace = document.createDocumentFragment();
//   cards.forEach((item) => {
//     cardsToPlace.append(makeCard(item, function() {}));
//   });
//   cardsPosition.append(cardsToPlace);
// };