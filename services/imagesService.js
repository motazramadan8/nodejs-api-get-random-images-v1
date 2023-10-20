const asyncHandler = require("express-async-handler");
const { Image } = require("../models/Image");
const path = require("path");
const fs = require("fs");
const { cloudinaryUploadImage } = require("../utils/cloudinary");

/** -----------------------------------
 * @desc   Create New Image
 * @route  /api/v1/images
 * @method POST
 * @access public
-----------------------------------*/

module.exports.createImageService = asyncHandler(async (req, res) => {
  // Validation For Image
  if (!req.file) {
    return res.status(400).json({ msg: "No Image Provided" });
  }

  // Upload Photo
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  const result = await cloudinaryUploadImage(imagePath);

  // Create New Image And Save It In DB
  const image = await Image.create({
    image: {
      url: result.secure_url,
      publicId: result.public_id,
    },
  });

  // Send Response To Client
  res.status(201).json(image);

  // Delete Image From Server
  await fs.unlinkSync(imagePath);
});

/** -----------------------------------
 * @desc   Get One Random Image
 * @route  /api/v1/images/random
 * @method GET
 * @access public
-----------------------------------*/

module.exports.getOneRandomImage = asyncHandler(async (req, res) => {
  const image = await Image.aggregate([
    {
      $sample: {
        size: 1,
      },
    },
  ]);
  if (!image) {
    return res.status(404).json({ msg: "Not Found Image" });
  }
  res.status(200).json(image);
});
