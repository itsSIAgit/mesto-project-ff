//Для работы API
const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-11',
  headers: {
    authorization: '34673cb7-5fe3-4323-9567-b98efa2f95b7',
    'Content-Type': 'application/json'
  }
};

//Получить данные профиля пользователя
const getProfileInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      };
      return Promise.reject(`Ошибка получения профиля. Код: ${res.status}`); 
    });
};

//Получить список карточек
const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      };
      return Promise.reject(`Ошибка получения карточек. Код: ${res.status}`); 
    });
};

export { getProfileInfo, getInitialCards }
