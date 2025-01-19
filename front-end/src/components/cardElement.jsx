import { useState } from "react";

function CardElement({imgSrc, recipeName, altText, recipeDescription, instructions}){
    
    const [favState,setFavState] = useState(false);
    const [readMoreModalState, setModalState] = useState(false);

    function handleFavState(){
        setFavState(!favState);
    }

    function favourites(){
        if (favState){
            return ["stary.svg","Remove from Favourites"]
        }
        else{
            return ["starn.svg","Add to Favourites"]
        }
    }

    return(
        <div className="overflow-auto">
            {/* Read More Modal */}
            {readMoreModalState &&
                <div>
                    <div 
                    onClick={()=>setModalState(!readMoreModalState)}
                    className="w-screen h-screen bg-[rgba(0,0,0,0.5)] fixed top-0 left-0">
                    </div>
                    <div
                    className="fixed w-1/3 left-1/3 right-1/3 bg-white max-h-[90vh] top-5 rounded-lg overflow-auto">
                        <div className="relative py-2 flex flex-col justify-around">
                            <h1 className="px-5 font-bold">{recipeName}</h1>
                            <img className="rounded-b-lg" src={imgSrc}></img>
                            <hr className="border border-orange-400 mt-2"></hr>
                            <h1 className="px-5 text-start mt-4 font-medium">Instructions:</h1>
                            <p className="text-sm px-5 text-start break-words overflow-auto whitespace-normal text-ellipsis">{instructions}</p>
                            <button className="absolute right-2 top-2 hover:bg-slate-100"
                                onClick={()=>setModalState(!readMoreModalState)}>X</button>
                            <p className="read more at"></p>
                        </div>
                    </div>  
                </div>       
            }
            {/* Actual Card Element */}
            <div className="flex flex-col w-full h-full border border-black rounded-lg bg-white items-center">
                <div className="w-full h-full flex flex-col justify-between pb-1">
                    <div className="w-full h-2/3 mb-1">
                        <div className="w-full h-1/2">
                            <img
                                draggable="false"
                                alt={altText}
                                src={imgSrc}
                                className="w-full h-full rounded-t-lg size-fit object-cover"
                            />
                        </div>
                        <div className="mt-1 flex flex-row w-full justify-between items-center">
                            <h1 className="ml-1 w-2/3 inline text-start font-semibold px-2 text-lg">
                                {recipeName}
                            </h1>
                            <button
                                title={favourites()[1]} 
                                className="w-1/3 h-max mr-1 flex flex-row justify-end"
                                onClick={handleFavState}
                            >
                                <img 
                                    draggable="false"
                                    className="w-9 h-9"
                                    src={(favourites())[0]}
                                />
                            </button>
                        </div>   
                        <p className="p-3 text-sm text-start overflow-auto max-h-1/3 break-words w-full">
                            {recipeDescription}
                        </p>
                    </div>
                    <hr></hr>
                    <div className="flex flex-row justify-around items-center px-3 gap-2 h-1/3">
                        <button
                            title="Add ingredients to Shopping List"
                            className="border-none text-orange-500 bg-slate-100 hover:bg-slate-200 rounded-sm px-4 py-2 h-4/6"
                        >
                            Add ingredients to Shopping List
                        </button>
                        <button
                            onClick={()=>setModalState(!readMoreModalState)}
                            title="Read More"
                            className="border hover:bg-orange-400 hover:border-orange-400 border-orange-500 text-white bg-orange-500 rounded-sm px-4 py-2 h-4/6"
                        >
                            Read More
                        </button>
                    </div>
                </div> 
            </div>  
        </div>
            
    )
}

export default CardElement;