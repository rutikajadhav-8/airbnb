import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext.jsx";

export default function LoginPage(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const {setUser} = useContext(UserContext);

    async function handleLoginUser(e){
        e.preventDefault();
        try{
            const {data} = await axios.post('/login', {email, password});
            setUser(data);
            alert('Login Successful.');
            setRedirect(true);
        } catch(e){
            alert('Login Failed.');
        }
    
    }

    if(redirect){
        return <Navigate to={'/'} />
    }

    return(
        <div className="nt-4 grow flex items-center justify-around">
            <div className="mb-32">
            <h1 className=" text-4xl text-center mb-4">Login</h1>
             <form className="max-w-md mx-auto" onSubmit={handleLoginUser}>

               <input 
               className=" w-full border my-2 py-2 px-3 rounded-2xl" 
               type="email" 
               placeholder="your@gmail.com"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               />

               <input 
               className=" w-full border my-2 py-2 px-3 rounded-2xl" 
               type="password"
               placeholder="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)} 
               />

               <button className="bg-rose-500 p-2 w-full text-white rounded-2xl">Login</button>

               <div className="text-center py-2 text-gray-500">
                Don't have an account yet?
                <Link className="underline text-black" to={'/register'}>Register here</Link>
               </div>

            </form>
            </div> 
        </div>
    );
}