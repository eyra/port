import _ from 'lodash'
import React from 'react'
import { Weak } from '../../../../helpers'
import { PropsUITable, PropsUITableCell, PropsUITableHead, PropsUITableRow } from '../../../../types/elements'
import { PrimaryButton, SecondaryButton } from './button'
import { CheckBox } from './check_box'
import { BodyMedium, Title6 } from './text'

type Props = Weak<PropsUITable> & TableContext

export interface TableContext {
  onChange: (table: PropsUITable) => void
}

export const Table = ({ readOnly = false, id, head, body, onChange }: Props): JSX.Element => {
  const [selectedRows, setSelectedRows] = React.useState<number[]>([])

  function renderHeadRow (props: Weak<PropsUITableHead>): JSX.Element {
    return (
      <tr>
        {readOnly ? '' : renderHeadCheck()}
        {props.cells.map((cell, index) => renderHeadCell(cell, index))}
      </tr>
    )
  }

  function renderHeadCheck (): JSX.Element {
    const selected = selectedRows.length > 0 && selectedRows.length === body.rows.length
    return (
      <td key='check-head'>
        <CheckBox id={-1} selected={selected} onSelect={() => handleSelectHead()} />
      </td>
    )
  }

  function renderHeadCell (props: Weak<PropsUITableCell>, index: number): JSX.Element {
    return (
      <th key={`${index}`} className='px-2 pt-3 pb-13px text-left'>
        <Title6 text={props.text} margin='' />
      </th>
    )
  }

  function renderRows (rows: PropsUITableRow[]): JSX.Element[] {
    return rows.map((row, index) => renderRow(row, index))
  }

  function renderRow (row: PropsUITableRow, rowIndex: number): JSX.Element {
    return (
      <tr key={`${rowIndex}`} className='hover:bg-grey5'>
        {readOnly ? '' : renderRowCheck(rowIndex)}
        {row.cells.map((cell, cellIndex) => renderRowCell(cell, cellIndex))}
      </tr>
    )
  }

  function renderRowCheck (rowIndex: number): JSX.Element {
    const selected = selectedRows.includes(rowIndex)
    return (
      <td key={`check-${rowIndex}`} className='w-8 min-w-8'>
        <CheckBox id={rowIndex} selected={selected} onSelect={() => handleSelectRow(rowIndex)} />
      </td>
    )
  }

  function renderRowCell (props: Weak<PropsUITableCell>, cellIndex: number): JSX.Element {
    return (
      <td key={`${cellIndex}`} className='px-2 pt-3 pb-13px'>
        <BodyMedium text={props.text} margin='' />
      </td>
    )
  }

  function handleSelectHead (): void {
    const allRowsSelected = selectedRows.length === body.rows.length
    if (allRowsSelected) {
      setSelectedRows([])
    } else {
      handleSelectAll()
    }
  }

  function handleSelectRow (row: number): void {
    const newSelected = selectedRows.slice(0)
    const index = selectedRows.indexOf(row)
    if (index === -1) {
      newSelected.push(row)
    } else {
      newSelected.splice(index, 1)
    }
    setSelectedRows(newSelected)
  }

  function handleSelectAll (): void {
    const range = _.range(0, body.rows.length)
    setSelectedRows(range)
  }

  function handleDeleteSelected (): void {
    const currentSelectedRows = selectedRows.slice(0)
    currentSelectedRows.sort((n1, n2) => n2 - n1)
    const newRows = body.rows.slice(0)
    for (const rowIndex of currentSelectedRows) {
      newRows.splice(rowIndex, 1)
    }

    setSelectedRows([])
    onChange({
      __type__: 'PropsUITable',
      id,
      head,
      body: {
        __type__: 'PropsUITableBody',
        rows: newRows
      }
    })
  }

  return (
    <>
      <div className={`flex flex-row gap-4 ${readOnly ? 'hidden' : 'block'}`}>
        <PrimaryButton label='Select all' onClick={handleSelectAll} />
        <SecondaryButton label='Delete selected' onClick={handleDeleteSelected} />
      </div>
      <table className='text-grey1 table-auto border-collapse overflow-hidden'>
        <thead>
          {renderHeadRow(head)}
        </thead>
        <tbody>
          {renderRows(body.rows)}
        </tbody>
      </table>
    </>
  )
}
