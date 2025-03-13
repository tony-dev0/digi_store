import React, { useState } from "react";
// import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo14.png";// import "../styles/auth.css";
// import { register } from "../services/auth.service";
import { toast } from 'react-hot-toast';


interface valueTypes {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    password: string;
    cpassword: string;
}

export const Register: React.FC = () => {
    const navigate = useNavigate();
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {  
        setValues({...values, [e.target.name] : [e.target.value]})      
    }
    const [isSubmit, setSubmit] = useState<boolean>(false);
    const [failed, setFailure] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [values, setValues] = useState<valueTypes>({
        firstname: '',
        lastname:'',
        email:'',
        phone:'',
        password:'',
        cpassword:''
    })
    const [err, setErr] = useState<any>({})

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErr({});
        setSubmit(true);
        setErr(validate(values)); 
       if (Object.keys(err).length > 0) {console.log(err); return;}
        console.log(err);
        register(values.firstname, values.lastname, values.email, values.phone, values.password).then(
            (response) => {
              if (response.data.success)  
                {
                   console.log('registered successfylly');
                   toast.success("Registration Successful");
                   navigate("/login");
            } else { setMessage(response.data.message); setFailure(true); }
            },
            (error) => {
              const resMessage =
                error?.message ||
                error.toString();
                setFailure(true);
                setMessage(resMessage);
            }
          );     
    }
      const validate = (values: valueTypes) => {
        // let err: any = {};
        if(!values.firstname){
            err.firstname = "firstname is required"
        }
        if(!values.lastname){
            err.lastname = "lastname is required"
        }
        if(!values.email){
            err.email = "email field is required"
        }
        else if (!/\S+@\S+\.\S+/.test(values.email)) {
            err.email = "email is not valid"
        }
        if(!values.phone){
            err.phone = "Phone number is required"
        }
        if(!values.password){
            err.password = "password field cannot be left empty"
        }
        else if ((values.password).toString().length < 7) {
            err.password = "password should not be less than 7 characters"
        }
        if((values.cpassword).toString() !== (values.password).toString()){
            err.cpassword = "password does not match"
        }
        return err;
    }
    return (
        <>
<section className="authsec"> 
    <div className="section">  
     <div className="signin"> 
      <div className="content"> 
          <div className="img">
              <img src={logo} alt="" />
            </div>
      {!message && <h2>Sign Up</h2> }
       <form className="form" onSubmit={handleSubmit}> 
       {isSubmit && <div className={failed ? "alert alert-danger" : "null"} role="alert">{message}</div>}
        <div className="inputBox"> 
         <input type="text" name="firstname" onChange={handleInput} required /> 
         <i>First name</i> 
        {err.firstname && <p style={{color: "tomato"}}><small>{err.firstname}</small></p>}
        </div> 
        <div className="inputBox"> 
          <input type="text" name="lastname" onChange={handleInput} required />
               <i>Last name</i> 
        {err.lastname && <p style={{color: "tomato"}}><small>{err.lastname}</small></p>}
         </div> 
         <div className="inputBox"> 
          <input type="text" name="email" onChange={handleInput} autoComplete="off" required />
              <i>Email Address</i> 
        {err.email && <p style={{color: "tomato"}}><small>{err.email}</small></p>}
         </div>
         <div className="inputBox"> 
          <input type="number" name="phone" onChange={handleInput} required /> 
              <i>Phone Number</i> 
        {err.phone && <p style={{color: "tomato"}}><small>{err.phone}</small></p>}
         </div>
        <div className="inputBox"> 
         <input type="password" name="password" onChange={handleInput} required />
             <i>Password</i> 
        {err.password && <p style={{color: "tomato"}}><small>{err.password}</small></p>}
        </div> 
         <div className="inputBox"> 
         <input type="password" name="cpassword" onChange={handleInput} required /> 
             <i>Confirm Password</i> 
        {err.cpassword && <p style={{color: "tomato"}}><small>{err.cpassword}</small></p>}
        </div> 
        <div className="links"> 
             <a href="#">Already have an account</a> 
             <a href="/login">Login</a> 
        </div> 
        <div className="inputBox"> 
              <input type="submit" value="Register"  /> 
        </div> 
        <div className="tandc"><span>By signing up you accept our </span>
               <a href="/content/terms-and-conditions" target="_blank">terms and conditions</a>
            <div>
                <a href="/content/privacy-policy" target="_blank">&amp; privacy policy</a>
            </div>
        </div>
       </form> 
      </div> 
     </div> 
    </div>
</section>
        </>
    )
}