//Включить валидацию всех форм
function enableValidation(validationConfig) {
  Array.from(document.querySelectorAll(validationConfig.formSelector)).forEach(form => {
    setEventListeners(form, validationConfig);
  });
};

//Добавить слушателей для полей ввода
function setEventListeners(form, validationConfig) {
  const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = form.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationConfig.inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(form, inputElement, validationConfig.inputErrorClass, validationConfig.errorClass);
      toggleButtonState(inputList, buttonElement, validationConfig.inactiveButtonClass);
    });
  });
};

//Переключить доступность кн. отправки
function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  };
};

//Проверить что все поля ввода валидны
function hasInvalidInput(inputList) {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
};

//Показать или скрыть сообщение с ошибкой
function checkInputValidity(form, inputElement, inputErrorClass, errorClass) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  };
  if (!inputElement.validity.valid) {
    showInputError(form, inputElement, inputErrorClass, errorClass, inputElement.validationMessage);
  } else {
    hideInputError(form, inputElement, inputErrorClass, errorClass);
  };
};

//Показать сообщение об ошибке
function showInputError(form, inputElement, inputErrorClass, errorClass, errorMessage) {
  const errorElement = form.querySelector(`.popup__error_input-error_${inputElement.id}`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

//Скрыть сообщение об ошибке
function hideInputError(form, inputElement, inputErrorClass, errorClass) {
  const errorElement = form.querySelector(`.popup__error_input-error_${inputElement.id}`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

//Очистить ошибки валидации
function clearValidation(form, validationConfig) {
  const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = form.querySelector(validationConfig.submitButtonSelector);
  let errorElement;
  inputList.forEach((inputElement) => {
    errorElement = form.querySelector(`.popup__error_input-error_${inputElement.id}`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
  });
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
};

export { enableValidation, clearValidation };
