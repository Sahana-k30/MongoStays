const express=require("express")
const app=express()
const mongoose=require("mongoose")
const methodOverride=require("method-override")
const listing = require("./models/listing.js");
const path=require("path");
const ejsMate=require("ejs-mate");
const port=3003;
const listingSchema=required("./schema.js");


app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"))
app.engine("ejs",ejsMate);

function wrapAsync(fn){
    return function(req,res,next){
        fn(req,res,next).catch(err=>next(err));
    }
}
class expressError extends Error{
    constructor (statusCode,message)
    {
        super();
        this.status=statusCode;
        this.message=message;
    }
}

const validateListing=(req,res,next)=>{
    let{error}=listingSchema.validate(req.body);
    if(error){
        throw new expressError(404,"Enter valid info");
    } else{
        next(err);
    }
}

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

app.get("/listing", validateListing,wrapAsync(async (req,res)=>{
    const allLists = await listing.find({});
    res.render("home.ejs", { allLists });
}))

app.get("/listing/new",(req,res)=>{
    res.render("new.ejs");
})

app.get("/listing/:id",wrapAsync(async (req,res)=>{
    const {id}=req.params;
    const list =await listing.findById(id);
    res.render("show.ejs",{list});
}))

app.post("/listing",wrapAsync(async (req,res)=>{
        const {newlist}=req.body;
        const newList =new listing(newlist);
        if(!newList){
            throw new expressError(400,"invalid data");
        }
        await newList.save();
        res.redirect("/listing");   
}))

app.get("/listing/:id/edit",wrapAsync(async (req,res)=>{
    const {id}=req.params;
    const list=await listing.findById(id);
    res.render("edit.ejs",{list});
}))

app.put("/listing/:id",validateListing,wrapAsync(async (req,res)=>{
    const {id}=req.params;
    let {newlist}=req.body;
    await listing.findByIdAndUpdate(id,newlist);
    res.redirect(`/listing/${id}`)
}))

app.delete("/listing/:id",wrapAsync(async (req,res)=>{
    const {id}=req.params;
    await listing.findByIdAndDelete(id);
    res.redirect("/listing")
}))


app.use((err,req,res,next)=>{
    let{statusCode=500,message="something went wrong"}=err;

    res.render("error.ejs",{err})
})

app.listen(port,()=>{
    console.log("Server is running successfully");
})
