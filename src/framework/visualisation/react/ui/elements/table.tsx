import { Weak } from '../../../../helpers'
import { PropsUITable, PropsUITableBody, PropsUITableCell, PropsUITableHead, PropsUITableRow } from '../../../../types/elements'

export const Table = ({ id, head, body }: Weak<PropsUITable>): JSX.Element => {
  function renderHead (props: Weak<PropsUITableHead>): JSX.Element {
    return <tr>{props.cells.map((cell, index) => renderHeadCell(cell, index))}</tr>
  }

  function renderHeadCell (props: Weak<PropsUITableCell>, index: number): JSX.Element {
    return <th key={`${index}`} className='px-2 pb-3 font-button text-button text-left'>{props.text}</th>
  }

  function renderRows (props: Weak<PropsUITableBody>): JSX.Element[] {
    return props.rows.map((row, index) => renderRow(row, index))
  }

  function renderRow (row: Weak<PropsUITableRow>, rowIndex: number): JSX.Element {
    return <tr key={`${rowIndex}`}>{row.cells.map((cell, cellIndex) => renderRowCell(cell, cellIndex))}</tr>
  }

  function renderRowCell (props: Weak<PropsUITableCell>, cellIndex: number): JSX.Element {
    return <td key={`${cellIndex}`} className='px-2 font-body text-body'>{props.text}</td>
  }

  return (
    <table className='text-grey1 table-auto'>
      <thead>
        {renderHead(head)}
      </thead>
      <tbody>
        {renderRows(body)}
      </tbody>
    </table>
  )
}
