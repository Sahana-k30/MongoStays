const mongoose=require("mongoose")

const listSchema = new mongoose.Schema({
    title:String,
    description:String,
    image:{
        type:String,
        default:"https://unsplash.com/photos/a-lone-tree-in-a-field-with-mountains-in-the-background-pefOjha82hw",
        set:(v)=> 
          v=== ""
            ?"https://unsplash.com/photos/a-lone-tree-in-a-field-with-mountains-in-the-background-pefOjha82hw" 
            : v,
    },
    price:Number,
    location:String,
    country:String
})

const listing=mongoose.model("listing",listSchema);

module.exports=listing;