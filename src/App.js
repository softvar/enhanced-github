import React from 'react'
import styled from 'styled-components'
import { useTable, useBlockLayout, useRowSelect } from 'react-table'
const { createClient } = require('graphql-ws');

const client = createClient({
  url: 'ws://localhost:3000/graphql',
  //webSocketImpl: WebSocket
});

var votes = [];

var contributor
var issue_id
var side

// subscription
(async () => {
  const onNext = (data) => {
    var data_str = data.data.newVotes;
    var data_str_list = data_str.split(': ')
    var issue_id_dirty = data_str.split(': ')[0]
    var vote_code = data_str_list[1].split('%')
    contributor = vote_code[0]
    issue_id = issue_id_dirty.replace("{", '')
    var side_dirty = vote_code[1]
    side = side_dirty.replace('}', '')
    votes.push(issue_id)
      /* handle incoming values */
      //console.log(data);
    };

  let unsubscribe = () => {
    /* complete the subscription */
  };

  await new Promise((resolve, reject) => {
    unsubscribe = client.subscribe(
      {
        query: 'subscription { newVotes }',
      },
      {
        next: onNext,
        error: reject,
        complete: resolve,
      },
    );
  });

})();

const Styles = styled.div`
  padding: 1rem;

  .table {
    display: inline-block;
    border-spacing: 0;
    border: 1px solid black;

    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
    }

    .th,
    .td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

let sourceGridData = []
const updateRateMS = 1000

function Table({ columns }) {
  // Use the state and functions returned from useTable to build your UI

  const [data, setData] = React.useState([])
  const timerRunning = React.useRef()

  if (!timerRunning.current) {
    timerRunning.current = true
    setInterval(() => {
      sourceGridData.push(makeRow(sourceGridData.length))
      let newData = [...sourceGridData]

      setData(newData)
    }, updateRateMS)
  }

  const defaultColumn = React.useMemo(
    () => ({
      width: 75,
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    toggleAllRowsSelected,
    prepareRow,
    state,
  } = useTable(
    {
      autoResetSelectedRows: false,
      columns,
      data,
      defaultColumn,
    },
    useBlockLayout,
    useRowSelect
  )

  // Render the UI for your table
  return (
    <>
      <div {...getTableProps()} className="table">
        <div className="thead">
          {headerGroups.map(headerGroup => (
            <div {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map(column => (
                <div {...column.getHeaderProps()} className="th">
                  {column.render('Header')}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div {...getTableBodyProps()}>
          {rows.slice(0, undefined).map(row => {
            prepareRow(row)
            return (
              <div
                {...row.getRowProps({
                  style: {
                    backgroundColor: row.isSelected ? 'green' : '',
                  },
                  onClick: e => {
                    toggleAllRowsSelected(false)
                    row.toggleRowSelected()
                  },
                })}
                className="tr"
              >
                {row.cells.map(cell => {
                  return (
                    <div {...cell.getCellProps()} className="td">
                      {cell.render('Cell')}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
      <pre>
        <code>{JSON.stringify(state, null, 2)}</code>
      </pre>
    </>
  )
}

function App() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Pull',
        accessor: 'pull',
      },
      {
        Header: 'side',
        accessor: 'side',
      },
      {
        Header: 'user',
        accessor: 'user',
      },
      {
        Header: 'msg',
        accessor: 'msg',
      },
      {
        Header: 'def_1',
        accessor: 'def_1',
      },
      {
        Header: 'def_2',
        accessor: 'def_2',
      },
    ],
    []
  )

  return (
    <Styles>
      <Table columns={columns} />
    </Styles>
  )
}

function makeRow(id) {
    return {
      Id: id,
      pull: issue_id,
      side: side,
      user: contributor,
      msg: 'tbd',
      def_1: 'tbd',
      def_2: 'tbd',
  }
}
export default App