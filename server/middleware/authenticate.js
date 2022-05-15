const jwt = require('jsonwebtoken');
const User = require("../db/schema");

const authenticate =async (req,res,next)=>{
    try{
        const token = req.cookies.jwttoken;
        const verifytoken = jwt.verify(token,process.env.KEY);

        const userData=await User.findOne({id:verifytoken.id, "tokens.token":token});

        if(!userData)
            throw new Error("user not found");

        req.token = token;
        req.userData = userData;
        req.userID = userData.id;

        next();
    }
    catch(err){
        console.log("Error--> "+err);
        res.status(401).send("Unauthorized: No token provided");
    }
}

module.exports = authenticate;