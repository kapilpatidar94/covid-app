import React, { useState, useEffect } from 'react';
import './style.css'

import {useHistory} from "react-router-dom"

const CovidList = () => {
const history = useHistory();
  const [countryList, setCountryList] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [jumpPage, setJumpPage] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const maxPage = Math.ceil(countryList.length / itemsPerPage);

  const currentData = () => {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return countryList.slice(begin, end);
  }

  useEffect(() => {
    fetch('https://api.covid19api.com/summary')
      .then(response => response.json())
      .then(data => {
        setCountryList(data.Countries)
        setDataList(currentData())
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

 


  useEffect(() => {
    setDataList(currentData())
    console.log('****', dataList)
  }, [currentPage])

  const previousPage = () => {
    setCurrentPage((currentPage) => Math.min(currentPage - 1, maxPage));
    console.log(currentPage)
  }
  const nextPage = () => {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
    console.log(currentPage)
  }

  const jump = (page) => {
    const pageNumber = Math.max(1, page);
    setCurrentPage((currentPage) => Math.min(pageNumber, maxPage));
  }


  console.log(jumpPage)

  return (
    <div>
      <h1>List</h1>
      <input
        type="text"
        onChange={e => setJumpPage(e.target.value)}
      />
      <button onClick={() => jump()}>Go</button>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {

            dataList.map((item, index) => {
              return <tr key={item.ID}>
                <th>{index + 1}</th>
                <th>{item.Country}</th>
              </tr>
            })
          }
        </tbody>
      </table>
      <div>
        <button onClick={() => previousPage()}> Previous </button>
        <button onClick={() => nextPage()}> Next </button>

      </div>
    </div>

  );
};

export default CovidList;