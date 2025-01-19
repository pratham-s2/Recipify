import { useState } from 'react';
import { Link } from 'react-router-dom';

function SignUp(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function signupHandler(event){
        event.preventDefault();
        const data = {
            username: username,
            password: password
        };
       
        setUsername('');
        setPassword('');
       
        if (username.trim()==="" || password.trim()===""){
           alert("Please enter valid username/password");
           return;
        };

        try{
            const response = await fetch('http://localhost:3000/signup', 
            {
                method:"POST",
                body: JSON.stringify(data),
                headers:{
                    'content-type': 'application/json'
                }
            })
            
            if(!response.ok){
                
                const errorResponse = await response.json();

                console.log(errorResponse.errorMessage);
            }
            else{
                const successResponse = await response.json();
                console.log(successResponse.successMessage)
            }
        }
        catch(error){
            console.error(error);
        }
    }
    
    return(
        <form onSubmit={signupHandler} className="flex flex-col gap-3 w-1/3 p-3 border border-black rounded-md  mt-5 mx-auto bg-white items-center">
            <h1 className='text-lg font-medium'>Sign Up</h1>
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
                <button className="px-4 py-2 rounded-lg hover:bg-orange-300 bg-orange-400 text-white"type="submit">Sign Up</button>
                <Link to="/login"
                    className='text underline hover:text-orange-400 text-sm'>
                    Already Have an Account? Log In
                </Link>   
            </div> 
        </form>
    )     
}

export default SignUp;