//Создать карточку
//Возвращает одну готовую карточку для добавления
function makeCard(cardData, cardParts) {
  const cardToMake = cardParts.cardTemplate.querySelector('.card').cloneNode('true');
  const cardImg = cardToMake.querySelector('.card__image'); 
  cardImg.src = cardData.link;
  cardImg.alt = cardData.name;
  cardToMake.id = cardData['_id'];
  cardToMake.querySelector('.card__title').textContent = cardData.name;
  if (cardParts.profileId === cardData.owner['_id']) {
    cardToMake.querySelector('.card__delete-button').addEventListener('click', cardParts.deleteCard);
  } else {
    cardToMake.querySelector('.card__delete-button').classList.add('card__delete-button_disabled');
  };
  cardToMake.querySelector('.card__like-button').addEventListener('click', cardParts.likeCard);
  cardImg.addEventListener('click', cardParts.openLargeImage);
  return cardToMake;
};

//Удалить карточку из DOM и сервера
//TODO переделать
function deleteCard(evt) {
  evt.target.closest('.card').remove();
};

//Изменить состояние сердечка (лайка) карточки
//TODO переделать
function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
};

export { makeCard, deleteCard, likeCard };