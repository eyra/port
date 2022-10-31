import _ from 'lodash'
import React from 'react'
import { Weak } from '../../../../helpers'
import { PropsUITable, PropsUITableCell, PropsUITableHead, PropsUITableRow } from '../../../../types/elements'
import { BackButton, ForwardButton, PrimaryButton, SecondaryButton } from './button'
import { CheckBox } from './check_box'
import { BodyLarge, BodyMedium, Title6 } from './text'

type Props = Weak<PropsUITable> & TableContext

export interface TableContext {
  onChange: (id: string, rows: PropsUITableRow[]) => void
}

interface Page {
  index: number
  rows: PropsUITableRow[]
}

export const Table = ({ id, head, body, readOnly = false, pageSize = 7, onChange }: Props): JSX.Element => {
  const [editMode, setEditMode] = React.useState<boolean>(false)
  const [rows, setRows] = React.useState<PropsUITableRow[]>(body.rows)
  const [pages, setPages] = React.useState<Page[]>(createPages(rows))
  const [currentPage, setCurrentPage] = React.useState<Page>(pages[0])
  const [selectedRows, setSelectedRows] = React.useState<number[]>([])

  function createPages (rows: PropsUITableRow[]): Page[] {
    if (rows.length === 0) {
      return [{ index: 0, rows }]
    }

    return _
      .range(0, Math.ceil(rows.length / pageSize))
      .map((index) => { return { index, rows: createPage(index, rows) } })
  }

  function createPage (page: number, rows: PropsUITableRow[]): PropsUITableRow[] {
    const offset = page * pageSize
    return rows.slice(offset, offset + pageSize)
  }

  function renderHeadRow (props: Weak<PropsUITableHead>): JSX.Element {
    return (
      <tr>
        {editMode ? renderHeadCheck() : ''}
        {props.cells.map((cell, index) => renderHeadCell(cell, index))}
      </tr>
    )
  }

  function renderHeadCheck (): JSX.Element {
    const selected = selectedRows.length > 0 && selectedRows.length === currentPage.rows.length
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
        {editMode ? renderRowCheck(rowIndex) : ''}
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
    const allRowsSelected = selectedRows.length === currentPage.rows.length
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
    const range = _.range(0, currentPage.rows.length)
    setSelectedRows(range)
  }

  function handlePrevious (): void {
    const index = currentPage.index === 0 ? pages.length - 1 : currentPage.index - 1
    setSelectedRows([])
    setCurrentPage(pages[index])
  }

  function handleNext (): void {
    const index = currentPage.index === pages.length - 1 ? 0 : currentPage.index + 1
    setSelectedRows([])
    setCurrentPage(pages[index])
  }

  function handleDeleteSelected (): void {
    const currentSelectedRows = selectedRows.slice(0).sort((n1, n2) => n2 - n1)
    const newRows = rows.slice(0)
    const offset = currentPage.index * pageSize

    for (const rowIndex of currentSelectedRows) {
      const start = offset + rowIndex
      newRows.splice(start, 1)
    }

    const newPages = createPages(newRows)
    const newCurrentPageIndex = Math.min(newPages.length - 1, currentPage.index)
    const newCurrentPage = newPages[newCurrentPageIndex]

    updateRows(newRows)

    setRows(newRows)
    setPages(newPages)
    setCurrentPage(newCurrentPage)
    setSelectedRows([])

    onChange(id, newRows)
  }

  function updateRows (rows: PropsUITableRow[]): void {
    const newPages = createPages(rows)
    const newCurrentPageIndex = Math.min(newPages.length, currentPage.index)
    const newCurrentPage = newPages[newCurrentPageIndex]

    setRows(rows)
    setPages(newPages)
    setCurrentPage(newCurrentPage)
    setSelectedRows([])

    onChange(id, rows)
  }

  function handleUndo (): void {
    updateRows(body.rows)
  }

  return (
    <>
      <div className={`${rows.length === 0 ? 'hidden' : ''}`}>
        <div className={`${readOnly ? 'hidden' : ''}`}>
          <div className={`flex flex-row gap-4 ${!editMode ? '' : 'hidden'}`}>
            <PrimaryButton label='Edit' onClick={() => setEditMode(true)} color='bg-delete text-white' />
          </div>
          <div className={`flex flex-row gap-4 ${editMode ? '' : 'hidden'}`}>
            <PrimaryButton label='Select all' onClick={handleSelectAll} />
            <SecondaryButton label='Delete' onClick={handleDeleteSelected} />
            <SecondaryButton label='Undo' onClick={handleUndo} color='text-grey1' />
          </div>
        </div>
        <div className='mb-4' />
        <table className='text-grey1 table-auto '>
          <thead>
            {renderHeadRow(head)}
          </thead>
          <tbody>
            {renderRows(currentPage.rows)}
          </tbody>
        </table>
        <div className='mb-2' />
        <div className={`flex flex-row gap-4 ${rows.length <= pageSize ? 'hidden' : ''} `}>
          <BackButton label='Previous' onClick={handlePrevious} />
          <div>{currentPage.index + 1} / {pages.length}</div>
          <ForwardButton label='Next' onClick={handleNext} />
        </div>
      </div>
      <div className={`flex flex-col gap-4 ${rows.length === 0 ? '' : 'hidden'}`}>
        <div className={`flex flex-row gap-4 ${body.rows.length > 0 ? '' : 'hidden'}`}>
          <SecondaryButton label='Undo' onClick={handleUndo} color='text-grey1' />
        </div>
        <BodyLarge text='Table is empty' />
      </div>
    </>
  )
}
