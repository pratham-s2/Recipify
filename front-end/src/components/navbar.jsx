import { Link } from 'react-router-dom';

function Navbar(){

    return(            
        <nav className=" bg-white flex flex-row items-center w-full text-center h-14 relative my-2">
             

            {/*Navbar Links*/}
            <Link to='/' className='w-14 ml-14'>
                    <img className="h-9 w-9 hover:h-10 hover:w-10"src="logo.svg"/>
            </Link>
            <div className="flex flex-row items-center gap-16 mx-auto">
                <Link className="w-32 h-max text-center hover:font-medium" to='/shopping'>
                    Shopping List
                </Link>
                <Link className="w-32 h-max" to='/favorites'>
                    <button className="h-max w-max text-center hover:font-medium">
                        Favourites
                    </button>
                </Link>
                
                    <a href="mailto:prathams1306@gmail.com">Contact Me</a>
                
            </div>
            <div className="mr-24"></div>
        </nav>
    )
}

export default Navbar