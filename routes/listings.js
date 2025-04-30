const express=require("express")
const router=express.Router()
const { listingSchema } = require("../schema.js");

const listing = require("../models/listing.js");

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


router.get("/",wrapAsync(async (req,res)=>{
    const allLists = await listing.find({});
    res.render("home.ejs", { allLists });
}))

router.get("/new",(req,res)=>{
    res.render("new.ejs");
})

router.get("/:id",wrapAsync(async (req,res)=>{
    const {id}=req.params;
    const list =await listing.findById(id).populate("reviews");
    res.render("show.ejs",{list});
}))

router.post("/", validateListing,wrapAsync(async (req,res)=>{
        const {newlist}=req.body;
        const newList =new listing(newlist);
        if(!newList){
            throw new expressError(400,"invalid data");
        }
        await newList.save();
        req.flash("success","new list created successfully")
        res.redirect("/listing");   
}))

router.get("/:id/edit",wrapAsync(async (req,res)=>{
    const {id}=req.params;
    const list=await listing.findById(id);
    res.render("edit.ejs",{list});
}))

router.put("/:id",validateListing,wrapAsync(async (req,res)=>{
    const {id}=req.params;
    let {newlist}=req.body;
    await listing.findByIdAndUpdate(id,newlist);
    req.flash("success","List updated successfully");
    res.redirect(`/listing/${id}`)
}))

router.delete("/:id",wrapAsync(async (req,res)=>{
    const {id}=req.params;
    await listing.findByIdAndDelete(id);
    req.flash("success","List deleted successfully");
    res.redirect("/listing")
}))

module.exports=router;

