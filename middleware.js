module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash("error","you must login to create a listing");
        return res.redirect("/login");
    }
    next();
}
module.exports.isOwner= async (req,res,next)=>{
    const {id}=req.params;
    let listing =await listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("success","no permission to edit or delete")
        res.redirect(`/listing/${id}`)
    }
    next();
}