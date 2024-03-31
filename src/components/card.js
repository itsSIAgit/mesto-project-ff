//Создать карточку
//Входные параметры в виде объекта, что-бы не зависить от порядка
//Возвращает одну готовую карточку для добавления
function makeCard({ cardTemplate, cardData, deleteCard, likeCard, openLargeImage }) {
  const cardToMake = cardTemplate.querySelector('.card').cloneNode('true');
  const cardImg = cardToMake.querySelector('.card__image'); 
  cardImg.src = cardData.link;
  cardImg.alt = cardData.name;
  cardToMake.querySelector('.card__title').textContent = cardData.name;
  cardToMake.querySelector('.card__delete-button').addEventListener('click', deleteCard);
  cardToMake.querySelector('.card__like-button').addEventListener('click', likeCard);
  cardImg.addEventListener('click', openLargeImage);
  return cardToMake;
};

//Удалить карточку из DOM
function deleteCard(evt) {
  evt.target.closest('.card').remove();
};

//Изменить состояние сердечка (лайка) карточки
function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
};

export { makeCard, deleteCard, likeCard };