import "./App.css";
import React, { useState } from "react";
import Search from "./components/search/Search";
import Table from "./components/table/Table";

function App() {
  const [results, setResults] = useState([]);
  const [data, setData] = useState([]);

  const columns = [
    { Header: "Город", accessor: "firstPart" },
    { Header: "Округ", accessor: "penultimatePart" },
    { Header: "Страна", accessor: "lastPart" },
  ];
  console.log("App перерендерился");

  // Почему setResults объявлен именно в этом компоненте ??????
  // Какие поути оптимизации можно применить в данном компоненте учитывая что таблица может быть очень большой ?????????

  return (
    <div className="App">
      <Search
        results={results}
        setResults={setResults}
        setData={setData}
        data={data}
      />
      <Table columns={columns} data={data} setData={setData} />
    </div>
  );
}

export default App;
