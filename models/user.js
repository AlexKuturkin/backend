const mongoose = require("mongoose");
const validator = require("validator");
const { optionValidate } = require("../libs/option-validate");

const userSchema = new mongoose.Schema(
  {

    name: {
      type: String,
      required: optionValidate.requiredField,
      minlength: optionValidate.minLenght,
      maxlength: optionValidate.maxLenght,
    },

    about: {
      type: String,
      required: optionValidate.requiredField,
      minlength: optionValidate.minLenght,
      maxlength: optionValidate.maxLenght,
    },

    avatar: {
      type: String,
      required: optionValidate.requiredField,
      validate: {
        validator(valid) {
          return validator.isURL(valid);
        },
        message: (props) => `${props.value} ${optionValidate.urlMessage}`,
      },
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model("user", userSchema);
