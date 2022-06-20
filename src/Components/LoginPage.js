import React from 'react'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserDetails from './UserDetails';


const intialFormValue = {
    email: "",
    password:""
}
 
export default function LoginPage() {
    const [form, setForm] = useState({ ...intialFormValue })
    const[authenticatedToken,setAuthenticatedToken]=useState("")
    function handleInput(event) {
            setForm({ ...form,  [event.target.name]: event.target.value })
    
    }
   
    const onSubmission = async (event) => {
        event.preventDefault()
        //call Post API
            const response = await fetch("https://reqres.in/api/login",
                {
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(form)
                })
        
        const statusCode= await response.status
        const data = await response.json()
        if (statusCode === 400) {
            alert("Invalid Email or Password")
        }
                
        if(data.token){
            alert("Login Successful")
            window.location.href = "/userpage"
    }
    setAuthenticatedToken(data.token)
    setForm({ ...intialFormValue })
       
    }
    
const token= authenticatedToken
    const RederComponent = () => {
        return (
            <UserDetails authenticatedToken={token} />
        )
    }
    
    
    
    return (
     
     <>
          <Router>
          <Routes>
                 <Route exact path="/" element={
                     <div className="container">
                         <h1>Login</h1>
                         <form className="container-grid" onSubmit={onSubmission}>
                             <input type="text" placeholder="email" name="email" value={form.email} onChange={handleInput} />
                             <input type="Password" placeholder="password" name="password" value={form.password} onChange={handleInput} />
                             <button>Login</button>
                         </form>
                     </div>
                 }/>
                 <Route path="/userpage" element={<RederComponent/>} />
                 </Routes>
         </Router>
         </>            
  )
}
