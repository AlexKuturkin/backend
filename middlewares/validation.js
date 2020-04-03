const { celebrate, Joi } = require("celebrate");

const signUpValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(2)
      .max(30),
    avatar: Joi.string()
      .required()
      .uri(),
    about: Joi.string()
      .required()
      .min(2)
      .max(30),
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .required()
      .min(10),
  }),
});

const signInValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .required()
      .min(10),
  }),
});

const authValidation = celebrate({
  cookies: Joi.object()
    .keys({
      jwt: Joi.string().required(),
    })
    .unknown(),
});

const getUserValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.objectId().required(),
  }),
});

const cardPostValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(2)
      .max(30),
    link: Joi.string()
      .required()
      .uri(),
  }),
});

const cardIdValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.objectId().required(),
  }),
});

module.exports = {
  signUpValidation,
  signInValidation,
  authValidation,
  getUserValidation,
  cardPostValidation,
  cardIdValidation,
};
