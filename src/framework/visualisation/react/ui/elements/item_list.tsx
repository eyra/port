import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { PropsUITableCell, TableWithContext, PropsUITableRow } from '../../../../types/elements'
import { CheckBox } from './check_box'

export interface Props {
  table: TableWithContext
  locale: string
  handleDelete?: (rowIds: string[]) => void
  pageSize?: number
}

export const ItemList = ({ table, locale, handleDelete, pageSize = 6 }: Props): JSX.Element => {
  const [n, setN] = useState(50)
  const [page, setPage] = useState(0)
  const [show, setShow] = useState(false)
  const columnNames = useMemo(() => table.head.cells.map((cell) => cell.text), [table])
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!ref.current) return
    if (show) {
      ref.current.style.gridTemplateRows = `${ref.current.scrollHeight}px`
    } else {
      ref.current.style.gridTemplateRows = `3rem`
    }
  }, [ref, show])

  const headerClass = `px-3 sticky top-0 font-table-header text-table text-grey1 h-10 pt-3 pb-10 backdrop-blur-2 bg-gradient-to-t from-transparent to-white`
  const cellClass = `px-3 min-h-[2.2rem] flex font-table-row text-table text-grey1 max-w-[10rem] pt-1 hyphens-auto transition-opacity ${
    show ? 'opacity-1 max-w-[10rem]' : 'opacity-0 max-w-[1rem]'
  }`
  const gridTemplateColumns = `repeat(${columnNames.length + 1}, max-content)`

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
      className={`grid transition-all duration-700 max-w-full relative overflow-x-auto overflow-y-hidden `}
    >
      <div className={`grid transition-opacity duration-700`} style={{ gridTemplateColumns }}>
        <button
          className={'bg-primary text-label font-label text-white p-2 my-1 rounded'}
          onClick={() => setShow(!show)}
        >
          Show table
        </button>
        {columnNames.map((name: string, i: number) => {
          return (
            <div key={'header' + i} className={headerClass}>
              <div className="max-w-min">{name}</div>
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
