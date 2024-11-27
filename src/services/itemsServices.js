import dataList from '../data/dataList.json';

export function fetchItems(page, size) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (page && size) {
                const calculatedTotalPages = Math.ceil(dataList.length/size);
                const newPaginatedItems = []
                for (let index = 1; index < calculatedTotalPages; index++) {
                    const calculatedSliceLenght = (index*size)-size;
                    const pageSliced = dataList.slice(calculatedSliceLenght, index*size);
                    newPaginatedItems.push(pageSliced);
                }
                const data = {
                    paginatedItems:newPaginatedItems[page-1],
                    actuatualPage:page,
                    totalPages:calculatedTotalPages,
                    sizePerPage:size
                } 
                resolve(data);
            } else {
                reject({
                    response: {
                        data: {
                            message: 'Error al realizar la peticion, se necesitan tanto pagina actual como tamaño por pagina'
                        }
                    }
                });
            }
        }, 1000); // Simula una demora en la respuesta
    });
}