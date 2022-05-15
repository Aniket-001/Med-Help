const mongoose=require("mongoose");

const db=process.env.DB;

mongoose.connect(db).then(()=>{
    console.log("connected to the database");
}).catch((err)=>{
    console.log("ERROR1-->"+err);
});