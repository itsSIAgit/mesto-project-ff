//Создать карточку
//Возвращает одну готовую карточку для добавления
function makeCard(cardData, cardParts) {
  const cardToMake = cardParts.cardTemplate.querySelector('.card').cloneNode('true');
  const cardImg = cardToMake.querySelector('.card__image'); 
  const cardLikeButton = cardToMake.querySelector('.card__like-button');
  const carLikeCounter = cardToMake.querySelector('.card__like-counter');
  const likeParts = {
    id: cardData['_id'],
    sendLike: cardParts.sendLikeCard,
    sendUnlike: cardParts.sendUnlikeCard,
    button: cardLikeButton,
    counter: carLikeCounter
  };

  cardImg.src = cardData.link;
  cardImg.alt = cardData.name;
  cardToMake.id = cardData['_id'];
  cardToMake.querySelector('.card__title').textContent = cardData.name;
  carLikeCounter.textContent = cardData.likes.length;
  
  //Решить показывать и обрабатывать кн. удаления
  if (cardParts.profileId === cardData.owner['_id']) {
    cardToMake.querySelector('.card__delete-button').addEventListener('click', cardParts.deleteCard);
  } else {
    cardToMake.querySelector('.card__delete-button').classList.add('card__delete-button_disabled');
  };
  
  //Проверить лайкал ли карточку пользователь
  if (cardData.likes.some(user => user['_id'] === cardParts.profileId)) {
    cardLikeButton.classList.add('card__like-button_is-active');
  };
  
  cardLikeButton.addEventListener('click', () => {
    cardParts.likeCard(likeParts);
  });
  cardImg.addEventListener('click', cardParts.openLargeImage);
  
  return cardToMake;
};

//Удалить карточку из DOM и сервера
//TODO переделать
function deleteCard(evt) {
  evt.target.closest('.card').remove();
};

//Изменить состояние сердечка (лайка) карточки
function likeCard(likeParts) {
  if (!likeParts.button.classList.contains('card__like-button_is-active')) {
    likeParts.sendLike(likeParts.id)
    .then(res => {
      likeParts.button.classList.add('card__like-button_is-active');
      likeParts.counter.textContent = res.likes.length;
    })
    .catch(() => {
      likeParts.counter.textContent = 'ERROR';
    });
  } else {
    likeParts.sendUnlike(likeParts.id)
    .then(res => {
      likeParts.button.classList.remove('card__like-button_is-active');
      likeParts.counter.textContent = res.likes.length;
    })
    .catch(() => {
      likeParts.counter.textContent = 'ERROR';
      });
  };
};

export { makeCard, deleteCard, likeCard };