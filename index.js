const express=require("express")
const app=express()
const mongoose=require("mongoose")
const methodOverride=require("method-override")
const path=require("path");
const ejsMate=require("ejs-mate");
const port=3003;
const listingSchema=require("./schema.js");
const listings=require("./routes/listings.js");
const review=require("./routes/reviews.js");
const Users=require("./routes/users.js");
const session=require("express-session");
const flash=require("connect-flash");
const User = require('./models/users');
const passport=require("passport")
const Localstrategy=require("passport-local")  
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' }) 
require('dotenv').config()

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"))
app.engine("ejs",ejsMate);

passport.use(new Localstrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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

app.use(session({
    secret: 'mysupersecretcode',
    resave: false,
    saveUninitialized: true,
}))
app.use(flash());
app.use(passport.initialize())
app.use(passport.session())

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.currUser=req.user;
    next();
})

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
app.use("/",Users);

app.use((err,req,res,next)=>{
    let{statusCode=500,message="something went wrong"}=err;

    res.render("error.ejs",{err})
})

app.listen(port,()=>{
    console.log("Server is running successfully");
})
