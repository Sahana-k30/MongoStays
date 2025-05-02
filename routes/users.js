const express=require("express")
const router=express.Router()
const Localstrategy=require("passport-local") 
const passportLocalMongoose = require('passport-local-mongoose');
const passport=require("passport")
const controluser=require("../controllers/users")

router.route("/signup")
.get((req,res)=>{
    res.render("signup.ejs")
})
.post(controluser.adduser)

router.route("/login")
.get((req,res)=>{
    res.render("login.ejs")
})
.post(
    passport.authenticate("local",{
        failureRedirect:"/login",
        failureFlash:true,
    }),
    controluser.addlogin)

router.get("/logout",(req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err)
        }
        req.flash("success","successfully logout")
        res.redirect("/listing")
    })
})
module.exports=router;