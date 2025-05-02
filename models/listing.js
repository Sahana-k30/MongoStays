const mongoose=require("mongoose");
const review = require("./review");
const Schema=mongoose.Schema;

const listSchema = new mongoose.Schema({
    title:{
      type:String,
      required:true
    },
    description:{
      type:String,
      required:true
    },
    image:{
        url:String,
        fname:String,   
    },
    price:{
      type:Number,
      required:true
    },
    location:{
      type:String,
      required:true
    },
    country:{
      type:String,
      required:true
    },
    reviews:[{
      type:Schema.Types.ObjectId,
      ref:"reviews"
    }],
    owner:[{
      type:Schema.Types.ObjectId,
      ref:"User"
    }]
})

const listing=mongoose.model("listing",listSchema);

listSchema.post("findOneAndDelete",async(listing)=>{
  await review.deleteMany({reviews:{$in : listing.reviews}})
})

module.exports=listing;