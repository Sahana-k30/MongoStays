const mongoose=require("mongoose")

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
        type:String,
        default:"https://unsplash.com/photos/a-lone-tree-in-a-field-with-mountains-in-the-background-pefOjha82hw",
        set:(v)=> 
          v=== ""
            ?"https://unsplash.com/photos/a-lone-tree-in-a-field-with-mountains-in-the-background-pefOjha82hw" 
            : v,
        required:true    
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
    }
})

const listing=mongoose.model("listing",listSchema);

module.exports=listing;