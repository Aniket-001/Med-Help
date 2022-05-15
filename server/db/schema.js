require("./conn");
const jwt = require("jsonwebtoken");
const mongoose=require("mongoose");
const bcrypt=require("bcrypt");

const userSchema=mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    psswrd:{
        type:String,
        required:true
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
})

userSchema.pre("save",async function(next){
    if(this.isModified('psswrd')){
        this.psswrd=await bcrypt.hash(this.psswrd,12);
    }
    next();
})

userSchema.methods.generateToken=async function(){
    try{
        let token = jwt.sign({id:this.id},process.env.KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }
    catch(err){
        console.log("Error--> "+err)
    }
}


const User=new mongoose.model('user',userSchema);

module.exports=User;