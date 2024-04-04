//Создать карточку
//Возвращает одну готовую карточку для добавления
function makeCard(cardData, cardParts) {
  const cardToMake = cardParts.cardTemplate.querySelector('.card').cloneNode('true');
  const cardImg = cardToMake.querySelector('.card__image'); 
  const cardLikeButton = cardToMake.querySelector('.card__like-button');
  const cardLikeCounter = cardToMake.querySelector('.card__like-counter');

  cardImg.src = cardData.link;
  cardImg.alt = cardData.name;
  cardToMake.id = cardData['_id'];
  cardLikeCounter.textContent = cardData.likes.length;
  cardToMake.querySelector('.card__title').textContent = cardData.name;
  
  //Решить надо ли показывать и обрабатывать кн. удаления
  if (cardParts.profileId === cardData.owner['_id']) {
    cardToMake.querySelector('.card__delete-button').addEventListener('click', () => {
      cardParts.eraseCard(cardToMake.id);
    });
  } else {
    cardToMake.querySelector('.card__delete-button').classList.add('card__delete-button_disabled');
  };
  
  //Проверить лайкал ли карточку пользователь
  if (cardData.likes.some(user => user['_id'] === cardParts.profileId)) {
    cardLikeButton.classList.add('card__like-button_is-active');
  };

  cardLikeButton.addEventListener('click', (evt) => {
    cardParts.checkLikeCard(evt, cardToMake.id, cardLikeCounter);
  });
  cardImg.addEventListener('click', cardParts.openLargeImage);
  
  return cardToMake;
};

//Удалить карточку из DOM
function deleteCard(id) {
  document.getElementById(id).remove();
};

//Изменить состояние сердечка (лайка) карточки и счетчика
function likeCard(heart, counter, count) {
  if (Number(count) === count) {
    heart.classList.toggle('card__like-button_is-active');
  };
  counter.textContent = count;
};

export { makeCard, deleteCard, likeCard };