const Listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
    const allLists = await Listing.find({});
    res.render("home.ejs", { allLists });
};

module.exports.show = async (req, res) => {
    const { id } = req.params;
    const list = await Listing.findById(id).populate("reviews").populate("owner");
    const mapToken = process.env.MAPBOX_TOKEN;
    res.render("show.ejs", { list, mapToken });
};

module.exports.new = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const { newlist } = req.body;
    const newList = new Listing(newlist);
    if (!newList) {
        throw new expressError(400, "invalid data");
    }
    newList.owner = req.user._id;
    newList.image = { url, filename };
    await newList.save();
    req.flash("success", "new list created successfully");
    res.redirect("/listing");
};

module.exports.edit = async (req, res) => {
    const { id } = req.params;
    const list = await Listing.findById(id);
    res.render("edit.ejs", { list });
};

module.exports.update = async (req, res) => {
    const { id } = req.params;
    let { newlist } = req.body.listing;
    let listingnew = await Listing.findByIdAndUpdate(id, newlist);
    if (req.file) {
        let url = req.file.url;
        let filename = req.file.filename;
        listingnew.image = { url, filename };
        await listingnew.save();
    }
    req.flash("success", "List updated successfully");
    res.redirect(`/listing/${id}`);
};

module.exports.delete = async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "List deleted successfully");
    res.redirect("/listing");
};
