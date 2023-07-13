import React, { ReactNode, useEffect, useMemo, useState } from 'react'
import { SearchBar } from './search_bar'
import TextBundle from '../../../../text_bundle'
import { Translator } from '../../../../translator'
import { TableWithContext, PropsUITableRow } from '../../../../types/elements'
import { BodyLarge, Title3, Title4 } from './text'
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
  size?: string
  locale: string
}

export const SearchTable = ({ table, setSearchFilterIds, handleDelete, handleUndo, activeSearch, size = '', locale }: Props): JSX.Element => {
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

  const deleted = table.deletedRowCount
  const n = table.body.rows.length
  const total = table.originalBody.rows.length - table.deletedRowCount

  const nLabel = n.toLocaleString('en', { useGrouping: true })
  const totalLabel = total.toLocaleString('en', { useGrouping: true })
  const itemLabel = activeSearch ? `${nLabel} / ${totalLabel}` : totalLabel + ' ' + text.items
  const deletedLabel = deleted.toLocaleString('en', { useGrouping: true }) + ' ' + text.deleted

  return (
    <div className={`flex flex-col ${size}`}>
      <div className="flex flex-col  text-gray-900 gap-y-3">
        <div className="">
          <SearchBar placeholder={text.searchPlaceholder} search={search} onSearch={setSearch} />
        </div>
        <div className="pl-3 flex flex-col items-starst min-w-[250px] gap-1">
          <div className="flex gap-x-4">
            <div className="text-lg text-title6 font-label">{itemLabel}</div>
            <IconButton icon={DeleteSvg} label={text.delete} onClick={onDelete} color="text-delete" hidden={!activeSearch || n === 0} />
          </div>
          <div className={`flex ${deleted > 0 ? '' : 'hidden'} gap-x-4 text-primary`}>
            <div className="font-label text-delete">{deletedLabel}</div>
            <IconButton icon={UndoSvg} label={text.undo} onClick={handleUndo} color="text-primary" hidden={deleted === 0} />
          </div>
        </div>
      </div>
    </div>
  )
}

function IconButton(props: { icon: string; label: string; onClick: () => void; color: string; hidden?: boolean }) {
  return (
    <div className={`${props.hidden ? 'hidden' : ''} flex gap-1 cursor-pointer ${props.color}`} onClick={props.onClick}>
      <img src={props.icon} className="w-5 h-5" />
      {props.label}
    </div>
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
  items: new TextBundle().add('en', 'items').add('nl', 'items'),
  total: new TextBundle().add('en', 'total').add('nl', 'totaal'),
  found: new TextBundle().add('en', 'found').add('nl', 'gevonden'),
  deleted: new TextBundle().add('en', 'deleted').add('nl', 'verwijderd'),
  delete: new TextBundle().add('en', 'delete').add('nl', 'verwijder'),
  undo: new TextBundle().add('en', 'undo').add('nl', 'herstel')
}
