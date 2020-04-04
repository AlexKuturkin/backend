require("dotenv").config();

const isProductionMode = process.env.NODE_ENV === "production";

module.exports.JWT_SECRET = isProductionMode ? process.env.JWT_SECRET : "yandexthebest";
