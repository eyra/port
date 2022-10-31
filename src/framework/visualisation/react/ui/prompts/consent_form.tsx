import { assert, Weak } from '../../../../helpers'
import { PropsUITable, PropsUITableBody, PropsUITableCell, PropsUITableHead, PropsUITableRow, Translatable } from '../../../../types/elements'
import { PropsUIPromptConsentForm, PropsUIPromptConsentFormTable } from '../../../../types/prompts'
import { Table } from '../elements/table'
import { PrimaryButton } from '../elements/button'
import { BodyLarge, Title1, Title2 } from '../elements/text'
import TextBundle from '../../../../text_bundle'
import { Translator } from '../../../../translator'
import { ReactFactoryContext } from '../../factory'
import React from 'react'
import _ from 'lodash'

type Props = Weak<PropsUIPromptConsentForm> & ReactFactoryContext

interface TableContext {
  title: string
  deletedRowCount: number
}

export const ConsentForm = (props: Props): JSX.Element => {
  const [tables, setTables] = React.useState<Array<PropsUITable & TableContext>>(parseTables(props.tables))
  const [metaTablesVisible, setMetaTablesVisible] = React.useState<boolean>(false)
  const metaTables = parseTables(props.metaTables)

  const { resolve } = props
  const { title, description, donateButton } = prepareCopy(props)

  function rowCell (dataFrame: any, column: string, row: number): PropsUITableCell {
    const text = dataFrame[column][`${row}`] as string
    return { __type__: 'PropsUITableCell', text: text }
  }

  function headCell (dataFrame: any, column: string): PropsUITableCell {
    return { __type__: 'PropsUITableCell', text: column }
  }

  function columnNames (dataFrame: any): string[] {
    return Object.keys(dataFrame)
  }

  function columnCount (dataFrame: any): number {
    return columnNames(dataFrame).length
  }

  function rowCount (dataFrame: any): number {
    if (columnCount(dataFrame) === 0) {
      return 0
    } else {
      const firstColumn = dataFrame[columnNames(dataFrame)[0]]
      return Object.keys(firstColumn).length - 1
    }
  }

  function rows (data: any): PropsUITableRow[] {
    const result: PropsUITableRow[] = []
    for (let row = 0; row <= rowCount(data); row++) {
      const cells = columnNames(data).map((column: string) => rowCell(data, column, row))
      result.push({ __type__: 'PropsUITableRow', cells: cells })
    }
    return result
  }

  function parseTables (tablesData: PropsUIPromptConsentFormTable[]): Array<PropsUITable & TableContext> {
    return tablesData.map((table) => parseTable(table))
  }

  function parseTable (tableData: PropsUIPromptConsentFormTable): (PropsUITable & TableContext) {
    const id = tableData.id
    const title = Translator.translate(tableData.title, props.locale)
    const deletedRowCount = 0
    const dataFrame = JSON.parse(tableData.data_frame)
    const headCells = columnNames(dataFrame).map((column: string) => headCell(dataFrame, column))
    const head: PropsUITableHead = { __type__: 'PropsUITableHead', cells: headCells }
    const body: PropsUITableBody = { __type__: 'PropsUITableBody', rows: rows(dataFrame) }

    return { __type__: 'PropsUITable', id, head, body, title, deletedRowCount }
  }

  function renderTable (table: (Weak<PropsUITable> & TableContext), readOnly = false): JSX.Element {
    return (
      <div key={table.id} className='flex flex-col gap-2'>
        <Title2 text={table.title} />
        <Table {...table} readOnly={readOnly} onChange={handleTableChange} />
      </div>
    )
  }

  function handleTableChange ({ id, head, body }: PropsUITable): void {
    const tablesCopy = tables.slice(0)
    const index = tablesCopy.findIndex(table => table.id === id)
    if (index > -1) {
      const { title, body: oldBody, deletedRowCount: oldDeletedRowCount } = tablesCopy[index]
      const deletedRowCount = oldDeletedRowCount + (oldBody.rows.length - body.rows.length)
      tablesCopy[index] = { __type__: 'PropsUITable', id, head, body, title, deletedRowCount }
    }
    setTables(tablesCopy)
  }

  function handleDonate (): void {
    const value = serializeConsentData()
    resolve?.({ __type__: 'PayloadJSON', value })
  }

  function serializeConsentData (): string {
    const array = serializeTables().concat(serializeMetaData())
    return JSON.stringify(array)
  }

  function serializeMetaData (): any[] {
    return serializeMetaTables().concat(serializeDeletedMetaData())
  }

  function serializeTables (): any[] {
    return tables.map((table) => serializeTable(table))
  }

  function serializeMetaTables (): any[] {
    return metaTables.map((table) => serializeTable(table))
  }

  function serializeDeletedMetaData (): any {
    const rawData = tables
      .filter(({ deletedRowCount }) => deletedRowCount > 0)
      .map(({ id, deletedRowCount }) => `User deleted ${deletedRowCount} rows from table: ${id}`)

    const data = JSON.stringify(rawData)
    return { user_omissions: data }
  }

  function serializeTable ({ id, head, body: { rows } }: PropsUITable): any {
    const data = rows.map((row) => serializeRow(row, head))
    return { [id]: data }
  }

  function serializeRow (row: PropsUITableRow, head: PropsUITableHead): any {
    assert(row.cells.length === head.cells.length, `Number of cells in row (${row.cells.length}) should be equals to number of cells in head (${head.cells.length})`)
    const keys = head.cells.map((cell) => cell.text)
    const values = row.cells.map((cell) => cell.text)
    return _.fromPairs(_.zip(keys, values))
  }

  return (
    <>
      <Title1 text={title} />
      <BodyLarge text={description} />
      <div className='flex flex-col gap-8'>
        {tables.map((table) => renderTable(table))}
        {metaTablesVisible ? metaTables.map((table) => renderTable(table, true)) : <div />}
        <div className='flex flex-row gap-4 mt-2'>
          {metaTablesVisible ? '' : <PrimaryButton label='Show meta data' onClick={() => { setMetaTablesVisible(true) }} />}
          <PrimaryButton label={donateButton} onClick={handleDonate} color='bg-success text-white' />
        </div>
      </div>
    </>
  )
}

interface Copy {
  title: string
  description: string
  donateButton: string
}

function prepareCopy ({ title, description, locale }: Props): Copy {
  return {
    title: Translator.translate(title, locale),
    description: Translator.translate(description, locale),
    donateButton: Translator.translate(donateButtonLabel(), locale)
  }
}

const donateButtonLabel = (): Translatable => {
  return new TextBundle()
    .add('en', 'Yes, donate')
    .add('nl', 'Ja, doneer')
}
