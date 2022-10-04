import Translatable from '../../../translatable'
import { Table } from './table'
import { PrimaryButton, SecondaryButton } from './button'
import { Title2 } from './text'

export interface EndOfFlowProps {
  title: string
  data: any[]
  locale: string
  resolve: (value: any) => void
}

interface Copy {
  donateButton: string
  declineButton: string
}

function prepareCopy ({ locale }: EndOfFlowProps): Copy {
  return {
    donateButton: donateButtonLabel().text(locale),
    declineButton: declineButtonLabel().text(locale)
  }
}

const donateButtonLabel = (): Translatable => {
  return new Translatable()
    .add('en', 'Yes, donate')
    .add('nl', 'Ja, doneer')
}

const declineButtonLabel = (): Translatable => {
  return new Translatable()
    .add('en', 'No')
    .add('nl', 'Nee')
}

export const EndOfFlowFactory = (props: EndOfFlowProps): JSX.Element => <EndOfFlow {...props} />

export const EndOfFlow = (props: EndOfFlowProps): JSX.Element => {
  const { title, data, resolve } = props
  const { donateButton, declineButton } = prepareCopy(props)

  function handleDonate (): void {
    resolve(JSON.stringify(data))
  }

  function handleDecline (): void {
    resolve(false)
  }

  function renderTable (table: any): JSX.Element {
    const id = table.id as string
    const dataFrame = JSON.parse(table.data_frame)

    // hideous, please rewrite if you can do this more elegantly
    const rowCount = Object.keys(dataFrame[Object.keys(dataFrame)[0]]).length

    const header = { cells: Object.keys(dataFrame) }
    const rows = []
    for (let i = 0; i <= rowCount; i++) {
      const cells = Object.keys(dataFrame).map((column: any) => dataFrame[column][`${i}`])
      rows.push({ cells: cells })
    }
    const body = { rows: rows }

    return (
      <Table key={id} id={id} header={header} body={body} />
    )
  }

  const tables = data.map((table) => renderTable(table))

  return (
    <>
      <Title2 text={title} />
      <div className='flex flex-col gap-4'>
        <div className='mb-4'>
          {tables}
        </div>
        <div className='flex flex-row gap-4'>
          <PrimaryButton label={donateButton} onClick={handleDonate} />
          <SecondaryButton label={declineButton} onClick={handleDecline} />
        </div>
      </div>
    </>
  )
}
