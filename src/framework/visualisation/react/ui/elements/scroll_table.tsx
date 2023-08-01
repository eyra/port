import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { PropsUITableCell, TableWithContext, PropsUITableRow } from '../../../../types/elements'
import { CheckBox } from './check_box'
import { LabelButton } from './button'
import UndoSvg from '../../../../../assets/images/undo.svg'
import DeleteSvg from '../../../../../assets/images/delete.svg'
import { Pagination } from './pagination'
import TextBundle from '../../../../text_bundle'
import { Translator } from '../../../../translator'

export interface Props {
  table: TableWithContext
  show: boolean
  locale: string
  handleDelete?: (rowIds: string[]) => void
  handleUndo?: () => void
  pageSize?: number
}

export const ScrollTable = ({
  table,
  show,
  locale,
  handleDelete,
  handleUndo,
  pageSize = 7
}: Props): JSX.Element => {
  const [page, setPage] = useState(0)
  const columnNames = useMemo(() => table.head.cells.map((cell) => cell.text), [table])
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const ref = useRef<HTMLDivElement>(null)
  const nPages = Math.ceil(table.body.rows.length / pageSize)
  const selectedLabel = selected.size.toLocaleString(locale, { useGrouping: true })
  const text = useMemo(() => getTranslations(locale), [locale])

  useEffect(() => {
    setSelected(new Set())
    setPage((page) => Math.max(0, Math.min(page, nPages - 1)))
  }, [table, nPages])

  useLayoutEffect(() => {
    // set exact height of grid row for height transition
    if (!ref.current) return
    function setHeight() {
      if (!ref.current) return
      if (show) {
        ref.current.style.gridTemplateRows = `${ref.current.scrollHeight}px`
      } else {
        ref.current.style.gridTemplateRows = `0rem`
      }
    }
    setHeight()

    // just as a precaution, update height every second in case it changes
    const interval = setInterval(setHeight, 1000)
    return () => clearInterval(interval)
  }, [ref, show])

  const cellClass = `min-w-[8rem] h-[3rem] px-3 flex items-center`
  const valueClass = `line-clamp-2`

  const items = useMemo(() => {
    const items: (PropsUITableRow | null)[] = new Array(pageSize).fill(null)
    for (let i = 0; i < pageSize; i++) {
      const index = page * pageSize + i
      if (table.body.rows[index]) items[i] = table.body.rows[index]
    }
    return items
  }, [table, page, pageSize])

  function renderHeaderCell(value: string, i: number) {
    return (
      <th key={'header' + i}>
        <div className={`text-left ${cellClass}`}>
          <div>{value}</div>
        </div>
      </th>
    )
  }

  function renderCell(cell: PropsUITableCell, i: number) {
    return (
      <td key={i} className="">
        <div className={cellClass}>
          <div className={valueClass}>{cell.text}</div>
        </div>
      </td>
    )
  }

  function toggleSelected(id: string) {
    if (selected.has(id)) {
      selected.delete(id)
    } else {
      selected.add(id)
    }
    setSelected(new Set(selected))
  }

  function toggleSelectAll() {
    if (selected.size === table.body.rows.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(table.body.rows.map((row) => row.id)))
    }
  }

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 transition-all duration-500 relative overflow-hidden`}
    >
      <div className="">
        <div className="max-w-full overflow-auto">
          <table className="table-fixed min-w-full">
            <thead className="">
              <tr className="border-b-2 border-grey4 border-solid">
                <td className="w-8">
                  <CheckBox
                    id={'selectAll'}
                    size="w-7 h-7"
                    selected={
                      table.body.rows.length > 0 && selected.size === table.body.rows.length
                    }
                    onSelect={toggleSelectAll}
                  />
                </td>
                {columnNames.map(renderHeaderCell)}
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                if (!item)
                  return (
                    <tr className="border-b-2 border-grey6">
                      <td>
                        <div className={cellClass} />
                      </td>
                    </tr>
                  )
                return (
                  <tr key={item.id} className="border-b-2 border-grey4 border-solid">
                    <td key={'select'}>
                      <CheckBox
                        id={item.id}
                        size="w-7 h-7"
                        selected={selected.has(item.id)}
                        onSelect={() => toggleSelected(item.id)}
                      />
                    </td>
                    {item.cells.map(renderCell)}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className={`flex justify-between min-h-[3.5rem]`}>
          <div className="pt-2">
            {selected.size > 0 ? (
              <IconButton
                icon={DeleteSvg}
                label={`${text.delete} ${selectedLabel}`}
                color="text-delete"
                onClick={() => handleDelete?.([...selected])}
              />
            ) : null}
            {selected.size === 0 && table.deletedRowCount ? (
              <IconButton
                icon={UndoSvg}
                label={text.undo}
                color="text-primary"
                onClick={() => handleUndo?.()}
              />
            ) : null}
          </div>
          <Pagination page={page} setPage={setPage} nPages={nPages} />
        </div>
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
      className={`flex items-center gap-2 cursor-pointer ${props.color} animate-fadeIn text-button `}
      onClick={props.onClick}
    >
      <img src={props.icon} className="w-9 h-9 -translate-x-[3px]" />
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

const translations = {
  delete: new TextBundle().add('en', 'Delete').add('nl', 'Verwijder'),
  undo: new TextBundle().add('en', 'Undo').add('nl', 'Herstel')
}
