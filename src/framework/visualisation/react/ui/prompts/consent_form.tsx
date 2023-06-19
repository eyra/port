import { assert, Weak } from '../../../../helpers'
import { PropsUITable, PropsUITableBody, PropsUITableCell, PropsUITableHead, PropsUITableRow } from '../../../../types/elements'
import { PropsUIPromptConsentForm, PropsUIPromptConsentFormTable, PropsUIPromptConsentFormVisualization } from '../../../../types/prompts'
import { Table } from '../elements/table'
import { LabelButton, PrimaryButton } from '../elements/button'
import { BodyLarge, Title4 } from '../elements/text'
import TextBundle from '../../../../text_bundle'
import { Translator } from '../../../../translator'
import { ReactFactoryContext } from '../../factory'
import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import _ from 'lodash'
import { VisualizationSettings } from '../../../../types/data_visualization'
import { table } from 'console'

type Props = Weak<PropsUIPromptConsentForm> & ReactFactoryContext

interface TableContext {
  title: string
  deletedRowCount: number
  annotations: Annotation[]
  originalBody: PropsUITableBody
}

type Tables = Array<PropsUITable & TableContext>

interface Annotation {
  row_id: string
  [key: string]: any
}

export const ConsentForm = (props: Props): JSX.Element => {
  const [tables, setTables] = useState<Tables>(parseTables(props.tables))
  const [metaTables, setMetaTables] = useState<Tables>(parseTables(props.metaTables))

  const { visualizations, locale, resolve } = props
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
    console.log('parseTables')
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
          visualizations={visualizations}
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
  visualizations: PropsUIPromptConsentFormVisualization[]
  locale: string
  handleDelete: (tableId: string, rowIds: string[]) => void
  handleUndo: (tableId: string) => void
  readOnly?: boolean
}

const TablesAndVisualizations = ({
  tables,
  visualizations,
  locale,
  handleDelete,
  handleUndo,
  readOnly
}: TablesAndVisualizationsProps): JSX.Element => {
  // const containerRef = useRef<HTMLDivElement>(null)

  // const [width, setWidth] = useState<number>(0)

  // useEffect(() => {
  //   if (!containerRef.current) return
  //   const el = containerRef.current
  //   const updateWidth = () => el?.offsetWidth ?? setWidth(el.offsetWidth)
  //   updateWidth()
  //   el.addEventListener('resize', updateWidth)
  //   return () => el.removeEventListener('resize', updateWidth)
  // }, [containerRef])

  // console.log(width)

  return (
    <div className="grid gap-8">
      {tables.map((table) => {
        return (
          <div key={table.id} className="flex flex-col gap-4 mb-4">
            <Title4 text={table.title} margin="" />
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
          </div>
        )
      })}
    </div>
  )
}

const Minimizable = ({ children }: { children: ReactNode }): JSX.Element => {
  const [isMinimized, setIsMinimized] = useState<boolean>(true)

  const containerStyle = isMinimized ? `overflow-hidden h-48` : ``
  const childStyle = isMinimized ? `scale-50 origin-top-left z-10 p-5` : ``
  const toggleStyle = isMinimized
    ? `absolute top-0 left-0 h-full w-1/2 z-20 bg-primary/0 hover:bg-primary/25 border-solid border-2 cursor-zoom-in`
    : `w-min ml-auto cursor-zoom-out`
  const iconStyle = isMinimized ? `rounded-tr-sm bg-primary` : `rounded-sm mb-2 bg-primary`

  return (
    <div className={`relative transition-all min-h-48 ${containerStyle}`}>
      <div
        className={`flex transition-all items-end justify-start rounded-sm border-primary z-0   ${toggleStyle}`}
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
    className="h-8 w-8"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
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
    stroke-width="1.5"
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
