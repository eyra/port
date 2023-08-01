import { useCallback, useMemo, useState, useEffect } from 'react'
import { TableWithContext, PropsUITableRow } from '../../../../types/elements'
import { PropsUIPromptConsentFormVisualization } from '../../../../types/prompts'
import { Figure } from '../elements/figure'
import { TableItems } from './table_items'
import { SearchBar } from './search_bar'
import { Title4 } from './text'
import TextBundle from '../../../../text_bundle'
import { Translator } from '../../../../translator'

interface TableContainerProps {
  id: string
  table: TableWithContext
  visualizationSettings: PropsUIPromptConsentFormVisualization[]
  updateTable: (tableId: string, table: TableWithContext) => void
  locale: string
}

export const TableContainer = ({
  id,
  table,
  visualizationSettings,
  updateTable,
  locale
}: TableContainerProps): JSX.Element => {
  const tableVisualizations = visualizationSettings.filter((vs) => vs.table_id === table.id)
  const [searchFilterIds, setSearchFilterIds] = useState<Set<string>>()
  const [search, setSearch] = useState<string>('')
  const text = useMemo(() => getTranslations(locale), [locale])

  useEffect(() => {
    const timer = setTimeout(() => {
      const ids = searchRows(table.originalBody.rows, search)
      setSearchFilterIds(ids)
    }, 300)
    return () => clearTimeout(timer)
  }, [search])

  const searchedTable = useMemo(() => {
    if (searchFilterIds === undefined) return table
    const filteredRows = table.body.rows.filter((row) => searchFilterIds.has(row.id))
    return { ...table, body: { ...table.body, rows: filteredRows } }
  }, [table, searchFilterIds])

  const handleDelete = useCallback(
    (rowIds?: string[]) => {
      if (!rowIds) {
        if (!searchedTable) return
        // if no rowIds specified, delete all rows that meet search condition
        rowIds = searchedTable.body.rows.map((row) => row.id)
      }
      if (rowIds.length) {
        if (rowIds.length === searchedTable?.body?.rows?.length) {
          setSearch('')
          setSearchFilterIds(undefined)
        }
        const deletedRows = [...table.deletedRows, rowIds]
        const newTable = deleteTableRows(table, deletedRows)
        updateTable(id, newTable)
      }
    },
    [id, table, searchedTable]
  )

  const handleUndo = useCallback(() => {
    const deletedRows = table.deletedRows.slice(0, -1)
    const newTable = deleteTableRows(table, deletedRows)
    updateTable(id, newTable)
  }, [id, table])

  return (
    <div
      key={table.id}
      className="p-4 flex flex-col gap-4 w-full overflow-hidden border border-[0.2rem] border-grey4 rounded-lg"
    >
      <div className="flex flex-wrap  ">
        <div className="flex justify-between w-full">
          <Title4 text={table.title} margin="" />
          <div className="max-w-[40%]">
            <SearchBar placeholder={text.searchPlaceholder} search={search} onSearch={setSearch} />
          </div>
        </div>

        <div className="flex md:flex-row w-full">
          {/* <ItemList table={searchedTable} locale={locale} handleDelete={handleDelete} /> */}
          <TableItems
            table={searchedTable}
            handleDelete={handleDelete}
            handleUndo={handleUndo}
            activeSearch={searchFilterIds !== undefined}
            locale={locale}
          />
          {/* <Minimizable>
          <Table {...searchedTable} locale={locale} handleDelete={handleDelete} handleUndo={handleUndo} />
        </Minimizable> */}
        </div>
        {tableVisualizations.map((vs) => {
          return (
            <div className={`w-full`}>
              <Figure
                table={searchedTable}
                visualizationSettings={vs}
                locale={locale}
                handleDelete={handleDelete}
                handleUndo={handleUndo}
              />
            </div>
            // <Minimizable key={vs.id} size={size}>
            //   <Figure table={searchedTable} visualizationSettings={vs} locale={locale} handleDelete={handleDelete} handleUndo={handleUndo} />
            // </Minimizable>
          )
        })}
      </div>
    </div>
  )
}

function deleteTableRows(table: TableWithContext, deletedRows: string[][]): TableWithContext {
  const deleteIds = new Set<string>()
  for (const deletedSet of deletedRows) {
    for (const id of deletedSet) {
      deleteIds.add(id)
    }
  }

  const rows = table.originalBody.rows.filter((row) => !deleteIds.has(row.id))
  const deletedRowCount = table.originalBody.rows.length - rows.length
  return { ...table, body: { ...table.body, rows }, deletedRowCount, deletedRows }
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

function getTranslations(locale: string) {
  const translated: Record<string, string> = {}
  for (let [key, value] of Object.entries(translations)) {
    translated[key] = Translator.translate(value, locale)
  }
  return translated
}

const translations = {
  searchPlaceholder: new TextBundle().add('en', 'Search').add('nl', 'Zoeken')
}
