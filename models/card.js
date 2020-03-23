const mongoose = require("mongoose");
const validator = require("validator");
const { optionValidate } = require("../libs/option-validate");

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: optionValidate.requiredField,
      minlength: optionValidate.minLenght,
      maxlength: optionValidate.maxLenght
    },
    link: {
      type: String,
      required: optionValidate.requiredField,
      validate: {
        validator(valid) {
          return validator.isURL(valid);
        },
        message: props => `${props.value} ${optionValidate.urlMessage}`
      }
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: optionValidate.requiredField
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model("card", cardSchema);
