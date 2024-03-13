function showModal(evt) {
  let whatApopupOpen = new DocumentFragment;
  if (evt.target.classList.contains('profile__edit-button')) {
    whatApopupOpen = document.querySelector('.popup_type_edit');
  } else
    if (evt.target.classList.contains('profile__add-button')) {
      whatApopupOpen = document.querySelector('.popup_type_new-card');
    } else
      if (evt.target.classList.contains('card__image')) {
        whatApopupOpen = document.querySelector('.popup_type_image');
        whatApopupOpen.querySelector('.popup__image').src = evt.target.src;
        whatApopupOpen.querySelector('.popup__caption').textContent = evt.target.closest('.card').querySelector('.card__title').textContent;
  };
  whatApopupOpen.classList.add('popup_is-opened');
  whatApopupOpen.addEventListener('click', closeModal);
  document.addEventListener('keydown', closeModal);
};

function closeModal(evt) {
  if (evt.target.classList.contains('popup') || 
        evt.target.classList.contains('popup__close') ||
          evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    openedPopup.removeEventListener('click', closeModal);
    openedPopup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModal);
  };
};

export { showModal };