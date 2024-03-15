function makeCard(cardTemplate, cardData, deleteCardMetod, likeCardMetod, expandCardImg) {
  const cardToMake = cardTemplate.querySelector('.card').cloneNode('true');
  cardToMake.querySelector('.card__image').src = cardData.link;
  cardToMake.querySelector('.card__image').alt = cardData.name;
  cardToMake.querySelector('.card__title').textContent = cardData.name;
  cardToMake.querySelector('.card__delete-button').addEventListener('click', deleteCardMetod);
  cardToMake.querySelector('.card__like-button').addEventListener('click', likeCardMetod);
  cardToMake.querySelector('.card__image').addEventListener('click', expandCardImg);
  return cardToMake;
};

function deleteCard(evt) {
  evt.target.closest('.card').remove();
};

function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
};

export { makeCard, deleteCard, likeCard };