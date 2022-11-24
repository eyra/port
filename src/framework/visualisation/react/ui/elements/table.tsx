import _ from 'lodash'
import React from 'react'
import { Weak } from '../../../../helpers'
import TextBundle from '../../../../text_bundle'
import { Translator } from '../../../../translator'
import { PropsUITable, PropsUITableCell, PropsUITableHead, PropsUITableRow } from '../../../../types/elements'
import { ReactFactoryContext } from '../../factory'
import { BackIconButton, ForwardIconButton, IconLabelButton } from './button'
import { CheckBox } from './check_box'
import { SearchBar } from './search_bar'
import { Caption, Label, Title3 } from './text'
import UndoSvg from '../../../../../assets/images/undo.svg'
import DeleteSvg from '../../../../../assets/images/delete.svg'
import { PageIcon } from './page_icon'

type Props = Weak<PropsUITable> & TableContext & ReactFactoryContext

export interface TableContext {
  onChange: (id: string, rows: PropsUITableRow[]) => void
}

interface Visibility {
  search: boolean
  undo: boolean
  delete: boolean
  table: boolean
  noData: boolean
  noDataLeft: boolean
  noResults: boolean
}

interface State {
  edit: boolean
  page: number
  pageCount: number
  pageWindow: number[]
  rows: PropsUITableRow[]
  selected: string[]
  deletedCount: number
  visibility: Visibility
}

export const Table = ({ id, head, body, readOnly = false, pageSize = 7, locale, onChange }: Props): JSX.Element => {
  const pageWindowLegSize = 3

  const query = React.useRef<string[]>([])
  const alteredRows = React.useRef<PropsUITableRow[]>(body.rows)
  const filteredRows = React.useRef<PropsUITableRow[]>(alteredRows.current)

  const initialState: State = {
    edit: false,
    pageCount: getPageCount(),
    page: 0,
    pageWindow: updatePageWindow(0),
    rows: updateRows(0),
    selected: [],
    deletedCount: 0,
    visibility: {
      search: alteredRows.current.length > pageSize,
      delete: false,
      undo: false,
      table: filteredRows.current.length > 0,
      noData: filteredRows.current.length === 0,
      noDataLeft: false,
      noResults: false
    }
  }

  const [state, setState] = React.useState<State>(initialState)

  const copy = prepareCopy(locale)

  function display (element: keyof Visibility): string {
    return visible(element) ? '' : 'hidden'
  }

  function visible (element: keyof Visibility): boolean {
    if (typeof state.visibility[element] === 'boolean') {
      return state.visibility[element]
    }
    return false
  }

  function updatePageWindow (currentPage: number): number[] {
    const pageWindowSize = (pageWindowLegSize * 2) + 1
    const pageCount = getPageCount()

    let range: number[] = []
    if (pageWindowSize >= pageCount && pageCount > 0) {
      range = _.range(0, Math.min(pageCount, pageWindowSize))
    } else if (pageWindowSize < pageCount) {
      const maxIndex = pageCount - 1

      let start: number
      let end: number

      if (currentPage < pageWindowLegSize) {
        // begin
        start = 0
        end = Math.min(pageCount, pageWindowSize)
      } else if (maxIndex - currentPage <= pageWindowLegSize) {
        // end
        start = maxIndex - (pageWindowSize - 1)
        end = maxIndex + 1
      } else {
        // middle
        start = currentPage - pageWindowLegSize
        end = currentPage + pageWindowLegSize + 1
      }
      range = _.range(start, end)
    }

    return range
  }

  function getPageCount (): number {
    if (filteredRows.current.length === 0) {
      return 0
    }

    return Math.ceil(filteredRows.current.length / pageSize)
  }

  function updateRows (currentPage: number): PropsUITableRow[] {
    const offset = currentPage * pageSize
    return filteredRows.current.slice(offset, offset + pageSize)
  }

  function renderHeadRow (props: Weak<PropsUITableHead>): JSX.Element {
    return (
      <tr>
        {state.edit ? renderHeadCheck() : ''}
        {props.cells.map((cell, index) => renderHeadCell(cell, index))}
      </tr>
    )
  }

  function renderHeadCheck (): JSX.Element {
    const selected = state.selected.length > 0 && state.selected.length === state.rows.length
    return (
      <td key='check-head' className='pl-4 w-10'>
        <CheckBox id='-1' selected={selected} onSelect={() => handleSelectHead()} />
      </td>
    )
  }

  function renderHeadCell (props: Weak<PropsUITableCell>, index: number): JSX.Element {
    return (
      <th key={`${index}`} className='h-12 px-4 text-left'>
        <div className='font-table-header text-table text-grey1'>{props.text}</div>
      </th>
    )
  }

  function renderRows (): JSX.Element[] {
    return state.rows.map((row, index) => renderRow(row, index))
  }

  function renderRow (row: PropsUITableRow, rowIndex: number): JSX.Element {
    return (
      <tr key={`${rowIndex}`} className='hover:bg-grey6'>
        {state.edit ? renderRowCheck(row.id) : ''}
        {row.cells.map((cell, cellIndex) => renderRowCell(cell, cellIndex))}
      </tr>
    )
  }

  function renderRowCheck (rowId: string): JSX.Element {
    const selected = state.selected.includes(rowId)
    return (
      <td key={`check-${rowId}`} className='pl-4'>
        <CheckBox id={rowId} selected={selected} onSelect={() => handleSelectRow(rowId)} />
      </td>
    )
  }

  function renderRowCell ({ text }: Weak<PropsUITableCell>, cellIndex: number): JSX.Element {
    const body = isValidHttpUrl(text) ? renderRowLink(text) : renderRowText(text)

    return (
      <td key={`${cellIndex}`} className='h-12 px-4'>
        {body}
      </td>
    )
  }

  function renderRowText (text: string): JSX.Element {
    return <div className='font-table-row text-table text-grey1'>{text}</div>
  }

  function renderRowLink (href: string): JSX.Element {
    return (
      <div className='font-table-row text-table text-primary underline'>
        <a href={href} target='_blank' rel='noreferrer' title={href}>{copy.link}</a>
      </div>
    )
  }

  function isValidHttpUrl (value: string): boolean {
    let url
    try {
      url = new URL(value)
    } catch (_) {
      return false
    }
    return url.protocol === 'http:' || url.protocol === 'https:'
  }

  function renderPageIcons (): JSX.Element {
    return (
      <div className='flex flex-row gap-2'>
        {state.pageWindow.map((page) => renderPageIcon(page))}
      </div>
    )
  }

  function renderPageIcon (index: number): JSX.Element {
    return <PageIcon key={`page-${index}`} index={index + 1} selected={state.page === index} onClick={() => handleNewPage(index)} />
  }

  function filterRows (): PropsUITableRow[] {
    if (query.current.length === 0) {
      return alteredRows.current
    }
    return alteredRows.current.filter((row) => matchRow(row, query.current))
  }

  function matchRow (row: PropsUITableRow, query: string[]): boolean {
    const rowText = row.cells.map((cell) => cell.text).join(' ')
    return query.find((word) => !rowText.includes(word)) === undefined
  }

  function handleSelectHead (): void {
    const allRowsSelected = state.selected.length === state.rows.length
    if (allRowsSelected) {
      setState((state) => {
        return { ...state, selected: [] }
      })
    } else {
      handleSelectAll()
    }
  }

  function handleSelectRow (rowId: string): void {
    setState((state) => {
      const selected = state.selected.slice(0)
      const index = selected.indexOf(rowId)
      if (index === -1) {
        selected.push(rowId)
      } else {
        selected.splice(index, 1)
      }
      return { ...state, selected }
    })
  }

  function handleSelectAll (): void {
    setState((state) => {
      const selected = state.rows.map((row) => row.id)
      return { ...state, selected }
    })
  }

  function handlePrevious (): void {
    setState((state) => {
      const page = state.page === 0 ? state.pageCount - 1 : state.page - 1
      const pageWindow = updatePageWindow(page)
      const rows = updateRows(page)
      return { ...state, page, pageWindow, rows }
    })
  }

  function handleNext (): void {
    setState((state) => {
      const page = state.page === state.pageCount - 1 ? 0 : state.page + 1
      const pageWindow = updatePageWindow(page)
      const rows = updateRows(page)
      return { ...state, page, pageWindow, rows }
    })
  }

  function handleDeleteSelected (): void {
    const currentSelectedRows = state.selected.slice(0)
    if (currentSelectedRows.length === 0) return

    const newAlteredRows = alteredRows.current.slice(0)

    for (const rowId of currentSelectedRows) {
      const index = newAlteredRows.findIndex((row) => row.id === rowId)
      if (index !== -1) {
        newAlteredRows.splice(index, 1)
      }
    }

    alteredRows.current = newAlteredRows
    filteredRows.current = filterRows()

    setState((state) => {
      const pageCount = getPageCount()
      const page = Math.max(0, Math.min(pageCount - 1, state.page))
      const pageWindow = updatePageWindow(page)
      const rows = updateRows(page)
      const deletedCount = body.rows.length - alteredRows.current.length
      const visibility = {
        ...state.visibility,
        undo: deletedCount > 0,
        table: filteredRows.current.length > 0,
        noData: false,
        noDataLeft: alteredRows.current.length === 0,
        noResults: alteredRows.current.length > 0 && filteredRows.current.length === 0
      }
      return { ...state, page, pageCount, pageWindow, rows, deletedCount, selected: [], visibility }
    })

    onChange(id, alteredRows.current)
  }

  function handleUndo (): void {
    alteredRows.current = body.rows
    filteredRows.current = filterRows()
    setState((state) => {
      const pageCount = getPageCount()
      const page = Math.min(pageCount, state.page)
      const pageWindow = updatePageWindow(page)
      const rows = updateRows(state.page)

      const visibility = {
        ...state.visibility,
        undo: false,
        table: filteredRows.current.length > 0,
        noData: false,
        noDataLeft: false,
        noResults: filteredRows.current.length === 0
      }
      return { ...state, page, pageCount, pageWindow, rows, deletedCount: 0, selected: [], visibility }
    })

    onChange(id, body.rows)
  }

  function handleSearch (newQuery: string[]): void {
    query.current = newQuery
    filteredRows.current = filterRows()
    setState((state) => {
      const pageCount = getPageCount()
      const page = Math.min(pageCount, state.page)
      const pageWindow = updatePageWindow(page)
      const rows = updateRows(state.page)
      const visibility = {
        ...state.visibility,
        table: filteredRows.current.length > 0,
        noData: body.rows.length === 0,
        noDataLeft: body.rows.length > 0 && alteredRows.current.length === 0,
        noResults: body.rows.length > 0 && alteredRows.current.length > 0 && filteredRows.current.length === 0
      }
      return { ...state, page, pageCount, pageWindow, rows, visibility }
    })
  }

  function handleNewPage (page: number): void {
    setState((state) => {
      const rows = updateRows(page)
      return { ...state, page, rows }
    })
  }

  function handleEditToggle (): void {
    setState((state) => {
      const edit = !state.edit
      const visibility = {
        ...state.visibility,
        delete: edit
      }
      return { ...state, edit, visibility }
    })
  }

  return (
    <>
      <div className='flex flex-row gap-4 items-center'>
        <div className={`flex flex-row items-center gap-2 mt-2 ${body.rows.length <= pageSize ? 'hidden' : ''} `}>
          <BackIconButton onClick={handlePrevious} />
          <div>
            {renderPageIcons()}
          </div>
          <ForwardIconButton onClick={handleNext} />
        </div>
        <div className='flex-grow' />
        <Caption text={copy.pages} color='text-grey2' margin='' />
        <div className={`${display('search')}`}>
          <SearchBar placeholder={copy.searchPlaceholder} onSearch={(query) => handleSearch(query)} />
        </div>
      </div>
      <div className={`flex flex-col gap-4 justify-center h-full ${display('table')}`}>
        <table className='text-grey1 table-fixed divide-y divide-grey4'>
          <thead>
            {renderHeadRow(head)}
          </thead>
          <tbody className='divide-y divide-grey4'>
            {renderRows()}
          </tbody>
        </table>
      </div>
      <div className={`flex flex-col justify-center items-center w-full h-table bg-grey6 ${display('noData')}`}>
        <Title3 text={copy.noData} color='text-grey3' margin='' />
      </div>
      <div className={`flex flex-col justify-center items-center w-full h-table bg-grey6 ${display('noDataLeft')}`}>
        <Title3 text={copy.noDataLeft} color='text-grey3' margin='' />
      </div>
      <div className={`flex flex-col justify-center items-center w-full h-table bg-grey6 ${display('noResults')}`}>
        <Title3 text={copy.noResults} color='text-grey3' margin='' />
      </div>
      <div className={`flex flex-row items-center gap-6 mt-2 h-8 ${body.rows.length === 0 ? 'hidden' : ''} `}>
        <div className='flex flex-row gap-4 items-center'>
          <CheckBox id='edit' selected={state.edit} onSelect={handleEditToggle} />
          <Label text={copy.edit} margin='mt-1px' />
        </div>
        <div className={`${display('delete')} mt-1px`}>
          <IconLabelButton label={copy.delete} color='text-delete' icon={DeleteSvg} onClick={handleDeleteSelected} />
        </div>
        <div className='flex-grow' />
        <Label text={copy.deleted} />
        <div className={`${display('undo')}`}>
          <IconLabelButton label={copy.undo} color='text-primary' icon={UndoSvg} onClick={handleUndo} />
        </div>
      </div>
    </>
  )

  function prepareCopy (locale: string): Copy {
    return {
      edit: Translator.translate(editLabel, locale),
      undo: Translator.translate(undoLabel, locale),
      noData: Translator.translate(noDataLabel, locale),
      noDataLeft: Translator.translate(noDataLeftLabel, locale),
      noResults: Translator.translate(noResultsLabel, locale),
      pages: Translator.translate(pagesLabel(state.pageCount), locale),
      delete: Translator.translate(deleteLabel, locale),
      deleted: Translator.translate(deletedLabel(body.rows.length - alteredRows.current.length), locale),
      searchPlaceholder: Translator.translate(searchPlaceholder, locale),
      link: Translator.translate(link, locale)
    }
  }
}

interface Copy {
  edit: string
  undo: string
  noData: string
  noDataLeft: string
  noResults: string
  pages: string
  delete: string
  deleted: string
  searchPlaceholder: string
  link: String
}

const link = new TextBundle()
  .add('en', 'Check out')
  .add('nl', 'Bekijk')

const searchPlaceholder = new TextBundle()
  .add('en', 'Search')
  .add('nl', 'Zoeken')

const noDataLabel = new TextBundle()
  .add('en', 'No data found')
  .add('nl', 'Geen gegevens gevonden')

const noDataLeftLabel = new TextBundle()
  .add('en', 'All data removed')
  .add('nl', 'Alle gegevens verwijderd')

const noResultsLabel = new TextBundle()
  .add('en', 'No search results')
  .add('nl', 'Geen zoek resultaten')

const editLabel = new TextBundle()
  .add('en', 'Adjust')
  .add('nl', 'Aanpassen')

const undoLabel = new TextBundle()
  .add('en', 'Undo')
  .add('nl', 'Herstel')

const deleteLabel = new TextBundle()
  .add('en', 'Delete selected')
  .add('nl', 'Verwijder selectie')

function deletedNoneRowLabel (): TextBundle {
  return new TextBundle()
    .add('en', 'No adjustments')
    .add('nl', 'Geen aanpassingen')
}

function deletedRowLabel (amount: number): TextBundle {
  return new TextBundle()
    .add('en', `${amount} row deleted`)
    .add('nl', `${amount} rij verwijderd`)
}

function deletedRowsLabel (amount: number): TextBundle {
  return new TextBundle()
    .add('en', `${amount} rows deleted`)
    .add('nl', `${amount} rijen verwijderd`)
}

function deletedLabel (amount: number): TextBundle {
  if (amount === 0) return deletedNoneRowLabel()
  if (amount === 1) return deletedRowLabel(amount)
  return deletedRowsLabel(amount)
}

function singlePageLabel (): TextBundle {
  return new TextBundle()
    .add('en', '1 page')
    .add('nl', '1 pagina')
}

function multiplePagesLabel (amount: number): TextBundle {
  return new TextBundle()
    .add('en', `${amount} pages`)
    .add('nl', `${amount} pagina's`)
}

function pagesLabel (amount: number): TextBundle {
  if (amount === 1) return singlePageLabel()
  return multiplePagesLabel(amount)
}
