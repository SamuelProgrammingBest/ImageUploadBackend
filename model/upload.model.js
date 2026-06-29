const mongoose = require("mongoose");

const imageSchema = mongoose.Schema(
    {
        image:{
            type:String,
        },

        imagePublicId:{
            type:String
        }
    },
    {timstamps:true}
)

const imageModel = mongoose.model("imageUpload", imageSchema)

module.exports = imageModel