import _, { get } from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'
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
  deletedRowCount: number
  handleDelete: (tableId: string, rowIds: string[]) => void
  handleUndo: (tableId: string) => void
}

export const Table = ({ id, head, body, deletedRowCount, readOnly = false, pageSize = 7, locale, handleDelete, handleUndo }: Props): JSX.Element => {
  const [query, setQuery] = useState<string[]>([])
  const [rows, setRows] = useState(body.rows)
  const [page, setPage] = useState<number>(0)
  const [pageRows, setPageRows] = useState<PropsUITableRow[]>(rows.slice(0, pageSize))
  const [adjust, setAdjust] = useState<boolean>(false)
  const [selected, setSelected] = useState<string[]>([])

  const pageCount = Math.ceil(rows.length / pageSize)
  const pageWindow = determinePageWindow(page, pageCount)

  useEffect(() => {
    setRows(filterRows(body.rows, query))
    setSelected([])
  }, [body.rows, query])

  useEffect(() => {
    setPage(safePage(page, rows.length, pageSize))
    setPageRows(rows.slice(page * pageSize, (page + 1) * pageSize))
    setSelected([])
  }, [rows, page, pageSize])

  const copy = prepareCopy(locale)

  function display(element: string): string {
    let visible = true
    if (element === 'search') visible = body.rows.length > pageSize
    if (element === 'undo') visible = deletedRowCount > 0
    if (element === 'delete') visible = adjust && body.rows.length > 0
    if (element === 'table') visible = rows.length > 0
    if (element === 'adjust') visible = !readOnly && body.rows.length > 0
    if (element === 'footer') visible = body.rows.length > 0 || deletedRowCount > 0
    if (element === 'pagination') visible = body.rows.length > pageSize

    const noData = body.rows.length === 0 && deletedRowCount === 0
    if (element === 'noData') visible = noData
    if (element === 'noDataLeft') visible = !noData && rows.length === 0 && query.length === 0
    if (element === 'noResults') visible = !noData && rows.length === 0 && query.length > 0

    return visible ? '' : 'hidden'
  }

  function renderHeadRow(props: Weak<PropsUITableHead>): JSX.Element {
    return (
      <tr>
        {adjust ? renderHeadCheck() : ''}
        {props.cells.map((cell, index) => renderHeadCell(cell, index))}
      </tr>
    )
  }

  function renderHeadCheck(): JSX.Element {
    const isSelected = selected.length > 0 && selected.length === pageRows.length
    return (
      <td key="check-head" className="pl-4 w-10">
        <CheckBox id="-1" selected={isSelected} onSelect={() => handleSelectHead()} />
      </td>
    )
  }

  function renderHeadCell(props: Weak<PropsUITableCell>, index: number): JSX.Element {
    return (
      <th key={`${index}`} className="h-12 px-4 text-left">
        <div className="font-table-header text-table text-grey1">{props.text}</div>
      </th>
    )
  }

  function renderRows(): JSX.Element[] {
    return pageRows.map((row, index) => renderRow(row, index))
  }

  function renderRow(row: PropsUITableRow, rowIndex: number): JSX.Element {
    return (
      <tr key={`${rowIndex}`} className="hover:bg-grey6">
        {adjust ? renderRowCheck(row.id) : ''}
        {row.cells.map((cell, cellIndex) => renderRowCell(cell, cellIndex))}
      </tr>
    )
  }

  function renderRowCheck(rowId: string): JSX.Element {
    const isSelected = selected.includes(rowId)
    return (
      <td key={`check-${rowId}`} className="pl-4">
        <CheckBox id={rowId} selected={isSelected} onSelect={() => handleSelectRow(rowId)} />
      </td>
    )
  }

  function renderRowCell({ text }: Weak<PropsUITableCell>, cellIndex: number): JSX.Element {
    const body = isValidHttpUrl(text) ? renderRowLink(text) : renderRowText(text)

    return (
      <td key={`${cellIndex}`} className="h-12 px-4">
        {body}
      </td>
    )
  }

  function renderRowText(text: string): JSX.Element {
    return <div className="font-table-row text-table text-grey1">{text}</div>
  }

  function renderRowLink(href: string): JSX.Element {
    return (
      <div className="font-table-row text-table text-primary underline">
        <a href={href} target="_blank" rel="noreferrer" title={href}>
          {copy.link}
        </a>
      </div>
    )
  }

  function isValidHttpUrl(value: string): boolean {
    let url
    try {
      url = new URL(value)
    } catch (_) {
      return false
    }
    return url.protocol === 'http:' || url.protocol === 'https:'
  }

  function renderPageIcons(): JSX.Element {
    return <div className="flex flex-row gap-2">{pageWindow.map((page) => renderPageIcon(page))}</div>
  }

  function renderPageIcon(index: number): JSX.Element {
    return <PageIcon key={`page-${index}`} index={index + 1} selected={page === index} onClick={() => setPage(index)} />
  }

  function handleSelectHead(): void {
    const allRowsSelected = selected.length === pageRows.length
    if (allRowsSelected) {
      setSelected([])
    } else {
      handleSelectAll()
    }
  }

  function handleSelectRow(rowId: string): void {
    setSelected((selected) => {
      const index = selected.indexOf(rowId)
      if (index === -1) {
        selected.push(rowId)
      } else {
        selected.splice(index, 1)
      }
      return [...selected]
    })
  }

  function handleSelectAll(): void {
    setSelected(pageRows.map((row) => row.id))
  }

  function handlePrevious(): void {
    setPage((page) => (page <= 0 ? pageCount - 1 : page - 1))
  }

  function handleNext(): void {
    setPage((page) => (page >= pageCount - 1 ? 0 : page + 1))
  }

  function handleSearch(query: string[]) {
    setQuery(query)
    setPage(0)
  }

  return (
    <>
      <div className="flex flex-row gap-4 items-center">
        <div className={`flex flex-row items-center gap-2 mt-2 ${display('pagination')} `}>
          <BackIconButton onClick={handlePrevious} />
          <div>{renderPageIcons()}</div>
          <ForwardIconButton onClick={handleNext} />
        </div>
        <div className="flex-grow" />
        {pageCount > 1 && <Caption text={copy.pages} color="text-grey2" margin="" />}
        <div className={`${display('search')}`}>
          <SearchBar placeholder={copy.searchPlaceholder} onSearch={handleSearch} />
        </div>
      </div>
      <div className={`flex flex-col gap-4 justify-center h-full ${display('table')}`}>
        <table className="text-grey1 table-fixed divide-y divide-grey4">
          <thead>{renderHeadRow(head)}</thead>
          <tbody className="divide-y divide-grey4">{renderRows()}</tbody>
        </table>
      </div>
      <div className={`flex flex-col justify-center items-center w-full h-table bg-grey6 ${display('noData')}`}>
        <Title3 text={copy.noData} color="text-grey3" margin="" />
      </div>
      <div className={`flex flex-col justify-center items-center w-full h-table bg-grey6 ${display('noDataLeft')}`}>
        <Title3 text={copy.noDataLeft} color="text-grey3" margin="" />
      </div>
      <div className={`flex flex-col justify-center items-center w-full h-table bg-grey6 ${display('noResults')}`}>
        <Title3 text={copy.noResults} color="text-grey3" margin="" />
      </div>
      <div className={`flex flex-row items-center gap-6 mt-2 h-8 ${display('footer')} `}>
        <div className={`flex flex-row gap-4 items-center ${display('adjust')}`}>
          <CheckBox id="edit" selected={adjust} onSelect={() => setAdjust(!adjust)} />
          <Label text={copy.edit} margin="mt-1px" />
        </div>
        <div className={`${display('delete')} mt-1px`}>
          <IconLabelButton label={copy.delete} color="text-delete" icon={DeleteSvg} onClick={() => handleDelete(id, selected)} />
        </div>
        <div className="flex-grow" />
        <Label text={copy.deleted} />
        <div className={`${display('undo')}`}>
          <IconLabelButton label={copy.undo} color="text-primary" icon={UndoSvg} onClick={() => handleUndo(id)} />
        </div>
      </div>
    </>
  )

  function prepareCopy(locale: string): Copy {
    return {
      edit: Translator.translate(editLabel, locale),
      undo: Translator.translate(undoLabel, locale),
      noData: Translator.translate(noDataLabel, locale),
      noDataLeft: Translator.translate(noDataLeftLabel, locale),
      noResults: Translator.translate(noResultsLabel, locale),
      pages: Translator.translate(pagesLabel(pageCount), locale),
      delete: Translator.translate(deleteLabel, locale),
      deleted: Translator.translate(deletedLabel(deletedRowCount), locale),
      searchPlaceholder: Translator.translate(searchPlaceholder, locale),
      link: Translator.translate(link, locale)
    }
  }
}

// function filterRows(rows: PropsUITableRow[], query: string[]): PropsUITableRow[] {
//   if (query.length === 0) return rows

//   return rows.filter((row) => {
//     const rowText = row.cells.map((cell) => cell.text).join(' ')
//     return query.find((word) => !rowText.includes(word)) === undefined
//   })
// }

function filterRows(rows: PropsUITableRow[], query: string[]): PropsUITableRow[] {
  const regexes: RegExp[] = []
  for (const q of query) regexes.push(new RegExp(q.replace(/[-/\\^$*+?.()|[\]{}]/, '\\$&'), 'i'))

  console.log(regexes)
  return rows.filter((row) => {
    for (let regex of regexes) {
      let anyCellMatches = false
      for (let cell of row.cells) {
        if (regex.test(cell.text)) {
          anyCellMatches = true
          break
        }
      }
      if (!anyCellMatches) return false
    }
    return true
  })
}

function safePage(page: number, rowsCount: number, pageSize: number): number {
  const pageCount = Math.ceil(rowsCount / pageSize)
  const lastPage = Math.max(pageCount - 1, 0)
  const safePage = Math.min(page, lastPage)
  return safePage
}

function determinePageWindow(currentPage: number, pageCount: number): number[] {
  const pageWindowLegSize = 3
  const pageWindowSize = pageWindowLegSize * 2 + 1

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

const link = new TextBundle().add('en', 'Check out').add('nl', 'Bekijk')

const searchPlaceholder = new TextBundle().add('en', 'Search').add('nl', 'Zoeken')

const noDataLabel = new TextBundle().add('en', 'No data found').add('nl', 'Geen gegevens gevonden')

const noDataLeftLabel = new TextBundle().add('en', 'All data removed').add('nl', 'Alle gegevens verwijderd')

const noResultsLabel = new TextBundle().add('en', 'No search results').add('nl', 'Geen zoek resultaten')

const editLabel = new TextBundle().add('en', 'Adjust').add('nl', 'Aanpassen')

const undoLabel = new TextBundle().add('en', 'Undo').add('nl', 'Herstel')

const deleteLabel = new TextBundle().add('en', 'Delete selected').add('nl', 'Verwijder selectie')

function deletedNoneRowLabel(): TextBundle {
  return new TextBundle().add('en', 'No adjustments').add('nl', 'Geen aanpassingen')
}

function deletedRowLabel(amount: number): TextBundle {
  return new TextBundle().add('en', `${amount} row deleted`).add('nl', `${amount} rij verwijderd`)
}

function deletedRowsLabel(amount: number): TextBundle {
  return new TextBundle().add('en', `${amount} rows deleted`).add('nl', `${amount} rijen verwijderd`)
}

function deletedLabel(amount: number): TextBundle {
  if (amount === 0) return deletedNoneRowLabel()
  if (amount === 1) return deletedRowLabel(amount)
  return deletedRowsLabel(amount)
}

function singlePageLabel(): TextBundle {
  return new TextBundle().add('en', '1 page').add('nl', '1 pagina')
}

function multiplePagesLabel(amount: number): TextBundle {
  return new TextBundle().add('en', `${amount} pages`).add('nl', `${amount} pagina's`)
}

function pagesLabel(amount: number): TextBundle {
  if (amount === 1) return singlePageLabel()
  return multiplePagesLabel(amount)
}
