import Cards from '../components/cards';
import { useState, useRef } from 'react';

function Landing(){
    const [recipes, setRecipes] = useState([]);
    const searchQuery = useRef("");

        function handleChange (e){
            searchQuery.current = e.target.value;
            if (searchQuery.current ==""){
                let data = localStorage.getItem("recipes");
                data = JSON.parse(data);
                setRecipes(data);
            }
        }

        async function handleSearch(){
            try {
                if(searchQuery.current==""){
                    throw new Error("Please enter something into the search field");
                }
                else{
                    const response = await fetch(`http://localhost:3000/search?searchQuery=${encodeURIComponent(searchQuery.current)}`);
                    if (!response.ok){
                        throw new Error ("Error: Coudn't Find Recipes");
                    }
                    const data = await response.json();
                    setRecipes(data);
                }  
            }
            catch(error){
                alert(error);
                console.error(error);
            }}
    
        return(   
        <div className="text-center mx-auto max-w-screen">
            <div className="flex flex-col items-center justify-center bg-recipify-bg bg-cover max-w-[100vw] h-[60vh]">
                <h1 className="font-light font-rollit text-black size-max text-8xl mb-4">Recipify</h1>
                <div className='flex flex-row w-full justify-center items-center mt-1'>
                    <div className='relative w-8/12'>
                        <input
                            onChange={handleChange}
                            type="text" placeholder="Search for a recipe..." 
                            className="border border-black rounded-full px-8 py-5 w-full mt-2">   
                        </input>
                        <button onClick={handleSearch}> 
                            <img src="search.svg" className='w-8 h-8 absolute right-5 top-6'/>
                        </button>  
                    </div>
                </div>
            </div>
            <div className='bg-slate-50'>
                <Cards recipes={recipes} setRecipes={setRecipes}/>
            </div> 
        </div>
    )
}

export default Landing;