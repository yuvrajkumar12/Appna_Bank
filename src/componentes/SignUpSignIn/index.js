import React, { useState } from "react";
import "./style.css";
import Input from "../input";
import Button from "../Button";
import {createUserWithEmailAndPassword,GoogleAuthProvider,signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import {auth,db, provider} from "../../firebase";
import { doc, setDoc ,getDoc} from "firebase/firestore"; 
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function SignupSigninComponenent() {
  const [name, setName]=useState("");
  const [email, setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [confirmPassword, setConfirmPassword]= useState("");
  const [loginForm, setLoginForm]=useState(false);
  const [loading, setLoading]=useState(false);
  const navigate=useNavigate();

  function SignupWithEmail(){
    setLoading(true);
    console.log("Name",name);
    console.log("emal",email);
    console.log("Password",password);
    console.log("confirm password",confirmPassword);

    //Authenticate the user, or basically create a new account using email and password 
    if(name!==""&& email!=="" && password!=="" && confirmPassword!==""){
      if(password===confirmPassword){
          createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log("User>>>>",user);
          toast.success("User Created!")
          setLoading(false);
          setName("");
          setPassword("");
          setEmail("");
          setConfirmPassword("");
          createDoc(user);
          navigate("/dashboard");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
          setName("");
          setPassword("");
          setEmail("");
          setConfirmPassword("");
        });
      }else{
        toast.error("Password and Conform Password don't match! ");
        setEmail(false);
      }
      
    }else{
      toast.error("All fields are mandatory!" );
      setLoading(false);
    }
  }

  async function createDoc(user){
    //create a Doc.
    setLoading(true);
    if(!user) return;
    const userRef=doc(db, "users", user.uid);
    const userData=await getDoc(userRef);
    if(!userData.exists()){
      try{
        await setDoc(doc(db, "users", user.uid),
        {name:user.displayName? user.displayName:name,
           email:user.email,photoURL:user.photoURL?user.photoURL:"",
           createdAt:new Date(),
        });
        toast.success("Doc created!");
        setLoading(false);
      }
      catch(e){
        toast.error(e.message);
        setLoading(false);
      }
    } 
    else{
      toast.error("Doc already exists");
      setLoading(false);
    }
  }

  function loginUsingEmail(){
    console.log("Email",email);
    console.log("password",password);
    setLoading(true);
    if(email!==""&& password!==""){
          signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        toast.success("User Logged In!");
        console.log("User Logged in", user);
        setLoading(false);
        navigate("/dashboard");
        // ...
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(true);
        toast.error(errorMessage);
      });

    }else{
      toast.error("All fields are mandatery!");
    }
  }

  function googleAuth(){
    setLoading(false);
    try{
      signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log("user>>>",user);
        createDoc(user);
        setLoading(false);
        navigate("/dashboard");
        toast.success("User authenticated!");
      }).catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
      });

    }catch(e){
      setLoading(false);
      toast.error(e.message);
    }
  }
  return (
    <>
    {loginForm? (<div className="signup-wrapper">
        <h2 className="title">
           Login on<span style={{color:"var(--them)"}} >Financely.</span>
        </h2>
        <form>
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
          <Button
          disabled={loading}
          text={loading? "loading...":"Login Using Email and Password"}
          onClick={loginUsingEmail}/>
          <p className="p-login">or</p>
          <Button 
          onClick={googleAuth}
          text={loading?"Loaging...":"Login Using Google"} blue={true}/>
          <p className="p-login"
          style={{cursor:"pointer"}} onClick={()=>setLoginForm(!loginForm)}>Or Don't Have An Account? Click Here </p>
        </form>
      </div>): (<div className="signup-wrapper">
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
          disabled={loading}
          text={loading? "loading...":"Signup Using Email and Password"}
          onClick={SignupWithEmail}/>
          <p className="p-login">or</p>
          <Button 
          onClick={googleAuth}
          text={loading?"Loaging...":"Signup Using Google"} blue={true}/>
          <p className="p-login"style={{cursor:"pointer"}} onClick={()=>setLoginForm(!loginForm)}>Or Have An Account Already? Click Here </p>
        </form>
      </div>
    )}
    </>
  );
}
export default SignupSigninComponenent