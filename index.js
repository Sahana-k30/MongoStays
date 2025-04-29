const express=require("express")
const app=express()
const mongoose=require("mongoose")
const methodOverride=require("method-override")
const listing = require("./models/listing.js");
const reviews = require("./models/review.js");
const path=require("path");
const ejsMate=require("ejs-mate");
const port=3003;
const listingSchema=require("./schema.js");
const listings=require("./routes/listings.js");
const review=require("./routes/reviews.js");


app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"))
app.engine("ejs",ejsMate);

function wrapAsync(fn){
    return function(req,res,next){
        fn(req,res,next).catch(err=>next(err));
    }
}
class expressError extends Error{
    constructor (statusCode,message)
    {
        super();
        this.status=statusCode;
        this.message=message;
    }
}
const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        throw new expressError(404, "Enter valid info");
    } else {
        next();  
    }
}


main()
.then(()=>{
    console.log("databse connected")
})
.catch((err)=>{
    console.log(err)
})

async function main(){
    mongoose.connect("mongodb://127.0.0.1:27017/airbnb")
}

app.use("/listing",listings);
app.use("/listing/:id/reviews",review);

app.use((err,req,res,next)=>{
    let{statusCode=500,message="something went wrong"}=err;

    res.render("error.ejs",{err})
})



app.listen(port,()=>{
    console.log("Server is running successfully");
})
