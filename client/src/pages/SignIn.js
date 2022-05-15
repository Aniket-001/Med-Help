import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom'
import "./page.css"

const SignIn = () => {
  const [onetime, setotp] = useState(false);
  const navigate = useNavigate();
  const [data, setdata] = useState({
    fname: "",
    lname: "",
    email: "",
    psswrd: "",
    cpsswrd: "",
    otp: ""
  });

  const notify = (status, msg) => {
    if (status === "success") {
      toast.success(msg, {
        position: "top-center",
        autoClose: 3000 
      });
    }
    if (status === "error") {
      toast.error(msg, {
        position: "top-center",
        autoClose: 3000
      });
    }
    if (status === "warn") {
      toast.warn(msg, {
        position: "top-center",
        autoClose: 3000
      });
    }
  }

  const fillData = (e) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
  }

  const sendData = async (e) => {
    e.preventDefault();
    const { fname, lname, email, psswrd, otp } = data;
    const res = await fetch('/Signin', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        fname, lname, email, psswrd, otp
      })
    });
    //const info = await res.json();
    if (res.status === 400 || !res) {
      console.log("error!!!!");
      notify("warn", "Input Field Hasn't been filled properly");
    }
    else {
      setdata({ fname: "", lname: "", email: "", psswrd: "", cpsswrd: "", otp: "" });
      setotp(false);
      navigate("/Login");
      notify("success", "Successfully signed in");
    }
  }

  const chkOtp = async (e) => {
    e.preventDefault();
    const { fname, email ,psswrd,cpsswrd } = data;
    const res = await fetch('/chkOTP', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        fname, email, psswrd, cpsswrd
      })
    });
    if (res.status === 400 || !res) {
      console.log("Ooops OTP didn't match!!!!");
      notify("error", "Try again!!");
    }
    else {
      setotp(true);
      notify("success", "Check Your email for the OTP");
    }
  }

  return (
    <>
      <div className='form' method="POST">
        <div className="box-form">
          <div className="left">
            <div className="overlay">
              <h1>Med-Help</h1>
              <p>An initiative to provide safe environment at home to patients. You can go back to the <Link to="/">Home</Link> page</p>
              <img src="image/med.svg" alt="Signin" />
            </div>
          </div>


          <div className="right">
            <h5>SignIn</h5>
            <p>Already have an account? <Link to="/Login" className='route2'>Log in to Your Account</Link></p>
            <div className="inputs">
              <input type="text" placeholder="First name" name="fname" onChange={fillData} value={data.fname} />
              <input type="text" placeholder="Last name" name="lname" onChange={fillData} value={data.lname} />
              <input type="email" placeholder="email" name="email" onChange={fillData} value={data.email} />
              <input placeholder="password" type="password" name="psswrd" onChange={fillData} value={data.psswrd} />
              <input placeholder="confirm password" type="password" name="cpsswrd" onChange={fillData} value={data.cpsswrd} />
              {onetime ?
                <input placeholder="OTP" type="text" name="otp" onChange={fillData} value={data.otp} /> :
                ""
              }
            </div>
            <button onClick={onetime ? sendData : chkOtp}>{onetime ? "Sign in" : "Send OTP"}</button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default SignIn
