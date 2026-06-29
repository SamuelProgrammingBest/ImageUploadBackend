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

module.exports = mongoose.model("imageUpload", imageSchema)