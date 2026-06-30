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

    const accept = ["image/jpg", "image/png", "image/gif"]

    if(!accept.includes(file.mimetype)) {
      return res.status(403).send({
        message: `Unsupported File Format`,
      });
    }

    const base64 = `data:${
      file.mimetype
    };base64,${file.buffer.toString("base64")}`;

    const resultImage = await cloudinary.uploader.upload(base64, {
      folder: "imgUpload",
      use_filename:true,
      overwrite:true
    });

    const downloadable = cloudinary.url(resultImage.public_id, {
      flags:"attachment"
    })

    const imageResult = await imageModel.create({
      image: downloadable,
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

    const imageResult = imageModel.findOne({imagePublicId:filename})

    return res.status(200).send({
      message: `Image Download successful`,
      data:{
        image:imageResult
      }
    });

  } catch (error) {
    console.log(error);
    res.status(403).send({
      message: `Image Download failed and error = ${error}`,
    });
  }
};

module.exports = { uploadImage, downloadImage };
