import React, { ReactNode, useEffect, useMemo, useState } from 'react'
import { SearchBar } from './search_bar'
import TextBundle from '../../../../text_bundle'
import { Translator } from '../../../../translator'
import { TableWithContext, PropsUITableRow } from '../../../../types/elements'
import { BodyLarge } from './text'
import { Bullet } from './bullet'
import { IconLabelButton } from './button'
import UndoSvg from '../../../../../assets/images/undo.svg'
import DeleteSvg from '../../../../../assets/images/delete.svg'

interface Props {
  table: TableWithContext
  setSearchFilterIds: (ids: Set<string> | undefined) => void
  handleDelete: (rowIds: string[]) => void
  handleUndo: () => void
  activeSearch: boolean
  locale: string
}

export const SearchTable = ({ table, setSearchFilterIds, handleDelete, handleUndo, activeSearch, locale }: Props): JSX.Element => {
  const text = useMemo(() => getTranslations(locale), [locale])
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    const timer = setTimeout(() => {
      const ids = searchRows(table.originalBody.rows, search)
      setSearchFilterIds(ids)
    }, 300)
    return () => clearTimeout(timer)
  }, [search])

  function onDelete() {
    const rowIds = table.body.rows.map((row) => row.id)
    if (rowIds.length) {
      handleDelete(rowIds)
      setSearch('')
      setSearchFilterIds(undefined)
    }
  }

  function undoLabel() {
    const n = table.deletedRows.length
    if (n === 1) return text.undo
    return text.undo + ' last'
  }

  const deleted = table.deletedRowCount
  const n = table.body.rows.length
  const total = table.originalBody.rows.length - table.deletedRowCount

  return (
    <div className={`flex flex-col min-w-[20rem]`}>
      <SearchBar placeholder={text.searchPlaceholder} search={search} onSearch={setSearch} />
      <div className="p-3 grid grid-cols-[max-content,1fr] gap-x-4 text-gray-900 ">
        <GridRow label={text.total} show>
          {total}
        </GridRow>
        <GridRow label={text.found} show>
          {activeSearch ? n : '-'}
          {activeSearch && n > 0 ? <IconLabelButton label={text.delete} color="text-delete" icon={DeleteSvg} onClick={onDelete} /> : null}
        </GridRow>

        <GridRow label={text.deleted} show>
          {deleted === 0 ? '-' : deleted}
          {deleted > 0 ? <IconLabelButton label={undoLabel()} color="text-primary" icon={UndoSvg} onClick={handleUndo} /> : null}
        </GridRow>
      </div>
    </div>
  )
}

const GridRow = ({ label, children, show }: { label: string; children: ReactNode; show?: boolean }): JSX.Element => {
  if (!show) return <></>
  return (
    <>
      <div className="min-w-[3rem] mb-1 text-grey2 md:text-lg">{label}</div>
      <div className="text-lg font-semibold flex gap-8 justify-between">{children}</div>
    </>
  )
}

function getTranslations(locale: string) {
  const translated: Record<string, string> = {}
  for (let [key, value] of Object.entries(translations)) {
    translated[key] = Translator.translate(value, locale)
  }
  return translated
}

function searchRows(rows: PropsUITableRow[], search: string): Set<string> | undefined {
  if (search.trim() === '') return undefined
  const query = search.trim().split(/\s+/)
  const regexes: RegExp[] = []
  for (const q of query) regexes.push(new RegExp(q.replace(/[-/\\^$*+?.()|[\]{}]/, '\\$&'), 'i'))

  const ids = new Set<string>()
  outer: for (let row of rows) {
    for (let regex of regexes) {
      let anyCellMatches = false
      for (let cell of row.cells) {
        if (regex.test(cell.text)) {
          anyCellMatches = true
          break
        }
      }
      if (!anyCellMatches) continue outer
    }
    ids.add(row.id)
  }

  return ids
}

const translations = {
  searchPlaceholder: new TextBundle().add('en', 'Search').add('nl', 'Zoeken'),
  total: new TextBundle().add('en', 'total').add('nl', 'totaal'),
  found: new TextBundle().add('en', 'found').add('nl', 'gevonden'),
  deleted: new TextBundle().add('en', 'deleted').add('nl', 'verwijderd'),
  delete: new TextBundle().add('en', 'Delete').add('nl', 'Verwijder'),
  undo: new TextBundle().add('en', 'Undo').add('nl', 'Herstel')
}
