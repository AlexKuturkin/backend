const mongoose = require("mongoose");
const isEmail = require("validator/lib/isEmail");
const bcrypt = require("bcryptjs");
const YouNeedToLogin = require("../errors/loginError");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    about: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    avatar: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (valid) => isEmail(valid),
        message: "Почта не прошла валидацию",
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
      minlength: 10,
    },
  },
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new YouNeedToLogin("Почта или пароль не прошли проверку"));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new YouNeedToLogin("Почта или пароль не прошли проверку"));
          }
          return user;
        });
    });
};


module.exports = mongoose.model("user", userSchema);
