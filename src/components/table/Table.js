import React from 'react';
import { useTable, useSortBy, useFilters, useGlobalFilter, useRowState } from 'react-table';

export default function Table({ columns, data, setData }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    useRowState
  );

  const { globalFilter } = state;

  const handleInpun = (e) => {
    setGlobalFilter(e.target.value);
  }

  const handleDelete = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  return (
    <>
      <div className="table__input">
        <input
          className="search__input"
          type='text'
          value={globalFilter || ''}
          onChange={handleInpun}
          placeholder='Поиск...'
        />
      </div>
      <table className="table" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  className="table__th"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </th>
              ))}
              <th className="table__th">Удалить</th>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td
                    className="table__th"
                    {...cell.getCellProps()}>{cell.render('Cell')}
                  </td>
                ))}
                <td className="table__th">
                  <button
                    className="table__button"
                    onClick={() => handleDelete(row.index)}
                  >🗑️</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}