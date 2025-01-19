import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login(){
    function loginHandler (event){
        event.preventDefault()
        console.log("hello", password, username); 
    }
    const [password,setPassword] = useState('');
    const [username,setUsername] = useState('');
    return(
        <form onSubmit={loginHandler} className="flex flex-col gap-3 px-3 py-4 border border-black rounded-md mt-5 bg-white items-center">
            <h1 className='text-lg font-medium'>Log In</h1>
            <div className="flex flex-col gap-2 justify-center items-start mx-3 w-3/4">
                <label htmlFor='username'>Email</label>
                <input
                    onChange={(event)=>{setUsername(event.target.value)}}
                    id='username' type='text' placeholder="enter email"
                    className='w-full border border-slate-200 rounded-lg px-3 py-1'
                    value = {username}
                />
            </div>
            <div className="flex flex-col gap-2 justify-center items-start w-3/4">
                <label htmlFor='password'>Password</label>
                <input 
                    onChange={(event)=>setPassword(event.target.value)}
                    value = {password}
                    className='w-full border border-slate-200 rounded-lg px-3 py-1'
                    id='password'type ='password' placeholder='enter password'
                />
            </div>
            <div className='flex flex-row justify-evenly gap-2 items-center rounded-lg mx-3 mt-4'> 
                <button className="px-4 py-2 rounded-lg w-max hover:bg-orange-300 bg-orange-400 text-white"type="submit">Log In</button>
                <Link to='/signup'
                    className='text underline hover:text-orange-400 text-sm'>
                    Don&apos;t Have an Account? Sign Up
                </Link>   
            </div> 
        </form>
    )     
}

export default Login;