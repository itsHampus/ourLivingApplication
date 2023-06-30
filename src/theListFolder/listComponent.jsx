import fakeData from './fakeData.json'
import { useTable } from 'react-table'
import { useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
export function ListComponent() {
  const data = useMemo(() => fakeData, []);
  const columns = useMemo(() => [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'First Name',
      accessor: 'first_name',
    },
    {
      Header: 'Last Name',
      accessor: 'last_name',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Gender',
      accessor: 'gender',
    },
    {
      Header: 'University',
      accessor: 'university',
    },
  ], []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });


  const queryClient = useQueryClient();
  return (
    <div className='listComponentDiv'>
      <button className='logOutBtn' onClick={() => {
        localStorage.removeItem('loggedIn')
        queryClient.invalidateQueries("allUsers");
      }}>
        Log out
      </button>
      <div className="containerForTheGridContainerList">
        <div className="gridContainerList">
          <h2 className="tableH2">List of a bunch of people</h2>
          <div className='tableContainer'>
            <table {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>
                        {column.render('Header')}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}