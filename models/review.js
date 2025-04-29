const { string } = require("joi");
const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const reviewschema=new Schema({
    message: {
        type: String,
        required: true   // optional but recommended
    },
    rating:{
        type:Number,
        min:1,
        max:5
    },
})

module.exports=mongoose.model("reviews",reviewschema);