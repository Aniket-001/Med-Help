import { React, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom'
import "./page.css"


const LogIn = () => {
	const navigate = useNavigate();
	const [data, setdata] = useState({
		email: "",
		psswrd: "",
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
	}

	const fillData = (e) => {
		const { name, value } = e.target;
		setdata({ ...data, [name]: value });
	}
	const chkData=async(e)=>{
		e.preventDefault();
		const {email,psswrd} =data;
		const res=await fetch('/Login',{
		  method:"POST",
		  headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		  },
		  body: JSON.stringify({
			email,psswrd
		  })
		});
		if(res.status!==200 || !res){
		  console.log("Invalid Credential");
		  notify("error", "Invalid credential");
		}
		else{
		  setdata({email:"",psswrd:""});
		  navigate("/Chat");
		  notify("success", "Successfully logged in");
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
						<h5>LogIn</h5>
						<p>Don't have an account? <Link to="/Signin">Create Your Account</Link> it takes less than a minute</p>
						<div className="inputs">
							<input type="text" placeholder="user name" name="email" onChange={fillData} value={data.email} />
							<input type="password" placeholder="password" name="psswrd" onChange={fillData} value={data.psswrd} />
						</div>
						<div className="remember-me--forget-password">
							<p>Forget password?</p>
						</div>
						<br />
						<button onClick={chkData}>Login</button>
					</div>
				</div>
			</div>
			<ToastContainer />
		</>	
		)
	}

	export default LogIn
