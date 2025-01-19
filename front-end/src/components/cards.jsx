import CardElement from './cardElement';
import { useEffect } from 'react';

function Cards({recipes, setRecipes}){
    async function getRecipes(){
        //check if recipes are on local storage
        //if not on local, fetch from api and store in local
        if(!localStorage.getItem("recipes")){
            try{
                const response = await fetch("http://localhost:3000/recipes");
                const data = await response.json();
                console.log(data);
                setRecipes(data);
                localStorage.setItem("recipes", JSON.stringify(data));
            }
            catch(error){
                alert(error)
                console.error(error)
            }
        }
        //if recipes are on local, just use local instead of api
        else {
            try{
                const response = (localStorage.getItem("recipes"));
                const data = JSON.parse(response);
                setRecipes(data);
                console.log(data);
                console.log('success');
            }
            catch(error){
                console.error(error);
            }
        }
    }

    useEffect(()=>{getRecipes();}, []);

    function recipeLength(){
        if (!localStorage.getItem("recipes")){
            return ""
        }
        else{
            let filler = localStorage.getItem("recipes");
            filler = JSON.parse(filler);
            return filler.length;
        }   
    }
    
    return(
        <div className='flex flex-col gap-3 relative'>
            {recipes && <h1 className='font-medium mt-7 mb-4'>recipify currently has {recipeLength()} recipies</h1>}
            <div className='grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-20 w-11/12 mx-auto max-w-screen-xl'>
                {recipes && recipes.map((recipe)=>{return <CardElement 
                                                            key={recipe.recipe_id} 
                                                            imgSrc={recipe.imageSrc} 
                                                            recipeName={recipe.recipeName} 
                                                            altText={recipe.altText} 
                                                            recipeDescription={recipe.summary}
                                                            instructions={recipe.instructions}
                                                            />
            })}
            </div>
            <div className='flex flex-col gap-2 justify-center items-center'>
                <hr className='border-black w-[98.5vw]'></hr>
                <h1 className='font-medium mb-4'>recipfy currently has no more recipes to show. Please check again later.</h1>
            </div>
        </div>
        

    )
}

export default Cards;