function Pagination({numberPages, currentPage, setPage}){
    
    const pageNumbers = [];
    for (let i = 1; i<=numberPages; i++){
        pageNumbers.push(i);
    }
    
    return(
        <div className='w-[80vw] mx-auto text-center'>
            {pageNumbers.map((pageNumber)=>{
                return <button 
                            onClick={()=>{
                                document.documentElement.scrollTop = 75;
                                setPage(pageNumber);
                            }} 
                            className="bg-orange-500 hover:bg-orange-400 text-white w-10 h-10 m-1 text-center" 
                            key={pageNumber}>
                            {pageNumber}
                        </button>
            })}
        </div>
    ) 


}


export default Pagination;