import { assert, Weak } from '../../../../helpers'
import {
  PropsUITable,
  PropsUITableBody,
  PropsUITableCell,
  PropsUITableHead,
  PropsUITableRow,
  TableWithContext,
  TableContext
} from '../../../../types/elements'
import { PropsUIPromptConsentForm, PropsUIPromptConsentFormTable, PropsUIPromptConsentFormVisualization } from '../../../../types/prompts'
import { LabelButton, PrimaryButton } from '../elements/button'
import { BodyLarge, Title4 } from '../elements/text'
import TextBundle from '../../../../text_bundle'
import { Translator } from '../../../../translator'
import { ReactFactoryContext } from '../../factory'
import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import _ from 'lodash'

import { Table } from '../elements/table'
import { Figure } from '../elements/figure'

import { Minimizable } from '../elements/Minimizable'
import useUnloadWarning from '../hooks/useUnloadWarning'

type Props = Weak<PropsUIPromptConsentForm> & ReactFactoryContext

const testVisualizations: PropsUIPromptConsentFormVisualization[] = [
  {
    __type__: 'PropsUIPromptConsentFormVisualization',
    id: 'netflix_viewings_area',
    position: 'table',
    table_id: 'netflix_viewings',
    title: new TextBundle().add('en', 'Number of viewings over time').add('nl', 'Aantal gezien over tijd'),
    visualization: {
      type: 'area',
      x: { column: 'Start Time' },
      ys: [{ label: 'N', column: 'Duration', addZeroes: true }],
      dateFormat: 'auto'
    }
  },
  {
    __type__: 'PropsUIPromptConsentFormVisualization',
    id: 'netflix_viewings_bar',
    position: 'table',
    table_id: 'netflix_viewings',
    title: new TextBundle().add('en', 'Viewings by hour of the day').add('nl', 'Aantal gezien per uur van de dag'),
    visualization: {
      type: 'bar',
      x: { column: 'Start Time' },
      ys: [{ label: 'N', column: 'Start Time', addZeroes: true, aggregate: 'count_pct' }],
      dateFormat: 'hour_cycle'
    }
  },
  {
    __type__: 'PropsUIPromptConsentFormVisualization',
    id: 'netflix_playback_line',
    position: 'table',
    table_id: 'netflix_playback',
    title: new TextBundle().add('en', 'Viewings by hour of the day').add('nl', 'Aantal gezien per uur van de dag'),
    visualization: {
      type: 'line',
      x: { column: 'Date time' },
      ys: [
        { label: 'Start', column: 'start', addZeroes: true, aggregate: 'sum' },
        { label: 'Playing', column: 'playing', addZeroes: true, aggregate: 'sum' },
        { label: 'Stopped', column: 'stopped', addZeroes: true, aggregate: 'sum' },
        { label: 'Paused', column: 'paused', addZeroes: true, aggregate: 'sum' }
      ],
      dateFormat: 'hour_cycle'
    }
  }
]

export const ConsentForm = (props: Props): JSX.Element => {
  useUnloadWarning()
  const [tables, setTables] = useState<TableWithContext[]>(parseTables(props.tables))
  const [metaTables, setMetaTables] = useState<TableWithContext[]>(parseTables(props.metaTables))

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
  tables: TableWithContext[]
  visualizationSettings: PropsUIPromptConsentFormVisualization[]
  locale: string
  handleDelete: (tableId: string, rowIds: string[]) => void
  handleUndo: (tableId: string) => void
}

const TablesAndVisualizations = ({ tables, visualizationSettings, locale, handleDelete, handleUndo }: TablesAndVisualizationsProps): JSX.Element => {
  return (
    <div className="grid gap-8 max-w-full">
      {tables.map((table) => {
        return (
          <div key={table.id} className="flex flex-col gap-4 mb-4">
            <Title4 text={table.title} margin="" />
            <div className="flex flex-wrap gap-4">
              <Minimizable>
                <Table {...table} locale={locale} handleDelete={handleDelete} handleUndo={handleUndo} />
              </Minimizable>
              {visualizationSettings.map((vs) => {
                if (vs.table_id !== table.id) return null
                if (vs.position !== 'table') return null
                return (
                  <Minimizable key={vs.id}>
                    <Figure table={table} visualizationSettings={vs} locale={locale} handleDelete={handleDelete} handleUndo={handleUndo} />
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
