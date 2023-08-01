import { useEffect, useMemo, useState } from 'react'
import { SearchBar } from './search_bar'
import TextBundle from '../../../../text_bundle'
import { Translator } from '../../../../translator'
import { TableWithContext, PropsUITableRow } from '../../../../types/elements'

import UndoSvg from '../../../../../assets/images/undo.svg'
import DeleteSvg from '../../../../../assets/images/delete.svg'
import { Title4 } from './text'

interface Props {
  table: TableWithContext
  handleDelete: (rowIds?: string[]) => void
  handleUndo: () => void
  activeSearch: boolean
  locale: string
}

export const TableItems = ({
  table,
  handleDelete,
  handleUndo,
  activeSearch,
  locale
}: Props): JSX.Element => {
  const text = useMemo(() => getTranslations(locale), [locale])

  const deleted = table.deletedRowCount
  const n = table.body.rows.length
  const total = table.originalBody.rows.length - table.deletedRowCount

  const nLabel = n.toLocaleString('en', { useGrouping: true })
  const totalLabel = total.toLocaleString('en', { useGrouping: true })
  const itemLabelSuffix = activeSearch ? ' / ' + totalLabel : ' ' + text.items
  const deletedLabel = deleted.toLocaleString('en', { useGrouping: true }) + ' ' + text.deleted

  return (
    <div className="pl-0 flex flex-auto flex-col min-w-[200px] gap-1">
      <div key={totalLabel} className="flex items-center gap-x-4 animate-fadeIn">
        <div className="text-lg text-title6  font-label animate-fadeIn">
          {nLabel}
          <span className="text-title7 text-grey1">{itemLabelSuffix}</span>
        </div>
        <IconButton
          icon={DeleteSvg}
          label={text.delete}
          onClick={() => handleDelete()}
          color="text-delete"
          hidden={!activeSearch || n === 0}
        />
      </div>
      <div
        key={deleted > 0 ? 'changed' : ''}
        className={`flex ${deleted > 0 ? '' : 'invisible'} gap-x-4 text-primary animate-fadeIn`}
      >
        <div className="font-label ">{deletedLabel}</div>
        <IconButton
          icon={UndoSvg}
          label={text.undo}
          onClick={handleUndo}
          color="text-primary"
          hidden={deleted === 0}
        />
      </div>
    </div>
  )
}

function IconButton(props: {
  icon: string
  label: string
  onClick: () => void
  color: string
  hidden?: boolean
}) {
  if (props.hidden) return null
  return (
    <div
      className={`flex items-center gap-1 cursor-pointer ${props.color} animate-fadeIn `}
      onClick={props.onClick}
    >
      {/* {props.label} */}
      <img src={props.icon} className="w-5 h-5 translate-y-[-2px]" />
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

const translations = {
  items: new TextBundle().add('en', 'items').add('nl', 'items'),
  total: new TextBundle().add('en', 'total').add('nl', 'totaal'),
  found: new TextBundle().add('en', 'found').add('nl', 'gevonden'),
  deleted: new TextBundle().add('en', 'deleted').add('nl', 'verwijderd'),
  delete: new TextBundle().add('en', 'delete').add('nl', 'verwijder'),
  undo: new TextBundle().add('en', 'undo').add('nl', 'herstel')
}
