const express=require("express")
const router=express.Router({mergeParams:true});
const controlreview=require("../controllers/reviews.js")


router.post("/",controlreview.addreview)

module.exports=router;