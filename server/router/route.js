const express = require("express");
const { isRequired } = require("nodemon/lib/utils");
const router = express.Router();
require('../db/conn');
const User = require("../db/schema");
const bcrypt = require("bcrypt");
const nodemail = require("nodemailer");
const jwt= require("jsonwebtoken");
const auth= require("../middleware/authenticate");

const transport = nodemail.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.ID,
        pass: process.env.PASS
    }
});

let onetime=0;
const sendmail = (fname,email) => {

    onetime = Math.floor(89999*Math.random())+10000;

    var mailoption = {
        from: process.env.ID,
        to: email,
        subject: "OTP (Email Authentication)",
        html: `<p>Hii! ${fname},<br><br>We are happy to have you on Med-Help. Your OTP is <b>${onetime}</b>. Don't share it with someone else. <br><br><br>Thanks and Regards,<br><i>Med-Help</i><p>`
    }

    transport.sendMail(mailoption, (error, info) => {
        if (error) {
            console.log(error);
            return false;
        }
        else{
            console.log("Email sent: " + info.response);
        }
    })
    return true;
}

/*router.get('/', (req, res)=>{
    res.end("../../client/public/index.html"); 
});*/

router.post("/Signin", async (req, res) => {
    try {
        const { fname, lname, email, psswrd, otp } = req.body;
        
        if (Number(otp) != onetime) {
            onetime = 0;
            throw new Error("OTP didn't match");
        }
        const user = new User({ fname, lname, email, psswrd });
        const msg1 = await user.save();
        if (msg1) {
            console.log("successfully registered");
            res.status(200).send("successfully registered");
        }
    }
    catch (err) {
        console.log("ERROR2--> " + err);
        res.status(400).send("error-->" + err);
    }
})

router.post("/Login", async (req, res) => {
    try {
        const { email, psswrd } = req.body;
        const dataExist = await User.findOne({ email });
        const pswrdMatch = await bcrypt.compare(psswrd, dataExist.psswrd)
        if (pswrdMatch) {
            console.log("login Successfully");
            const token= await dataExist.generateToken(); 
            res.cookie("jwttoken",token,{
                expires :new Date(Date.now()+ 25892000000),
                httpOnly:true
            }); 
            res.status(200).send("login Successfully");
        }
        else {
            console.log("Invalid Credential");
            throw new Error("Invalid Credential");
        }
    }
    catch (err) {
        console.log("ERROR4--> " + err);
        res.status(400).send("error-->" + err);
    }
})
router.post("/chkOTP", async (req, res) => {
    try {
        const {fname,email, psswrd, cpsswrd} = req.body;
        const dataExist = await User.findOne({ email });
        if (psswrd != cpsswrd) {
            throw new Error("Password didn't match");
        }
        if (dataExist) {
            throw new Error("This id has already been registered");
        }
        if(sendmail(fname,email))
            res.status(200).send("OTP checked");
        else
            throw new Error("Wrong OTP");
    }
    catch (err) {
        console.log("ERROR6--> " + err);
        res.status(400).send("error-->" + err);
    }
})

router.get('/Chat', auth, (req, res)=>{
    res.send(req.userData); 
});

router.get('/Logout', (req, res)=>{
    res.clearCookie('jwttoken');
    res.status(200).send("Logged out"); 
});

module.exports = router;