import {React, useEffect, useState} from "react";
import logo from './logo.svg';
import Pagination from './components/molecules/Pagination';
import Table from './components/molecules/Table';
import dataList from './data/dataList.json';
import {fetchItems} from './services/itemsServices';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState([1]);
  const [res, setRes] = useState({});

  const changeActualPage =  async (page)=>{
    setCurrentPage(page)
    const newRes = await fetchItems(page,4)
    setRes(newRes)
  }

  useEffect(() => {
    changeActualPage(1)
},[]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className='text-3xl font-bold underline'>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Table itemList={dataList} currentPage={currentPage} itemsPerPage={4} tableHeads={Object.keys(dataList[0])}/>
        <Pagination itemList={dataList} itemsPerPage={res.sizePerPage} initialPage={1} showPageCount={false} showControls={true} paginationMode='ellipsis' currentPageButtonClasses=' text-red' changePageFn={changeActualPage} totalPagesPaginated={res.totalPages}/>
      </header>
      <button onClick={()=>{console.log(res);
      }}>test</button>
    </div>
  );
}

export default App;
