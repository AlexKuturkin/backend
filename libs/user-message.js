module.exports.userMessage = {
  validError: {
    status: 400,
    message: "Ошибка валидации:",
  },
  serverError: {
    status: 500,
    message: "Ошибка сервера:",
  },
  userNotFoundError: {
    status: 404,
    message: "Нет пользователя с таким id",
  },
  validIdError: {
    status: 400,
    message: "Пользователя с таким id не существует",
  },
  successDelete: {
    status: 200,
    message: "Карточка успешно удалена",
  },
  cardNotFoundError: {
    status: 404,
    message: "Нет карточки с таким id",
  },
  resourceIsNotFoundError: {
    status: 404,
    message: "Ресурс не найден",
  },
  noRights: {
    status: 401,
    message: "У вас нет прав для удаления карточки",
  },
};
