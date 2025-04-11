const express=require("express")
const app=express()
const mongoose=require("mongoose")
const methodOverride=require("method-override")
const listing = require("./models/listing.js");
const path=require("path");
const ejsMate=require("ejs-mate");
const port=3003;



app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"))
app.engine("ejs",ejsMate);

main()
.then(()=>{
    console.log("databse connected")
})
.catch((err)=>{
    console.log(err)
})

async function main(){
    mongoose.connect("mongodb://127.0.0.1:27017/airbnb")
}

app.get("/listing",async (req,res)=>{
    const allLists = await listing.find({});
    res.render("home.ejs", { allLists });
})

app.get("/listing/new",(req,res)=>{
    res.render("new.ejs");
})

app.get("/listing/:id",async (req,res)=>{
    const {id}=req.params;
    const list =await listing.findById(id);
    res.render("show.ejs",{list});
})

app.post("/listing",async (req,res)=>{
    const {newlist}=req.body;
    const newList =new listing(newlist);
    await newList.save();
    res.redirect("/listing");
})

app.get("/listing/:id/edit",async (req,res)=>{
    const {id}=req.params;
    const list=await listing.findById(id);
    res.render("edit.ejs",{list});
})

app.put("/listing/:id",async (req,res)=>{
    const {id}=req.params;
    let {newlist}=req.body;
    await listing.findByIdAndUpdate(id,newlist);
    res.redirect(`/listing/${id}`)
})

app.delete("/listing/:id",async (req,res)=>{
    const {id}=req.params;
    await listing.findByIdAndDelete(id);
    res.redirect("/listing")
})

app.listen(port,()=>{
    console.log("Server is running successfully");
})
