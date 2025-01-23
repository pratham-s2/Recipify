import CardElement from './cardElement';
import { useEffect, useState } from 'react';
import Pagination from './pagination';

function Cards({recipes, setRecipes}){

    const [currentPage, setPage] = useState(1);
    const postsPerPage = 18;
    const firstPost = ((currentPage -1) * postsPerPage);
    const lastPost = currentPage * postsPerPage;
    const [currentRecipes, setCurrentRecipes] = useState([]);

    async function getRecipes(){
        //check if recipes are on local storage
        //if not on local, fetch from api and store in local
        if(!localStorage.getItem("recipes")){
            try{
                const response = await fetch("http://localhost:3000/recipes");
                const data = await response.json();
                console.log(data);
                setRecipes(data);
                const pagedData = data.slice(firstPost, lastPost);
                setCurrentRecipes(pagedData);
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
                console.log(data);
                setRecipes(data);
                const pagedData = data.slice(firstPost, lastPost);
                setCurrentRecipes(pagedData);
            }
            catch(error){
                console.error(error);
            }
        }
    }

    useEffect(()=>{getRecipes();});

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

    const numberPages = Math.ceil(recipeLength()/postsPerPage);
    
    return(
        <div className='flex flex-col gap-3 relative'>
            {recipes && <h1 className='font-medium mt-7 mb-4'>recipify currently has {recipeLength()} recipies</h1>}
            <div className='grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-20 w-11/12 mx-auto max-w-screen-xl'>
                {currentRecipes && currentRecipes.map((recipe)=>{return <CardElement 
                                                            key={recipe.recipe_id} 
                                                            imgSrc={recipe.imageSrc} 
                                                            recipeName={recipe.recipeName} 
                                                            altText={recipe.altText} 
                                                            recipeDescription={recipe.summary}
                                                            instructions={recipe.instructions}
                                                            timeToCook={recipe.timeToCook}
                                                            veganState={recipe.vegan}
                                                            vegeState ={recipe.vegetarian}
                                                            />
            })}
            </div>
            <div className='mt-10'>
                <Pagination numberPages={numberPages} setPage={setPage} currentPage={currentPage}/>
            </div>
            <div className='flex flex-col gap-2 justify-center items-center my-2'>
                <hr className='border-black w-[98.5vw]'></hr>
                <h1>you have reached the end of  page {currentPage}</h1>
            </div>
        </div>
        

    )
}

export default Cards;