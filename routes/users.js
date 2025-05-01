const express=require("express")
const router=express.Router()
const User = require('../models/users.js');
const Localstrategy=require("passport-local") 
const passportLocalMongoose = require('passport-local-mongoose');
const passport=require("passport")

router.get("/signup",(req,res)=>{
    res.render("signup.ejs")
})

router.post("/signup",async (req,res)=>{
    let {email,username,password}=req.body;
    const Newuser=new User({
        email,username
    })
    let result=await User.register(Newuser,password);
    console.log(result);
    req.login(Newuser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","welcome to wanderlust");
        res.redirect("/listing")
    })
})

router.get("/login",(req,res)=>{
    res.render("login.ejs")
})


router.post("/login",
    passport.authenticate("local",{
        failureRedirect:"/login",
        failureFlash:true,
    }),
    async (req,res)=>{
        req.flash("success","successfully logged in")
        res.redirect("/listing")
})

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