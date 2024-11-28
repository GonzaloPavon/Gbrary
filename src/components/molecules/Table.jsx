import {React, useEffect, useState} from "react";

const Table =({itemList, itemsPerPage, currentPage, tableHeads})=>{

    const [paginatedItems, setPaginatedItems] = useState([]);
    const [currentItems, setCurrentItems] = useState([]);

    //** setting new currentItems**/
    useEffect(() => {
        setCurrentItems(paginatedItems[currentPage])      
    },[currentPage]);

    /** get the all the items and paginated them**/
    useEffect(() => {
        const calculatedTotalPages = Math.ceil(itemList.length/itemsPerPage);
        const newPaginatedItems = []
        for (let index = 1; index < calculatedTotalPages; index++) {
            const calculatedSliceLenght = (index*itemsPerPage)-itemsPerPage;
            const pageSliced = itemList.slice(calculatedSliceLenght, index*itemsPerPage);
            newPaginatedItems.push(pageSliced);
        }
        setPaginatedItems(newPaginatedItems)
    },[itemList,itemsPerPage]);

    return(
        <div>
            Tabla
            <table>
                <thead>
                    <tr className="">
                        {
                            tableHeads.map((tableHeadItem)=>{
                                return <th>{tableHeadItem}</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {currentItems !==undefined && currentItems !==null?currentItems.map((item)=>{
                        console.log(item);
                        const actualObjectKeys = Object.keys(item)
                        return  <tr>
                                    {
                                        actualObjectKeys.map((key)=>{
                                            return <td>{item[key]}</td>
                                        })
                                    }
                                </tr>
                    }):''
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table;