//Открыть всплывающее окно
//Микро-задержка в 50мс нужна что-бы движок браузера
//не проглатывал пост-добавление класса и стабильно работала анимация появления
function openModal(modalBlock) {
  modalBlock.classList.add('popup_is-animated');
  setTimeout(() => { modalBlock.classList.add('popup_is-opened'); }, 50);
  document.addEventListener('keydown', closeModalByEscape);
};

//Закрыть всплывающее окно
//Время задержки равно времени анимации затухания из стилей
function closeModal(modalBlock) {
  modalBlock.classList.remove('popup_is-opened');
  setTimeout(() => { modalBlock.classList.remove('popup_is-animated'); }, 600);
  document.removeEventListener('keydown', closeModalByEscape);
};

//Найти и закрыть первый попап в документе, если нажата кл. esc
function closeModalByEscape(evt) {
  if (evt.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'));
  };
};

export { openModal, closeModal };