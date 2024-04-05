//Для работы API
const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-11',
  headers: {
    authorization: '34673cb7-5fe3-4323-9567-b98efa2f95b7',
    'Content-Type': 'application/json;charset=utf-8'
  }
};

//Обработать ответ
function handleResponse(res, errorMessage) {
  if (res.ok) {
    return res.json();
  };
  return Promise.reject(errorMessage);
};

//Получить данные профиля пользователя
const getProfileInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  }).then(res => handleResponse(res, `❌ Ошибка получения профиля. Код: ${res.status}`));
};


//Обновить данные профиля пользователя
const updateProfileInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name,
      about
    }),
  }).then(res => handleResponse(res, `❌ Ошибка отправки. Код: ${res.status}`));
};

//Получить список карточек
const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  }).then(res => handleResponse(res, `❌ Ошибка получения карточек. Код: ${res.status}`));
};

//Добавить новую карточку
const submitCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      link
    }),
  }).then(res => handleResponse(res, `❌ Ошибка отправки. Код: ${res.status}`));
};

//Стереть карточку
const sendEraseCard = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers
  }).then(res => handleResponse(res, `❌ Ошибка удаления. Код: ${res.status}`));
};

//Записать лайк
const sendLikeCard = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'PUT',
    headers: config.headers
  }).then(res => handleResponse(res, `❌ Ошибка записи лайка. Код: ${res.status}`));
};

//Стереть лайк
const sendUnlikeCard = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: config.headers
  }).then(res => handleResponse(res, `❌ Ошибка стирания лайка. Код: ${res.status}`));
};

//Обновить аватар
const submitNewAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link
    })
  }).then(res => handleResponse(res, `❌ Ошибка отправки. Код: ${res.status}`));
};

//Проверить что ссылка на новый аватар - это картинка
const checkNewAvatar = (link) => {
  return fetch(link, {
    method: 'HEAD',
  })
    .then(res => {
      if (res.ok) {
        if (res.headers.get('Content-Type').includes('image')) {
          return true;
        } else {
          return false;
        };
      };
      return Promise.reject(`❌ Картинка недоступна. Код: ${res.status}`);
    });
};

export { getProfileInfo, getInitialCards, updateProfileInfo, submitCard, sendLikeCard, sendUnlikeCard, sendEraseCard, checkNewAvatar, submitNewAvatar };
