const mongoose = require("mongoose");

const imageModel = require("../model/upload.model");
const cloudinary = require("../config/cloudinary");

const uploadImage = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(403).send({
        message: `Image is required`,
      });
    }

    console.log(file);

    const resultImage = await cloudinary.uploader.upload(file);

    const imageResult = await imageModel.create({
      image: resultImage.secure_url,
      imagePublicId: resultImage.public_id,
    });

    return res.status(200).send({
      message: `Image Upload successful`,
    });
  } catch (error) {
    console.log(error);
    res.status(403).send({
      message: `Image Upload failed and error = ${error}`,
    });
  }
};

module.exports = { uploadImage };
