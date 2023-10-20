const mongoose = require("mongoose");

// Image Schema
const ImageSchema = new mongoose.Schema(
  {
    image: {
      type: Object,
      required: true,
      default: {
        url: "",
        publicId: null,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Image Model
const Image = mongoose.model("Image", ImageSchema);

module.exports = { Image };
