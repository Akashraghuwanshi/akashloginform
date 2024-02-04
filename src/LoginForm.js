import { useState } from 'react'
import {Link} from 'react-router-dom'
import './SignUpModal.css'

function LoginForm() {
  
    const[formData,setFormData]=useState({
        email:'',
        password:'',
    })

   const[errorMessages,setErrorMessages]=useState([false,false]) ;

   const[emptyFields,setEmptyFields]=useState([false,false]);

   const emailRegex =/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
   const passwordRegex =/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
 
   const handleInputChange =(field,value)=>{
    
    setFormData((prevData)=>({...prevData,[field]:value}));
}
const handlePasswordVisiblity =(event)=>{
    event.preventDefault();
    const passwordInput =document.querySelector('[data-key="password"]');
    const eyebtn =document.getElementById('eyebtn');
    const type = passwordInput.getAttribute('type');
    if(type === 'text'){
        passwordInput.setAttribute('type','password');
        eyebtn.innerHTML ='visibility_off';
    }else{
    passwordInput.setAttribute('type','text');
    eyebtn.innerHTML='visibility';
   }

}

const validateField =(field,regex,index)=>{
    if(formData[field])
     /* if field is not empty */
    {
        if(!regex.test(formData[field]))
        /* if input field is not matching the regular expression */
        {
            setErrorMessages((prevData)=>{
                const newError = [...prevData];
                newError[index] = true;
                return newError;
            });
            setEmptyFields((prevData)=>{
                const newEmpty = [...prevData];
                newEmpty[index]=true;
                return newEmpty
            });
        }
        /* if input field is matching the regular expression */
        else{
            setErrorMessages((prevData)=>{
                const newError = [...prevData];
                newError[index] = false;
                return newError;
            });
            setEmptyFields((prevData)=>{
                const newEmpty = [...prevData];
                newEmpty[index]=true;
                return newEmpty
            });
        }

    }
    /* if field is empty */
    else{

        setEmptyFields((prevData)=>{
            const newEmpty = [...prevData];
            newEmpty[index]=false;
            return newEmpty
        })



    }

}

const handleSubmit=async(event)=>{
    event.preventDefault();

    validateField('email',emailRegex,0)
    validateField('password',passwordRegex,1)

    // console.log(emptyFields);
        // console.log(errorMessages);

        if(emptyFields.every((field)=>field) && errorMessages.every((error)=>!error))
        {
            console.log(formData);
            console.log("Login successfully!");
            try {
                 const response = await fetch("http://localhost:9000/api/auth/login",{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(formData)
                 })

                 if(response.ok){
                    const data = await response.json()
                    console.log(data)
                }
                else{
                    const errorMsg = await response.json()
                     console.log(errorMsg.message);

                 }
            } catch (error) {
                console.log(error.message)
            }

           setFormData({
            email:'',
            password:''
            });
          setErrorMessages([false,false]);
          setEmptyFields([false,false]);
        }
};

return (
    <div>
  <div className='login'>
    <h1 className="heading-1">Login-Form</h1>
    <form  className="form"  onSubmit={handleSubmit}>
    <div className="fn-container gutter-small">
        <label  className="d-flex direction-column gap">
            Email-Id:
            <input 
            data-key='email'
            type="text"
            className={`input ${errorMessages[0]?'error':''}`}
            placeholder='name@example.com'
            onChange={(event)=>handleInputChange('email',event.target.value)}
             value={formData.email}
            />
        </label>
        <span data-error="email" className= 'error-message'>
              {errorMessages[0]  && 'Invalid-Email Id'} 
         </span>
         <span className='empty-field'>
            {emptyFields[0]? '': 'Please fill this field'}
         </span>
    </div>
    <div className="pwd-container gutter-small relative">
        <label htmlFor="" className="d-flex direction-column gap">
            Password:
            <input 
            type="password"
            data-key='password'
            className={`input ${errorMessages[1]?'error':''}`}
            placeholder='************'
            onChange ={(event)=>handleInputChange('password',event.target.value)}
            value={formData.password}
             />
             <button className='btn absolute right-0' onClick={handlePasswordVisiblity}>
                <span className='material-icons-outlined' id='eyebtn'>
                    visibility_off
                </span>
             </button>
        </label>
        
        <ul data-error="pwd-err" className='error-message ul'>
            
                { errorMessages[1]  && 
                  (
                   <li className='list'>
                    Password must contain atleast 8 characters
                    </li>
                    )
                }

               { errorMessages[1] &&
               (
               <li className='list'>
                Password must contain atleast one lower case letter
            </li>
                )
            }
             {errorMessages[1] &&
             (
             <li className='list'>
                Password must contain atleast one upper case letter
            </li>
                )
            }
            {errorMessages[1] &&(
               <li className='list'>
                Password must contain atleast one digit
            </li>
                )} 
              {errorMessages[1] && (

                  <li className='list'>
                Password must contain atleast one special character([!@#$%^&*])
            </li>
                )}  
        </ul>
        <span className='empty-field'>
           {emptyFields[1]?'':'Please fill this field'}
        </span>
    </div>
    <button
     type='submit'
     className='button btn-success cursor'>
        Login
    </button>
    <Link to="/register">
    <button 
    className='button btn-secondary cursor'
    >Go to Signup</button>
    </Link>
    </form>
    

  </div>
    </div>
  )
}

export default LoginForm