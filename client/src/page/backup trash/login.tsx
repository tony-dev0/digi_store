import { useState } from "react"; 
import logo from "../assets/images/logo14.png";
import { useNavigate } from "react-router-dom";
// import "../styles/auth.css";
import axios from "axios";

export const Login = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: '',
        password:'' 
    })
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {  
        setValues({...values, [e.target.name] : [e.target.value]})      
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axios.post('/api/auth/login', values).then((res) => {
        if (res.data.valid){
            console.log("logging in");
             navigate('/')
        }
        else {
            console.log('failed')     
    }
    }).catch((err) => {
        console.log(`Internal Err ${err}`)
    })}
    return (
        <>
<section className="authsec"> 
    <div className="section">  
     <div className="signin"> 
      <div className="content"> 
        <div className="img">
            <img src={logo} alt="" />
        </div>
     {/* { location.state.valid && <div className="alert alert-success"><p>{location.state.msg}</p></div> } */}
       <h2>Sign In</h2> 
       <form className="form" onSubmit={handleSubmit}> 
        <div className="inputBox"> 
         <input type="text" name="email" onChange={handleInput} required />
              <i>Email</i> 
        </div> 
        <div className="inputBox"> 
              <input type="password" name="password" onChange={handleInput} required />
              <i>Password</i> 
        </div> 
        <div className="links">
             <a href="#">Forgot Password?</a> 
             <a href="/register">Signup</a> 
        </div> 
        <div className="inputBox"> 
             <input type="submit" value="Login" /> 
        </div> 
       </form> 
      </div> 
     </div> 
    </div> 
   </section>
</>
    )}