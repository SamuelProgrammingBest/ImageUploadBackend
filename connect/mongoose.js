const mongoose = require("mongoose");

const connectMongoDB = () => {
  mongoose
    .connect(process.env.MONGO_URI_CONNECT)
    .then(() => {
      console.log("Mongoose connection successful");
    })
    .catch(() => {
      console.log("Mongoose connection failed");
    });
};

module.exports = {connectMongoDB}