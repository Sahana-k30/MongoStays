const express=require("express")
const router=express.Router({mergeParams:true});
const listing = require("../models/listing");
const reviews = require("../models/review.js");


router.post("/",async(req,res)=>{
    const { id } = req.params;
    const list = await listing.findById(id);

    let newrev=new reviews(req.body.reviews);
    await newrev.save();
    list.reviews.push(newrev);
    await list.save();
    res.redirect(`/listing/${list._id}`)
})

module.exports=router;