import {React, useEffect, useState} from "react";

const Pagination =({itemList, totalPagesPaginated, itemsPerPage,  initialPage=1, paginationMode, showPageCount, showTotalPages, showcurrentPage, showControls, buttonClasses='', currentPageButtonClasses='',changePageFn})=>{

    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    let standardPaginationButtonsStyles = ''.concat(
        'bg-[white]/50 py-1 px-2.5 rounded-lg text-lg '
        ,buttonClasses
    )

    let currentPageButtonStyle = ''.concat(
        'border-solid border-2 border-sky-400 !bg-sky-400 '
        ,currentPageButtonClasses
    )

    let controlsClasses = ''.concat(
        'pointer-events-none bg-[white]/10 '
    )

    let paginationWrapperClasses = ''.concat(
        'space-x-2 sm:space-x-4 '
        ,paginationMode === 'all'?' space-y-2 sm:space-y-4 ':''
    )

    useEffect(() => {
        if (totalPagesPaginated) {
            setTotalPages(totalPagesPaginated)
        }
        else{
            const calculatedTotalPages = Math.ceil(itemList.length/itemsPerPage);
            setTotalPages(calculatedTotalPages)
        }
    },[itemList,itemsPerPage,totalPagesPaginated]);

    useEffect(() => {
        if (initialPage > 0 && initialPage <= Math.ceil(itemList.length/itemsPerPage)) {;
            setCurrentPage(initialPage)
            changePageFn(initialPage)
        }
        else{
            console.log('The initial page is out of scope');
            setCurrentPage(1)
            changePageFn(1)
        }
    },[initialPage]);

    const prevAndNextPageChange =(operation)=>{
        if (operation === 'next') {
            if ((currentPage+1)<=totalPages) {
                setCurrentPage(currentPage+1)
                changePageFn(currentPage+1)
            }
        }
        else if(operation === 'prev'){
            if ((currentPage-1)>0) {
                setCurrentPage(currentPage-1)
                changePageFn(currentPage-1)
            }
        }
    }

    const pageIterationType =(array, mode)=>{
        for (var i = 0; i < totalPages; i++) {
            let pagesClassname = ''.concat(standardPaginationButtonsStyles, currentPage-1=== i?currentPageButtonStyle:'')
            let currentPageNumber = i+1;
            if (mode === 'all') {
                array.push(<button key={i} className={pagesClassname} onClick={()=>{setCurrentPage(currentPageNumber);changePageFn(currentPageNumber)}}>{i+1}</button>);
            }
            else if (mode === 'ellipsis'){
                if (currentPage-1 === i || currentPage+1===i+1  || currentPage-1 === i+1) {
                    if (currentPageNumber !== 1 && currentPageNumber !== totalPages) {
                        array.push(<button key={i} className={pagesClassname} onClick={()=>{setCurrentPage(currentPageNumber);changePageFn(currentPageNumber)}}>{i+1}</button>);
                    }      
                } 
            }    
        }
    }

    const pagesRender = ()=>{
        var pages = [];
        switch (paginationMode) {
            case "all":
                pageIterationType(pages, "all")
                break;
            case "ellipsis":
                pageIterationType(pages, "ellipsis")
                pages.unshift(<button key={'first-page'} className={standardPaginationButtonsStyles+ (currentPage=== 1?currentPageButtonStyle:'')} onClick={()=>{setCurrentPage(1);changePageFn(1)}}>{1}</button>,<button key={'prev-ellipsis'} className={standardPaginationButtonsStyles+(currentPage <= 3?' hidden ':' inline pointer-events-none ')}>...</button>);
                pages.push(<button key={'next-ellipsis'} className={standardPaginationButtonsStyles+(currentPage >= totalPages-2?' hidden ':' inline pointer-events-none ')}>...</button>,<button key={'final-page'} className={standardPaginationButtonsStyles+ (currentPage=== totalPages?currentPageButtonStyle:'')} onClick={()=>{setCurrentPage(totalPages);changePageFn(totalPages)}}>{totalPages}</button>);
                break;
            default:
                pageIterationType(pages, "all")
                break;
        }

        return pages;
    }
    const paginationInfoRender =()=>{
        return(
            <div className="text-base">
                {showcurrentPage||showTotalPages?<p>{showcurrentPage?'Current page: '+currentPage:'' }{showTotalPages&&showcurrentPage?' / ':''}{showTotalPages?'Total pages: '+totalPages:'' }</p>:''}
                {showPageCount?<p>Page {currentPage} of {totalPages}</p>:''}
            </div>
        )
    }

    return(
        <div className="space-y-2"> 
            <div className={paginationWrapperClasses}>
                {showControls?<button key="prev-page-button" className={standardPaginationButtonsStyles+(currentPage===1?controlsClasses:'')} onClick={()=>prevAndNextPageChange('prev')}>{'<'}</button>:''}
                {pagesRender()}
                {showControls?<button key="next-page-button" className={standardPaginationButtonsStyles+(currentPage===totalPages?controlsClasses:'')} onClick={()=>{prevAndNextPageChange('next')}}>{'>'}</button>:''}
            </div>
            {paginationInfoRender()}
        </div>
    )
}

export default Pagination;