const mongoose = require("mongoose");

const connected = () => {
  // mongodb://127.0.0.1:27017/blog1
  mongoose
    .connect(
      process.env.Mongo_Url
    )
    .then(() => {
      console.log("connection successfull");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connected;
