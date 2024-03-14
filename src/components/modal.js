function openModal(modalBlock) {
  modalBlock.classList.add('popup_is-animated');
  setTimeout(who => { who.classList.add('popup_is-opened'); }, 50, modalBlock);
  document.addEventListener('keydown', closeModalByEscape);
};

function closeModal(modalBlock) {
  modalBlock.classList.remove('popup_is-opened');
  setTimeout(who => { who.classList.remove('popup_is-animated'); }, 600, modalBlock);
  document.removeEventListener('keydown', closeModalByEscape);
};

function closeModalByOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(document.querySelector('.popup_is-opened'));
  };
};

function closeModalByEscape(evt) {
  if (evt.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'));
  };
};

export { openModal, closeModal, closeModalByOverlay };