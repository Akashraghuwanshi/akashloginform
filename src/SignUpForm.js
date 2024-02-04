import React from 'react';
import { useState } from 'react';
import {Link} from 'react-router-dom'
import "./SignUpModal.css";


 function SignUpForm() {

     const[formData,setFormData]=useState({
        name:'',
        number:'',
        email:'',
        password:'',

     });

const[errorMessages,setErrorMessages]=useState([false,false,false,false]);

const[emptyFields,setEmptyFields]= useState([false,false,false,false]);
//  const[emptyFields,setEmptyFields]= useState([]);
        // console.log(emptyFields)
    // const[firstSubmit ,setFirstSubmit] =useState(true);

     const nameRegex = /^[a-z\s]+$/i;//now due to \s it will take space as well
     const numberRegex = /^\d{10}$/;
     const emailRegex =/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
     const passwordRegex =/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
     
    const handleInputChange =(field,value)=>{

        setFormData((prevData)=>({...prevData,[field]:value}));
    }

    const handlePasswordVisibility=(event)=>{
        event.preventDefault();
        const passwordInput = document.querySelector('[data-key ="password"]');
        const eyebtn = document.getElementById('eyebtn');
        const type = passwordInput.getAttribute('type');
        if(type === 'text'){
            passwordInput.setAttribute('type','password');
            eyebtn.innerHTML ='visibility_off';
        }else{
            passwordInput.setAttribute('type','text');
            eyebtn.innerHTML ='visibility';
        }

    }

    const validateField =(field,regex,index)=>{

        if(formData[field]){
            /* this if will run if field is not an empty */
            if(!regex.test(formData[field])) {
                setErrorMessages((prevErrors)=>{
                    const newErrors = [...prevErrors];
                    newErrors[index] = true;
                    return newErrors;
                });

                setEmptyFields((prevEmpty)=>{
                    const newEmpty = [...prevEmpty];
                    newEmpty[index] =true;
                    return newEmpty;
                });

            } /* this else will run if your regular expression match and field is not empty */
            else{
            setErrorMessages((prevErrors)=>{
                const newErrors = [...prevErrors];
                newErrors[index]=false;
                return newErrors
            })

            setEmptyFields((prevEmpty)=>{
                const newEmpty = [...prevEmpty];
                newEmpty[index] = true;
                return newEmpty;
            })
            
        }
        }/* this else will run when field is empty */
         else{
         setEmptyFields((prevEmpty)=>{
            const newEmpty = [...prevEmpty];
            newEmpty[index] = false;
            return newEmpty;
        })
        
    }    

};
    const handleSubmit =async(event)=>{
        event.preventDefault();
      
        validateField('name',nameRegex,0);
        validateField('number',numberRegex,1);
        validateField('email',emailRegex,2);
        validateField('password',passwordRegex,3);
        
        // console.log(emptyFields);
        // console.log(errorMessages);
        
 if(emptyFields.every((field)=>field) && errorMessages.every((error)=>!error)){

     console.log(formData);
    console.log("Form submitted successfully!");
try {
    const response =await fetch("http://localhost:9000/api/auth/signup",{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
    })
    if(response.ok){
        console.log("Registration successful");
    }
    
} catch (error) {
    console.log(error.message);
}

    setFormData({
        name:'',
        number:'',
        email:'',
        password:''
    });
    setErrorMessages([false,false,false,false]);
    setEmptyFields([false,false,false,false]);
    

 }

    };


  return (
    <>
    <div className='signup'>
        <h1 className="heading-1">Registration Form</h1>
   
   <form className="form" onSubmit={handleSubmit}>
   <div className="fn-container gutter-small">
      <label  className="d-flex direction-column gap">
       Name:
      <input
      
      type ="text" 
      data-key="name" 
      className={`input ${errorMessages[0]?'error':''}`} 
      placeholder="Enter your name here"
      onChange ={(event)=>handleInputChange('name',event.target.value)}
      value={formData.name}
      />
      </label>
      <span 
      data-error="fn-err" 
      className="error-message">
        {errorMessages[0] && '*Name must contain only alphabets'}
      </span>
    
      <span className="empty-field">
          {emptyFields[0]?'': '*Please fill this field'}
      </span>

   </div>
   
   <div className="ln-container gutter-small">
      <label className="d-flex direction-column gap">
          Number:
          <input 
          type ="number"
          data-key="number" 
          className={`input ${errorMessages[1]?'error':''}`} 
          placeholder="mobile number"
          onChange={(event)=>handleInputChange('number',event.target.value)}
          value ={formData.number}
          />
      </label>
      <span data-error="ln-err" className="error-message">
          {errorMessages[1] && '*Must contain 10 digits'}
      </span>
      <span className="empty-field">
      {emptyFields[1] ? '':'*Please fill this field'}
      </span>
   </div>
  
   <div className="email-container gutter-small"> 
      <label  className="d-flex direction-column gap">
          Email Id:
          <input 
          data-key ="email" 
          type="text" 
          className={`input ${errorMessages[2]?'error':''}`}
          placeholder="name@example.com" 
          onChange={(event)=>handleInputChange('email',event.target.value)}
          value={formData.email}
          />
      </label>
      <span data-error="email" className ="error-message">
        {errorMessages[2] && '*Invalid email id'}
        </span>
      <span className="empty-field">
       {emptyFields[2]? '':'*Please fill this field'}</span>
  </div>
          
   <div className="pwd-container gutter-small relative">
      <label className="d-flex direction-column gap">
          Password:
          <input
           type="password"
           data-key="password"
           className={`input ${errorMessages[3]?'error':''}`} 
           placeholder="***********" 
           onChange={(event)=>handleInputChange('password',event.target.value)}
           value={formData.password}
          />
          <button className="btn absolute right-0" onClick={handlePasswordVisibility}>
              <span className="material-icons-outlined" id="eyebtn">
                  visibility_off
              </span>
          </button>
      </label>
      <ul data-error="pwd-err" className="error-message ul">
         { errorMessages[3] && 
             (
             <li className="list">
              Password must contain atleast 8 characters
             </li>
             ) 
         } 
          
           { errorMessages[3] && (

               <li className="list">
              Password must contain atleast one lower case letter
          </li>
              )}

              {errorMessages[3] && (

                  <li className="list">
              Password must contain atleast one upper case letter
          </li>
              )}

              {errorMessages[3] && (

                  <li className="list">Password must contain atleast one digit</li>
              )}

              {errorMessages[3] && (

                  <li className="list">
              Password must contain atleast one special character(!@#$%^&*)
          </li>
              )}
      </ul>
      <span className="empty-field">
      {emptyFields[3] ? '':'*Please fill this field'}
        </span>
  </div>
   <button 
   type ='submit'
   className="button btn-primary cursor">
    Create Account
    </button>
   <Link
    to="/"
    >
        <button className='button btn-secondary cursor'>
            Go to Login page</button>
   </Link>
  </form>
    </div>
 </>
  )
}

export default SignUpForm