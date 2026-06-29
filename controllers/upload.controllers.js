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

    const base64 = `data:${
      file.mimetype
    };base64,${file.buffer.toString("base64")}`;

    const resultImage = await cloudinary.uploader.upload(base64, {
      folder: "imgUpload",
      use_filename:true,
      overwrite:true
    });

    const imageResult = await imageModel.create({
      image: resultImage.secure_url,
      imagePublicId: resultImage.public_id,
    });

    return res.status(200).send({
      message: `Image Upload successful`,
      address:imageResult.image,
      fileName:imageResult.imagePublicId
    });
  } catch (error) {
    console.log(error);
    res.status(403).send({
      message: `Image Upload failed and error = ${error}`,
    });
  }
};

const downloadImage = async (req, res) => {
  try {
    const { filename } = req.params;

    if (!filename) {
      return res.status(403).send({
        message: `Image filename needed`,
      });
    }

    const image = imageModel.find({imagePublicId:filename})

    return res.status(200).send({
      message: `Image Upload successful`,
      image
    });

  } catch (error) {
    console.log(error);
    res.status(403).send({
      message: `Image Download failed and error = ${error}`,
    });
  }
};

module.exports = { uploadImage, downloadImage };
