import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";

export default function Search({ results, setResults, data, setData }) {
  const [query, setQuery] = useState("");

  // какие негативные последствия есть у использования useEffect в данной ситуации ?????????????????????

  // useEffect(() => {
  //   console.log("сработал useEffect");
  //   const search = async () => {
  //     if (query.length >= 3) {
  //       try {
  //         const response = await axios.get(
  //           `${API_URL}?format=json&q=${query}&limit=5`
  //         );
  //         setResults(response.data);
  //       } catch (error) {
  //         console.error(error);
  //         setResults([]);
  //       }
  //     } else {
  //       setResults([]);
  //     }
  //   };

  //   search();
  // }, [query, setResults]);

  const handleInpun = async (e) => {
    setQuery(e.target.value);

    if (e.target.value.length >= 3) {
      try {
        const response = await axios.get(
          `${API_URL}?format=json&q=${query}&limit=5`
        );
        setResults(response.data);
      } catch (error) {
        console.error(error);
        setResults([]);
      }
    }
  };

  const handleAdd = (result) => {
    const parts = result.display_name.split(", ");

    const firstPart = parts[0];
    const penultimatePart = parts[parts.length - 2];
    const lastPart = parts[parts.length - 1];

    const newData = [...data, { firstPart, penultimatePart, lastPart }];
    setData(newData);
    setResults([]);
    setQuery("");
  };

  return (
    <div className="search">
      <h1 className="search__title">Поиск городов</h1>
      <input
        className="search__input"
        type="text"
        placeholder="Введите название города"
        value={query}
        onChange={handleInpun}
      />
      <ul className="search__ul">
        {results.map((result) => (
          <li className="search__li" key={result.place_id}>
            {result.display_name}
            <button
              className="search__button"
              type="button"
              onClick={() => handleAdd(result)}
            >
              Выбрать
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
