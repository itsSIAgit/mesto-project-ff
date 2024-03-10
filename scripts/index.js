// 740ms
// console.time('test');

// const cardsPosition = document.querySelector('.places__list');
// const cardTemplate = document.querySelector('#card-template').content;

// function makeCard(cardData, delCard) {
//   const cardToMake = cardTemplate.querySelector('.card').cloneNode('true');
//   cardToMake.querySelector('.card__image').src = cardData.link;
//   cardToMake.querySelector('.card__title').textContent = cardData.name;
//   cardToMake.querySelector('.card__delete-button').addEventListener('click', e => { delCard(e); }); прописать краткую запись
//   return cardToMake;
// };

// function deleteCard(evt) {
//   evt.target.closest('.card').remove();
// };

// initialCards.forEach(item => { cardsPosition.append(makeCard(item, deleteCard)); }); желательно писать на новой строке - проще в отладке

// console.timeEnd('test');

console.time('test');

const cardsPosition = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function makeCard(cardData) {
  const cardToMake = cardTemplate.querySelector('.card').cloneNode('true');
  cardToMake.querySelector('.card__image').src = cardData.link;
  cardToMake.querySelector('.card__title').textContent = cardData.name;
  return cardToMake;
};

function deleteCard(evt) {
  evt.target.closest('.card').remove();
};

function parseCards(cards) {
  const cardsForPosting = document.createDocumentFragment();
  for (let i = 0; i < initialCards.length; i++) {
    cardsForPosting.append(makeCard(cards[i]));
  };
  cardsPosition.append(cardsForPosting);
};


function whereClick(event) {
  // if (this.classList.value.includes('places__list')) console.log(this);
  // только зачем делать эту проверку если событие иначе никак не вызовется
    if (event.target.classList.value.includes('card__delete-button')) deleteCard(event);
};

cardsPosition.addEventListener('click', whereClick);
//  e => {
  // здесь надо добавить проверку на то что событие именно в нужном контейнере через currentTarget
  // и вынести в отдельную функцию чтобы не было колбакХела, и можно было удалять листенер
  // еще можно использовать this чтобы определить контекст
  // console.log(this);
  // if (e.target.classList.value.includes('card__delete-button')) deleteCard(e);
// });

parseCards(initialCards);

console.timeEnd('test');

// Резюме: эксперемент не валиден, т.к. не учитывает что что обработка (добавление)
// массива карточек идет в фоне уже после завершения данного скрипта
// И время "до получения результата" получается почти х2