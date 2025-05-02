const User = require('../models/users.js');

module.exports.adduser=async (req,res)=>{
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
}

module.exports.addlogin=async (req,res)=>{
    req.flash("success","successfully logged in")
    res.redirect("/listing")
}
