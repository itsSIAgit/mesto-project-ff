function makeCard(cardTemplate, cardData, delCardBtnF, likeCardBtnF) {
  const cardToMake = cardTemplate.querySelector('.card').cloneNode('true');
  cardToMake.querySelector('.card__image').src = cardData.link;
  cardToMake.querySelector('.card__title').textContent = cardData.name;
  cardToMake.querySelector('.card__delete-button').onclick = delCardBtnF;
  cardToMake.querySelector('.card__like-button').onclick = likeCardBtnF;
  return cardToMake;
};

function deleteCard(evt) {
  evt.target.closest('.card').remove();
};

function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
};

export { makeCard, deleteCard, likeCard };