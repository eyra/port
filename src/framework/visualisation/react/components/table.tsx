interface TableProps {
  id: string
  header: TableHeadProps
  body: TableBodyProps
}

export const TableFactory = (props: TableProps): JSX.Element => <Table {...props} />

export const Table = ({ id, header, body }: TableProps): JSX.Element => {
  return (
    <table className='text-grey1 table-auto'>
      <TableHead {...header} />
      <TableBody {...body} />
    </table>
  )
}

interface TableHeadProps {
  cells: string[]
}

export const TableHead = ({ cells }: TableHeadProps): JSX.Element => {
  return (
    <thead><tr>{cells.map((cell, index) => <TableCell key={`${index}`} header cell={cell} />)}</tr></thead>
  )
}

interface TableBodyProps {
  rows: TableRowProps[]
}

export const TableBody = ({ rows }: TableBodyProps): JSX.Element => {
  return (
    <tbody>
      {rows.map((row, index) => { return (<TableRow key={`${index}`} {...row} />) })}
    </tbody>
  )
}

interface TableRowProps {
  header?: boolean
  cells: string[]
}

export const TableRow = ({ header = false, cells }: TableRowProps): JSX.Element => {
  return (
    <tr>{cells.map((cell, index) => <TableCell key={`${index}`} header={header} cell={cell} />)}</tr>
  )
}

interface TableCellProps {
  header?: boolean
  cell: string
}

export const TableCell = ({ header = false, cell }: TableCellProps): JSX.Element => {
  return (
    header
      ? <th className='px-2 pb-3 font-button text-button text-left'>{cell}</th>
      : <td className='px-2 font-body text-body'>{cell}</td>
  )
}
