import { useRef } from 'react';

function Shopping(){
    function addItem(){

    }

    function handleChange(){

    }


    return(
        <div className="w-[78vw] h-[78vh] mx-auto mt-10 rounded-lg bg-orange-500 overflow-auto">
            <h1 className="text-3xl text-white py-2 bg-orange-400">Shopping List</h1>
            <div className="flex flex-row gap-3 w-full items-center justify-center mt-2">
                <input type="text" placeholder="add a new item" className="px-4 py-2 rounded-lg" onChange={handleChange}/>
                <button onClick={()=>addItem} className="text-xl bg-orange-400 py-1 px-2 text-center rounded-full">+</button>
            </div>
            <div className='w-4/5 h-full bg-orange-300 mx-auto my-2 rounded-md'>

            </div>
        </div>
    )
}

export default Shopping;