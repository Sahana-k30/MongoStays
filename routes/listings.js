const express=require("express")
const router=express.Router()
const{isLoggedIn,isOwner}=require("../middleware.js")
const { listingSchema } = require("../schema.js");
const controllisting=require("../controllers/listing.js")
const listing = require("../models/listing.js");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' }) 
const storage=require("../cloudconfig.js")

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

router.route("/")
.get(wrapAsync(controllisting.index))
.post(validateListing,upload.single('newlist[image]'),wrapAsync(controllisting.new))

router.get("/new",isLoggedIn,(req,res)=>{
    res.render("new.ejs");
})

router.get("/:id/edit", isLoggedIn,isOwner,wrapAsync(controllisting.edit))


router.route("/:id")
.get(wrapAsync(controllisting.show))
.put(validateListing,isOwner,wrapAsync(controllisting.update))
.delete(isLoggedIn,isOwner,wrapAsync(controllisting.delete))


module.exports=router;

