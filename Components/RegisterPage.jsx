import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RegisterPage(){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function registerUser(e){
      e.preventDefault();
      try{
        await axios.post('/register', {
          name,
          email,
          password
        });
        alert('Registration Successful.')
      } catch(e){
        alert('Registration Failed. Please try again later')
      }
      
    }

    return(
        <div className="nt-4 grow flex items-center justify-around">
            <div className="mb-32">
            <h1 className="text-4xl text-center mb-4">Register</h1>
            <form className="max-w-md mx-auto" onSubmit={registerUser}>

                <input 
                className="w-full border my-2 py-2 px-3 rounded-2xl"
                 type="text" 
                 placeholder="Enter your name"
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                  />

                <input 
                className="w-full border my-2 py-2 px-3 rounded-2xl" 
                type="email" 
                placeholder="your@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />

                <input 
                className="w-full border my-2 py-2 px-3 rounded-2xl" 
                type="password" 
                placeholder="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />

                <button className="bg-rose-500 p-2 w-full text-white rounded-2xl">Register</button>

                <div className=" text-center py-2 text-gray-500">
                    Already a member ?
                    <Link className="underline text-black" to={'/login'}>Login</Link>
                </div>

            </form>
            </div>
        </div>
    );
}