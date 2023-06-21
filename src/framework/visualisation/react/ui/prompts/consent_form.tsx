import { assert, Weak } from '../../../../helpers'
import { PropsUITable, PropsUITableBody, PropsUITableCell, PropsUITableHead, PropsUITableRow, TableContext } from '../../../../types/elements'
import { PropsUIPromptConsentForm, PropsUIPromptConsentFormTable, PropsUIPromptConsentFormVisualization } from '../../../../types/prompts'
import { Table } from '../elements/table'
import { LabelButton, PrimaryButton } from '../elements/button'
import { BodyLarge, Title4 } from '../elements/text'
import TextBundle from '../../../../text_bundle'
import { Translator } from '../../../../translator'
import { ReactFactoryContext } from '../../factory'
import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import _ from 'lodash'
import { AggregateRowIds, VisualizationType, VisualizationData } from '../../../../types/visualizations'
import { Visualization } from '../elements/visualization'

type Props = Weak<PropsUIPromptConsentForm> & ReactFactoryContext
type Tables = Array<PropsUITable & TableContext>

const testVisualizations: PropsUIPromptConsentFormVisualization[] = [
  {
    __type__: 'PropsUIPromptConsentFormVisualization',
    table_id: 'netflix_viewings',
    visualization: {
      type: 'line',
      x: { column: 'Start Time', formatDate: 'auto' },
      ys: [{ label: 'N', column: 'Duration' }]
    }
  }
]

export const ConsentForm = (props: Props): JSX.Element => {
  const [tables, setTables] = useState<Tables>(parseTables(props.tables))
  const [metaTables, setMetaTables] = useState<Tables>(parseTables(props.metaTables))

  //const { visualizationSettings, locale, resolve } = props
  const { locale, resolve } = props
  const visualizationSettings = testVisualizations

  const { description, donateQuestion, donateButton, cancelButton } = prepareCopy(props)

  useEffect(() => {
    setTables(parseTables(props.tables))
    setMetaTables(parseTables(props.metaTables))
  }, [props.tables])

  const handleDelete = useCallback(
    (tableId: string, rowIds: string[]): void => {
      if (rowIds.length === 0) return
      setTables((tables) => {
        const index = tables.findIndex((table) => table.id === tableId)
        if (index === -1) return tables

        const newTables = [...tables]
        const table = newTables[index]
        const rows = table.body.rows.filter((row) => !rowIds.includes(row.id))
        const deletedRowCount = table.originalBody.rows.length - rows.length
        newTables[index] = { ...table, body: { ...table.body, rows }, deletedRowCount }
        return newTables
      })
    },
    [setTables]
  )

  const handleUndo = useCallback(
    (tableId: string) => {
      setTables((tables) => {
        const index = tables.findIndex((table) => table.id === tableId)
        if (index === -1) return tables

        const newTables = [...tables]
        newTables[index] = parseTable(props.tables[index])
        newTables[index].annotations = tables[index].annotations
        return newTables
      })
    },
    [props.tables]
  )

  function rowCell(dataFrame: any, column: string, row: number): PropsUITableCell {
    const text = String(dataFrame[column][`${row}`])
    return { __type__: 'PropsUITableCell', text: text }
  }

  function headCell(dataFrame: any, column: string): PropsUITableCell {
    return { __type__: 'PropsUITableCell', text: column }
  }

  function columnNames(dataFrame: any): string[] {
    return Object.keys(dataFrame)
  }

  function columnCount(dataFrame: any): number {
    return columnNames(dataFrame).length
  }

  function rowCount(dataFrame: any): number {
    if (columnCount(dataFrame) === 0) {
      return 0
    } else {
      const firstColumn = dataFrame[columnNames(dataFrame)[0]]
      return Object.keys(firstColumn).length - 1
    }
  }

  function rows(data: any): PropsUITableRow[] {
    const result: PropsUITableRow[] = []
    for (let row = 0; row <= rowCount(data); row++) {
      const id = `${row}`
      const cells = columnNames(data).map((column: string) => rowCell(data, column, row))
      result.push({ __type__: 'PropsUITableRow', id, cells })
    }
    return result
  }

  function parseTables(tablesData: PropsUIPromptConsentFormTable[]): Array<PropsUITable & TableContext> {
    return tablesData.map((table) => parseTable(table))
  }

  function parseTable(tableData: PropsUIPromptConsentFormTable): PropsUITable & TableContext {
    const id = tableData.id
    const title = Translator.translate(tableData.title, props.locale)
    const deletedRowCount = 0
    const dataFrame = JSON.parse(tableData.data_frame)
    const headCells = columnNames(dataFrame).map((column: string) => headCell(dataFrame, column))
    const head: PropsUITableHead = { __type__: 'PropsUITableHead', cells: headCells }
    const body: PropsUITableBody = { __type__: 'PropsUITableBody', rows: rows(dataFrame) }

    return { __type__: 'PropsUITable', id, head, body, title, deletedRowCount, annotations: [], originalBody: body }
  }

  function handleDonate(): void {
    const value = serializeConsentData()
    resolve?.({ __type__: 'PayloadJSON', value })
  }

  function handleCancel(): void {
    resolve?.({ __type__: 'PayloadFalse', value: false })
  }

  function serializeConsentData(): string {
    const array = serializeTables().concat(serializeMetaData())
    return JSON.stringify(array)
  }

  function serializeMetaData(): any[] {
    return serializeMetaTables().concat(serializeDeletedMetaData())
  }

  function serializeTables(): any[] {
    return tables.map((table) => serializeTable(table))
  }

  function serializeMetaTables(): any[] {
    return metaTables.map((table) => serializeTable(table))
  }

  function serializeDeletedMetaData(): any {
    const rawData = tables
      .filter(({ deletedRowCount }) => deletedRowCount > 0)
      .map(({ id, deletedRowCount }) => `User deleted ${deletedRowCount} rows from table: ${id}`)

    const data = JSON.stringify(rawData)
    return { user_omissions: data }
  }

  function serializeTable({ id, head, body: { rows } }: PropsUITable): any {
    const data = rows.map((row) => serializeRow(row, head))
    return { [id]: data }
  }

  function serializeRow(row: PropsUITableRow, head: PropsUITableHead): any {
    assert(
      row.cells.length === head.cells.length,
      `Number of cells in row (${row.cells.length}) should be equals to number of cells in head (${head.cells.length})`
    )
    const keys = head.cells.map((cell) => cell.text)
    const values = row.cells.map((cell) => cell.text)
    return _.fromPairs(_.zip(keys, values))
  }

  return (
    <>
      <BodyLarge text={description} />
      <div className="flex flex-col gap-16">
        <TablesAndVisualizations
          tables={tables}
          visualizationSettings={visualizationSettings}
          locale={locale}
          handleDelete={handleDelete}
          handleUndo={handleUndo}
        />
        <div>
          <BodyLarge margin="" text={donateQuestion} />
          <div className="flex flex-row gap-4 mt-4 mb-4">
            <PrimaryButton label={donateButton} onClick={handleDonate} color="bg-success text-white" />
            <LabelButton label={cancelButton} onClick={handleCancel} color="text-grey1" />
          </div>
        </div>
      </div>
    </>
  )
}

interface TablesAndVisualizationsProps {
  tables: Tables
  visualizationSettings: PropsUIPromptConsentFormVisualization[]
  locale: string
  handleDelete: (tableId: string, rowIds: string[]) => void
  handleUndo: (tableId: string) => void
  readOnly?: boolean
}

const TablesAndVisualizations = ({
  tables,
  visualizationSettings,
  locale,
  handleDelete,
  handleUndo,
  readOnly
}: TablesAndVisualizationsProps): JSX.Element => {
  const visualizationData = useVisualizationData(tables, visualizationSettings)

  console.log(visualizationData)
  return (
    <div className="grid gap-8 max-w-full">
      {tables.map((table) => {
        return (
          <div key={table.id} className="flex flex-col gap-4 mb-4">
            <Title4 text={table.title} margin="" />
            <div className="flex flex-wrap gap-4">
              <Minimizable>
                <Table
                  {...table}
                  deletedRowCount={table.deletedRowCount}
                  readOnly={!!readOnly}
                  locale={locale}
                  handleDelete={handleDelete}
                  handleUndo={handleUndo}
                />
              </Minimizable>
              {visualizationData.map((visualization) => {
                if (!visualization) return null
                if (visualization.tableId !== table.id) return null
                return (
                  <Minimizable>
                    <Visualization visualizationData={visualization} locale={locale} handleDelete={handleDelete} handleUndo={handleUndo} />
                  </Minimizable>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function useVisualizationData(tables: Tables, visualizationSettings: PropsUIPromptConsentFormVisualization[]): VisualizationData[] {
  const [visualizationData, setVisualizationData] = useState<VisualizationData[]>([])
  const previousTables = useRef<Record<string, PropsUITable & TableContext>>({})

  useEffect(() => {
    setVisualizationData([])
  }, [visualizationSettings])

  useEffect(() => {
    setVisualizationData((visualizationData) => {
      const newVisualizations = [...visualizationData]
      for (let i = 0; i < visualizationSettings.length; i++) {
        const vs = visualizationSettings[i]
        const table = tables.find((table) => table.id === vs.table_id)
        console.log(table)
        if (!table) continue
        if (vs == null && previousTables.current[table.id] === table) continue
        newVisualizations[i] = aggregateTableColumns(table, vs)
        previousTables.current[table.id] = table
      }
      return newVisualizations
    })
  }, [tables, visualizationSettings, previousTables])

  return visualizationData
}

function aggregateTableColumns(table: PropsUITable & TableContext, visualizationSettings: PropsUIPromptConsentFormVisualization): VisualizationData {
  const visualization: VisualizationType = visualizationSettings.visualization
  const visualizationData: VisualizationData = {
    type: visualization.type,
    tableId: table.id,
    position: visualizationSettings.position || 'table',
    xKey: { label: visualization.x.label || visualization.x.column },
    yKeys: {},
    data: []
  }

  // First get the unique values of the x column
  const rowIds = table.body.rows.map((row) => row.id)
  const x = getTableColumn(table, visualization.x.column)
  if (!x || x.length === 0) return visualizationData

  const aggregate: Record<string, any> = {}

  // ADD CODE TO TRANSFORM TO DATE, BUT THEN ALSO KEEP AN INDEX BASED ON THE DATE ORDER
  //for (let i = 0; i < x.length; i++) aggregate[x[i]] = { __rowIds: {} }

  // Get and (if needed) aggregate values from y columns
  for (let y of visualization.ys) {
    const aggFun = y.aggregate || 'count'
    const yValues = getTableColumn(table, y.column)
    if (!yValues) return visualizationData

    // If group_by column is specified, the columns in the aggregated data will be the unique group_by columns
    const yGroup = y.group_by ? getTableColumn(table, y.group_by) : null
    // If the number of observations is required for aggregation, we need to count them per group first
    const groupN: Record<string, number> = {}
    if (aggFun === 'count_pct' || aggFun === 'mean') {
      for (let i = 0; i < x.length; i++) {
        const group = yGroup ? yGroup[i] : y.label || y.column
        if (!groupN[group]) groupN[group] = 0
        groupN[group] += 1
      }
    }

    for (let i = 0; i < x.length; i++) {
      const value = yValues[i]
      const group = yGroup ? yGroup[i] : y.label || y.column
      const n = groupN[group] || 1

      // add the AxisSettings for the yKeys in this loop, because we need to get the unique group values from the data (if group_by is used)
      if (!visualizationData.yKeys[group]) visualizationData.yKeys[group] = { label: group, secondAxis: y.secondAxis }

      if (!aggregate[x[i]]) aggregate[x[i]] = { __rowIds: {} }
      if (!aggregate[x[i]].__rowIds[group]) aggregate[x[i]].__rowIds[group] = []
      aggregate[x[i]].__rowIds[group].push(rowIds[i])

      if (!aggregate[x[i]][group]) aggregate[x[i]][group] = 0
      if (aggFun === 'count') aggregate[x[i]][group] += 1
      if (aggFun === 'count_pct') aggregate[x[i]][group] += 1 / n
      if (aggFun === 'sum') aggregate[x[i]][group] += Number(value) || 0
      if (aggFun === 'mean') aggregate[x[i]][group] += (Number(value) || 0) / n
    }
  }

  visualizationData.data = Object.keys(aggregate).map((x) => {
    return { [visualizationData.xKey.label]: x, ...aggregate[x] }
  })

  return visualizationData
}

type DateFormat =
  | 'auto'
  | 'year'
  | 'month'
  | 'day'
  | 'hour'
  | 'minute'
  | 'second'
  | 'month_cycle'
  | 'weekday_cycle'
  | 'day_cycle'
  | 'hour_cycle'
  | 'minute_cycle'
  | 'second_cycle'

function formatDate(dateString: string[], format: DateFormat, maxValues: number): string[] {
  let formattedDate: string[] = dateString

  const dateNumbers = dateString.map((date) => new Date(date).getTime())
  const minTime = Math.min(...dateNumbers)
  const maxTime = Math.max(...dateNumbers)
  // const minTime = minDate.getTime()
  // const maxTime = maxDate.getTime()

  if (format === 'auto') {
    if (maxTime - minTime > 1000 * 60 * 60 * 24 * 365 * maxValues) format = 'year'
    else if (maxTime - minTime > 1000 * 60 * 60 * 24 * 30 * maxValues) format = 'month'
    else if (maxTime - minTime > 1000 * 60 * 60 * 24 * maxValues) format = 'day'
    else if (maxTime - minTime > 1000 * 60 * 60 * maxValues) format = 'hour'
    else if (maxTime - minTime > 1000 * 60 * maxValues) format = 'minute'
    else if (maxTime - minTime > 1000 * maxValues) format = 'second'
  }
  if (format === 'year') formattedDate = dateNumbers.map((date) => new Date(date).getFullYear().toString())
  if (format === 'month')
    formattedDate = dateNumbers.map(
      (date) => new Date(date).getFullYear().toString() + '-' + new Date(date).toLocaleString('default', { month: 'short' })
    )
  if (format === 'day') formattedDate = dateNumbers.map((date) => new Date(date).toLocaleDateString('default'))

  return formattedDate
}

function getTableColumn(table: PropsUITable & TableContext, column: string): string[] | undefined {
  const columnIndex = table.head.cells.findIndex((cell) => cell.text === column)
  if (columnIndex >= 0) return table.body.rows.map((row) => row.cells[columnIndex].text)
  console.error(`Table column ${table.id}.${column} not found`)
  return undefined
}

const Minimizable = ({ children }: { children: ReactNode }): JSX.Element => {
  const [isMinimized, setIsMinimized] = useState<boolean>(true)

  const containerStyle = isMinimized ? `overflow-hidden h-60 w-96` : ``
  const childStyle = isMinimized ? `scale-50 origin-top-left z-10 p-5 w-[200%]` : ``
  const toggleStyle = isMinimized
    ? `absolute top-0 left-0 h-full w-full z-20 bg-primary/0 hover:bg-primary/25 border-solid border-2 cursor-zoom-in`
    : `w-min ml-auto cursor-zoom-out`
  const iconStyle = isMinimized ? `rounded-tr-sm bg-primary` : `rounded-sm mb-2 bg-primary`

  return (
    <div className={`overflow-auto relative transition-all min-h-48 ${containerStyle}`}>
      <div
        className={`flex transition-all items-end justify-start rounded-sm border-primary ${toggleStyle}`}
        onClick={() => setIsMinimized(!isMinimized)}
      >
        <div className={`relative font-caption text-xl px-4 py-1 backdrop-blur-[2px] text-white z-30 ${iconStyle}`}>
          {isMinimized ? zoomInIcon : zoomOutIcon}
        </div>
      </div>
      <div className={`relative transition-all ${childStyle}`}>{children}</div>
    </div>
  )
}

const zoomInIcon = (
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
    ></path>
  </svg>
)

const zoomOutIcon = (
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6"
    ></path>
  </svg>
)

interface Copy {
  description: string
  donateQuestion: string
  donateButton: string
  cancelButton: string
}

function prepareCopy({ locale }: Props): Copy {
  return {
    description: Translator.translate(description, locale),
    donateQuestion: Translator.translate(donateQuestionLabel, locale),
    donateButton: Translator.translate(donateButtonLabel, locale),
    cancelButton: Translator.translate(cancelButtonLabel, locale)
  }
}

const donateQuestionLabel = new TextBundle().add('en', 'Do you want to donate the above data?').add('nl', 'Wilt u de bovenstaande gegevens doneren?')

const donateButtonLabel = new TextBundle().add('en', 'Yes, donate').add('nl', 'Ja, doneer')

const cancelButtonLabel = new TextBundle().add('en', 'No').add('nl', 'Nee')

const description = new TextBundle()
  .add(
    'en',
    'Determine whether you would like to donate the data below. Carefully check the data and adjust when required. With your donation you contribute to the previously described research. Thank you in advance.'
  )
  .add(
    'nl',
    'Bepaal of u de onderstaande gegevens wilt doneren. Bekijk de gegevens zorgvuldig en pas zo nodig aan. Met uw donatie draagt u bij aan het eerder beschreven onderzoek. Alvast hartelijk dank.'
  )
