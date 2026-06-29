const express = require("express")
const upload = require("../config/upload")
const { uploadImage, downloadImage } = require("../controllers/upload.controllers")

const router = express.Router()

router.post("/upload", upload.single("imgUpload"), uploadImage)
router.get("/download/:filename", downloadImage)

module.exports = router