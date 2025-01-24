import React, { useState } from "react";
import "./style.css";
import Input from "../input";
import Button from "../Button";
import {createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../firebase";
import {toast} from "react-toastify";

function SignupSigninComponenent() {
  const [name, setName]=useState("");
  const [email, setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [confirmPassword, setConfirmPassword]= useState("");

  function SignupWithEmail(){
    console.log("Name",name);
    console.log("emal",email);
    console.log("Password",password);
    console.log("confirm password",confirmPassword);
    //Authenticate the user, or basically create a new account using email and password 
    if(name!=""&& email!="" && password!="" && confirmPassword!=""){
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("User>>>>",user);
        toast.success("user Created!")
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
    }else{
      toast.error("All fields are mandatory!")
    }
  }
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
          type="email"
            label={"Email"}
            state={email}
            setState={setEmail}
            placeholder={"Yuvrajku@gmail.com"}
          />
          <Input
            type="password"
            label={"Password"}
            state={password}
            setState={setPassword}
            placeholder={"Example123@"}
          />
          <Input
            type="Password"
            label={"confirm Password"}
            state={confirmPassword}
            setState={setConfirmPassword}
            placeholder={"Example123@"}
          />
          <Button
          text={"Signup Using Email and Password"}
          onClick={SignupWithEmail}/>
          <p style={{textAlign:"center",margin: 0 }}>or</p>
          <Button
          text={"Signup Using Google"}
          onClick={() => alert("Signup Clicked!")} blue={true}/>
        </form>
    </div>
  );
}

export default SignupSigninComponenent