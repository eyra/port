import _ from 'lodash'
import React from 'react'
import { Weak } from '../../../../helpers'
import { PropsUITable, PropsUITableCell, PropsUITableHead, PropsUITableRow } from '../../../../types/elements'
import { BackButton, ForwardButton, PrimaryButton, SecondaryButton } from './button'
import { CheckBox } from './check_box'
import { SearchBar } from './search_bar'
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
  const [query, setQuery] = React.useState<string[]>([])
  const [alteredRows, setAlteredRows] = React.useState<PropsUITableRow[]>(body.rows)
  const [filteredRows, setFilteredRows] = React.useState<PropsUITableRow[]>(alteredRows)
  const [pages, setPages] = React.useState<Page[]>(createPages(filteredRows))
  const [currentPage, setCurrentPage] = React.useState<Page>(pages[0])
  const [selectedRows, setSelectedRows] = React.useState<string[]>([])

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
        <CheckBox id='-1' selected={selected} onSelect={() => handleSelectHead()} />
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
        {editMode ? renderRowCheck(row.id) : ''}
        {row.cells.map((cell, cellIndex) => renderRowCell(cell, cellIndex))}
      </tr>
    )
  }

  function renderRowCheck (rowId: string): JSX.Element {
    const selected = selectedRows.includes(rowId)
    return (
      <td key={`check-${rowId}`} className='w-8 min-w-8'>
        <CheckBox id={rowId} selected={selected} onSelect={() => handleSelectRow(rowId)} />
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

  function handleSelectRow (rowId: string): void {
    const newSelected = selectedRows.slice(0)
    const index = selectedRows.indexOf(rowId)
    if (index === -1) {
      newSelected.push(rowId)
    } else {
      newSelected.splice(index, 1)
    }
    setSelectedRows(newSelected)
  }

  function handleSelectAll (): void {
    const allRowIds = currentPage.rows.map((row) => row.id)
    setSelectedRows(allRowIds)
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
    const currentSelectedRows = selectedRows.slice(0)
    const newAlteredRows = alteredRows.slice(0)

    for (const rowId of currentSelectedRows) {
      const index = newAlteredRows.findIndex((row) => row.id === rowId)
      if (index !== -1) {
        newAlteredRows.splice(index, 1)
      }
    }
    updateAlteredRows(newAlteredRows, query)
  }

  function updateAlteredRows (alteredRows: PropsUITableRow[], query: string[]): void {
    const filteredRows = filterRows(alteredRows, query)
    const newPages = createPages(filteredRows)
    const newCurrentPageIndex = Math.min(newPages.length, currentPage.index)
    const newCurrentPage = newPages[newCurrentPageIndex]

    setAlteredRows(alteredRows)
    setFilteredRows(filteredRows)
    setPages(newPages)
    setCurrentPage(newCurrentPage)
    setSelectedRows([])

    onChange(id, alteredRows)
  }

  function filterRows (rows: PropsUITableRow[], query: string[]): PropsUITableRow[] {
    if (query.length === 0) {
      return rows
    }
    return rows.filter((row) => matchRow(row, query))
  }

  function matchRow (row: PropsUITableRow, query: string[]): boolean {
    const rowText = row.cells.map((cell) => cell.text).join(' ')
    return query.find((word) => !rowText.includes(word)) === undefined
  }

  function handleUndo (): void {
    updateAlteredRows(body.rows, query)
  }

  function handleSearch (query: string[]): void {
    setQuery(query)
    updateAlteredRows(alteredRows, query)
  }

  return (
    <>
      <div className='flex flex-row gap-4'>
        <div className={`${!editMode && !readOnly ? '' : 'hidden'}`}>
          <PrimaryButton label='Edit' onClick={() => setEditMode(true)} color='bg-delete text-white' />
        </div>
        <div className={`${editMode ? '' : 'hidden'}`}>
          <PrimaryButton label='Select all' onClick={handleSelectAll} />
        </div>
        <div className={`${editMode ? '' : 'hidden'}`}>
          <SecondaryButton label='Delete' onClick={handleDeleteSelected} />
        </div>
        <div className={`${editMode && body.rows.length > 0 ? '' : 'hidden'}`}>
          <SecondaryButton label='Undo' onClick={handleUndo} color='text-grey1' />
        </div>
        <div className={`${alteredRows.length > pageSize ? '' : 'hidden'}`}>
          <SearchBar placeholder='Search' onSearch={handleSearch} />
        </div>
      </div>
      <div className={`${filteredRows.length === 0 ? 'hidden' : ''}`}>
        <table className='text-grey1 table-auto '>
          <thead>
            {renderHeadRow(head)}
          </thead>
          <tbody>
            {renderRows(currentPage.rows)}
          </tbody>
        </table>
        <div className={`flex flex-row gap-4 mt-2 ${filteredRows.length <= pageSize ? 'hidden' : ''} `}>
          <BackButton label='Previous' onClick={handlePrevious} />
          <div>{currentPage.index + 1} / {pages.length}</div>
          <ForwardButton label='Next' onClick={handleNext} />
        </div>
      </div>
      <div className={`flex flex-col ${alteredRows.length === 0 ? '' : 'hidden'}`}>
        <BodyLarge text='Empty data set' margin='' />
      </div>
      <div className={`flex flex-col ${alteredRows.length > 0 && filteredRows.length === 0 ? '' : 'hidden'}`}>
        <BodyLarge text='Nothing found' margin='' />
      </div>
    </>
  )
}
