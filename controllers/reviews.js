const listing = require("../models/listing.js");
const reviews = require("../models/review.js");

module.exports.addreview=async(req,res)=>{
    const { id } = req.params;
    const list = await listing.findById(id);

    let newrev=new reviews(req.body.reviews);
    await newrev.save();
    list.reviews.push(newrev);
    await list.save();
    res.redirect(`/listing/${list._id}`)
}