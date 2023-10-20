const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI_CLOUD);
    console.log("Connent To MongoDB ^_^");
  } catch (err) {
    console.log(`Connection To MongoDB Faild => ${err}`);
  }
};
