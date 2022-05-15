import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {

    const navigate = useNavigate();

    useEffect(() => {
        fetch('/Logout', {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then((res)=>{
            navigate('/');
            if(!res.status===200)
                throw new Error(res.error);
        }).catch((err) => {
            console.log("error--> "+ err);
        })
    });

    return (
        <>
        </>
    )
}

export default Logout
