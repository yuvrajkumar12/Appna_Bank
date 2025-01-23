import React, { useState } from "react";
import "./style.css";
import Input from "../input";
import Button from "../Button";


function SignupSigninComponenent() {
  const [name, setName]=useState("");
  const [email, setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [confirmPassword, setConfirmPassword]= useState("");

  return (
    <div className="signup-wrapper">
        <h2 className="title">
           Sing Up on <span style={{color:"var(--them)"}} >Financely.</span>
        </h2>
        <form>
          <Input
            label={"Full Name"}
            state={name}
            setState={setName}
            placeholder={"Yuvraj Kumar"}
          />
          <Input
            label={"Email"}
            state={email}
            setState={setEmail}
            placeholder={"Yuvrajku@gmail.com"}
          />
          <Input
            label={"confirmPassword"}
            state={confirmPassword}
            setState={setConfirmPassword}
            placeholder={"Example123@"}
          />

          <Input
            label={"conf"}
            state={password}
            setState={setPassword}
            placeholder={"Example123@"}
          />
          <Button
          text="Sign up with your Google account"
          onClick={() => alert("Signup Clicked!")}/>
          <p >style={{textAlign:"center"}}or</p>
          <Button 
          text="Sinup Using Google" 
          onClick={() => alert("Signup Clicked!")}/>
        </form>
    </div>
  );
}

export default SignupSigninComponenent