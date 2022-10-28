import { Weak } from '../../../../helpers'
import { PropsUITable, PropsUITableCell, PropsUITableRow, Translatable } from '../../../../types/elements'
import { PropsUIPromptConsentForm } from '../../../../types/prompts'
import { Table } from '../elements/table'
import { PrimaryButton, SecondaryButton } from '../elements/button'
import { BodyLarge, Title1, Title2 } from '../elements/text'
import TextBundle from '../../../../text_bundle'
import { Translator } from '../../../../translator'
import { ReactFactoryContext } from '../../factory'

type Props = Weak<PropsUIPromptConsentForm> & ReactFactoryContext

export const ConsentForm = (props: Props): JSX.Element => {
  const { tables, resolve } = props
  const { title, description, donateButton, declineButton } = prepareCopy(props)

  function handleDonate (): void {
    resolve?.({ __type__: 'PayloadString', value: JSON.stringify(tables) })
  }

  function handleDecline (): void {
    resolve?.({ __type__: 'PayloadFalse', value: false })
  }

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
      return Object.keys(firstColumn).length
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

  function parse (tableData: any): PropsUITable {
    const id = tableData.id as string
    const dataFrame = JSON.parse(tableData.data_frame)
    const head = { cells: columnNames(dataFrame).map((column: string) => headCell(dataFrame, column)) }
    const body = { rows: rows(dataFrame) }

    return { __type__: 'PropsUITable', id, head, body }
  }

  function renderTable (tableData: any): JSX.Element {
    const title = tableData.title as string
    const tableProps = parse(tableData)

    return (
      <div key={tableProps.id} className='flex flex-col gap-2'>
        <Title2 text={title} />
        <Table {...tableProps} />
      </div>
    )
  }

  return (
    <>
      <Title1 text={title} />
      <BodyLarge text={description} />
      <div className='flex flex-col gap-8'>
        {tables.map((table) => renderTable(table))}
        <div className='flex flex-row gap-4 mt-2'>
          <PrimaryButton label={donateButton} onClick={handleDonate} />
          <SecondaryButton label={declineButton} onClick={handleDecline} />
        </div>
      </div>
    </>
  )
}

interface Copy {
  title: string
  description: string
  donateButton: string
  declineButton: string
}

function prepareCopy ({ title, description, locale }: Props): Copy {
  return {
    title: Translator.translate(title, locale),
    description: Translator.translate(description, locale),
    donateButton: Translator.translate(donateButtonLabel(), locale),
    declineButton: Translator.translate(declineButtonLabel(), locale)
  }
}

const donateButtonLabel = (): Translatable => {
  return new TextBundle()
    .add('en', 'Yes, donate')
    .add('nl', 'Ja, doneer')
}

const declineButtonLabel = (): Translatable => {
  return new TextBundle()
    .add('en', 'No')
    .add('nl', 'Nee')
}
