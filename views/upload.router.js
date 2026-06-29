const express = require("express")
const upload = require("../config/upload")
const { uploadImage } = require("../controllers/upload.controllers")

const router = express.Router()

router.post("/upload", upload.single("imgUpload"), uploadImage)

module.exports = router