function makeCard(cardTemplate, cardData, delCardBtnF) {
  const cardToMake = cardTemplate.querySelector('.card').cloneNode('true');
  cardToMake.querySelector('.card__image').src = cardData.link;
  cardToMake.querySelector('.card__title').textContent = cardData.name;
  cardToMake.querySelector('.card__delete-button').onclick = delCardBtnF;
  return cardToMake;
};

function deleteCard(evt) {
  evt.target.closest('.card').remove();
};

export { makeCard, deleteCard };