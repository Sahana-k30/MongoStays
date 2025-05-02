const listing = require("../models/listing.js");

module.exports.index=async (req,res)=>{
    const allLists = await listing.find({});
    res.render("home.ejs", { allLists });
};

module.exports.show=async (req,res)=>{
    const {id}=req.params;
    const list =await listing.findById(id).populate("reviews").populate("owner");
    res.render("show.ejs",{list});
}

module.exports.new=async (req,res)=>{
        let url=req.file.path;
        let filename=req.file.filename;
        const {newlist}=req.body;
        const newList =new listing(newlist);
        if(!newList){
            throw new expressError(400,"invalid data");
        }
        newList.owner = req.user._id; 
        newList.image={url,filename};
        await newList.save();
        req.flash("success","new list created successfully")
        res.redirect("/listing");   
    }

module.exports.edit=async (req,res)=>{
    const {id}=req.params;
    const list=await listing.findById(id);
    res.render("edit.ejs",{list});
}

module.exports.update=async (req,res)=>{
    const {id}=req.params;
    let {newlist}=req.body;
    await listing.findByIdAndUpdate(id,newlist);
    req.flash("success","List updated successfully");
    res.redirect(`/listing/${id}`)
}

module.exports.delete=async (req,res)=>{
    const {id}=req.params;
    await listing.findByIdAndDelete(id);
    req.flash("success","List deleted successfully");
    res.redirect("/listing")
}
