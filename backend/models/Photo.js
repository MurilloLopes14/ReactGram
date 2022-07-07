const mongoose = require("mongoose");

const photoSchema = mongoose.Schema(
  {
    image: { type: String },
    title: { type: String },
    likes: { type: Array },
    comments: { type: Array },
    userId: mongoose.ObjectId,
    userName: { type: String },
  },
  {
    timeStamps: true,
  }
);

const Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;
