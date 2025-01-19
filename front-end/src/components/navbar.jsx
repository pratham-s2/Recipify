import { useState } from 'react';
import { Link } from 'react-router-dom';
import Login from './login'
import SignUp from './signup';

function Navbar(){
    const [modalState, setModalState] = useState(false);
    
    return(            
        <nav className=" bg-white flex flex-row items-center w-full text-center h-14 relative my-2">
             
             {/*Login/Signin Page Modal*/}
             {modalState && 
                (<>
                    <div className='fixed w-screen h-screen bg-[rgba(0,0,0,0.5)] top-0 left-0'
                        onClick={()=>setModalState(!modalState)}>
                    </div>
                    <div className='fixed top-14 left-1/3 right-1/3 w-1/3'>
                        <div className='relative'>
                            <Login/>
                            <button className='absolute right-4 top-3 z-40 text-2xl' onClick={()=>setModalState(!modalState)}>x</button>
                        </div>
                    </div>
                </>)}
           
            {/*Navbar Links*/}
            <Link to='/' className='w-14 ml-14'>
                    <img className="h-9 w-9 hover:h-10 hover:w-10"src="logo.svg"/>
            </Link>
            <div className="flex flex-row items-center gap-16 mx-auto">
                <Link className="w-32 h-max text-center hover:font-medium" to='/shopping-list'>
                    Shopping List
                </Link>
                <Link className="w-32 h-max" to='/favorites'>
                    <button className="h-max w-max text-center hover:font-medium">
                        Favourites
                    </button>
                </Link>
                <button className="w-32 h-max text-center hover:font-medium" onClick={()=>setModalState(!modalState)}>
                    Login
                </button>
                <Link className="w-32 h-max text-center hover:font-medium" to='/contact'>
                    Contact Us
                </Link>
            </div>
            <div className="mr-24"></div>
        </nav>
    )
}

export default Navbar