import { useMemo } from 'react'
import TextBundle from '../../../../text_bundle'
import { Translator } from '../../../../translator'
import { TableWithContext } from '../../../../types/elements'

interface Props {
  table: TableWithContext
  searchedTable: TableWithContext
  locale: string
}

export const TableItems = ({ table, searchedTable, locale }: Props): JSX.Element => {
  const text = useMemo(() => getTranslations(locale), [locale])

  const deleted = table.deletedRowCount
  const n = table.body.rows.length
  const searched = searchedTable.body.rows.length
  const total = table.originalBody.rows.length - table.deletedRowCount

  const nLabel = n.toLocaleString(locale, { useGrouping: true })
  const totalLabel = total.toLocaleString(locale, { useGrouping: true })
  const searchLabel = searched.toLocaleString(locale, { useGrouping: true })
  const deletedLabel = deleted.toLocaleString('en', { useGrouping: true }) + ' ' + text.deleted

  return (
    <div className='flex  min-w-[200px] gap-1'>
      <div className='flex items-center  '>{tableIcon}</div>
      <div
        key={`${totalLabel}_${deleted}`}
        className='flex flex-wrap items-center pl-2  gap-x-2 animate-fadeIn text-lg text-title6 font-label '
      >
        <div>
          {table.head.cells.length} {text.columns},
        </div>
        <div key={totalLabel} className='animate-fadeIn'>
          {searched < n ? searchLabel + ' / ' + nLabel : nLabel} {text.rows}
        </div>

        <div className={`flex text-grey2 ${deleted > 0 ? '' : 'hidden'}`}>({deletedLabel})</div>
      </div>
    </div>
  )
}

const tableIcon = (
  <svg className='h-9' viewBox='4 4 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <rect x='9' y='9' width='4' height='2' fill='#4272EF' />
    <rect x='9' y='13' width='4' height='2' fill='#4272EF' />
    <rect x='9' y='17' width='4' height='2' fill='#4272EF' />
    <rect x='15' y='9' width='4' height='2' fill='#4272EF' />
    <rect x='15' y='13' width='4' height='2' fill='#4272EF' />
    <rect x='15' y='17' width='4' height='2' fill='#4272EF' />
    <rect x='4' y='4' width='15' height='3' fill='#4272EF' />
    <rect x='4' y='9' width='3' height='10' fill='#4272EF' />
  </svg>
)

function getTranslations (locale: string): Record<string, string> {
  const translated: Record<string, string> = {}
  for (const [key, value] of Object.entries(translations)) {
    translated[key] = Translator.translate(value, locale)
  }
  return translated
}

const translations = {
  columns: new TextBundle().add('en', 'columns').add('nl', 'kolommen'),
  rows: new TextBundle().add('en', 'rows').add('nl', 'rijen'),
  deleted: new TextBundle().add('en', 'deleted').add('nl', 'verwijderd')
}
