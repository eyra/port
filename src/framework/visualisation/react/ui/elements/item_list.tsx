import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { PropsUITableCell, TableWithContext, PropsUITableRow } from '../../../../types/elements'
import { CheckBox } from './check_box'

export interface Props {
  table: TableWithContext
  show: boolean
  locale: string
  handleDelete?: (rowIds: string[]) => void
  pageSize?: number
}

export const ItemList = ({
  table,
  show,
  locale,
  handleDelete,
  pageSize = 7
}: Props): JSX.Element => {
  const [page, setPage] = useState(0)
  const columnNames = useMemo(() => table.head.cells.map((cell) => cell.text), [table])
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!ref.current) return
    if (show) {
      ref.current.style.gridTemplateRows = `${ref.current.scrollHeight}px`
    } else {
      ref.current.style.gridTemplateRows = `0rem`
    }
  }, [ref, show])

  const headerClass = 'sticky top-0 left-0 bg-grey6 z-10 '
  const cellClass = `px-2 min-h-[3rem] flex items-center font-table-row text-table border-b-2 border-grey4 border-solid
  text-grey1 max-w-[10rem] pt-1 hyphens-auto transition-opacity max-w-[10rem]`
  const gridTemplateColumns = `repeat(${columnNames.length + 1}, auto)`

  const items = useMemo(() => {
    const items: (PropsUITableRow | null)[] = new Array(pageSize).fill(null)
    for (let i = 0; i < pageSize; i++) {
      const index = page * pageSize + i
      if (table.body.rows[index]) items[i] = table.body.rows[index]
    }
    return items
  }, [table, page, pageSize])

  return (
    <div
      ref={ref}
      className={`min-w-full grid transition-all duration-700 max-w-full relative overflow-x-auto overflow-y-hidden`}
    >
      <div className={`grid transition-opacity duration-700 `} style={{ gridTemplateColumns }}>
        <div className={cellClass}>
          <CheckBox id={'select_all'} selected={false} onSelect={() => {}} />
        </div>
        {columnNames.map((name: string, i: number) => {
          return (
            <div key={'header' + i} className={`${headerClass} ${cellClass}`}>
              <div className="font-table-header text-grey1">{name}</div>
            </div>
          )
        })}

        {items.map((item) => {
          if (!item) return columnNames.map((name) => <div key={name} className={cellClass}></div>)
          const cells = item.cells.map((cell: PropsUITableCell, i: number) => {
            return (
              <div key={item.id + '_' + i} className={cellClass}>
                <div className="line-clamp-2 max-h-7">{cell.text} </div>
              </div>
            )
          })
          return (
            <>
              {/* <input className="border-2 text-primarylight border-solid border-grey3 rounded w-4 h-4" type="checkbox" /> */}
              <div className={cellClass}>
                <CheckBox id={item.id} selected={false} onSelect={() => {}} />
              </div>
              {cells}
            </>
          )
        })}
        <div className="h-2"></div>
      </div>
    </div>
  )
}
