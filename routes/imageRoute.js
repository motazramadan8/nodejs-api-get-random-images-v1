const router = require("express").Router();

const photoUpload = require("../middlewares/photoUpload");
const {
  createImageService,
  getOneRandomImage,
} = require("../services/imagesService");

// /api/v1/images
router.route("/").post(photoUpload.single("image"), createImageService);

// /api/v1/images/random
router.route("/random-nature").get(getOneRandomImage);

module.exports = router;
