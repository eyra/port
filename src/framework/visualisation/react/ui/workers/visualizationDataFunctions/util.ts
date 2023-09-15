import { PropsUITable, TableContext } from '../../../../../types/elements'
import { DateFormat } from '../../../../../types/visualizations'

export function autoFormatDate (dateNumbers: number[], minValues: number): DateFormat {
  const minTime = Math.min(...dateNumbers)
  const maxTime = Math.max(...dateNumbers)

  let autoFormat: DateFormat = 'hour'
  if (maxTime - minTime > 1000 * 60 * 60 * 24 * minValues) autoFormat = 'day'
  if (maxTime - minTime > 1000 * 60 * 60 * 24 * 30 * minValues) autoFormat = 'month'
  if (maxTime - minTime > 1000 * 60 * 60 * 24 * 30 * 3 * minValues) autoFormat = 'quarter'
  if (maxTime - minTime > 1000 * 60 * 60 * 24 * 365 * minValues) autoFormat = 'year'

  return autoFormat
}

export function formatDate (
  dateString: string[],
  format: DateFormat,
  minValues: number = 10
): [string[], number[] | null] {
  let formattedDate: string[] = dateString
  const dateNumbers = dateString.map((date) => new Date(date).getTime())
  let sortableDate: number[] | null = null

  if (format === 'auto') format = autoFormatDate(dateNumbers, minValues)

  if (format === 'year') {
    formattedDate = dateNumbers.map((date) => new Date(date).getFullYear().toString())
    sortableDate = dateNumbers
  }
  if (format === 'quarter') {
    formattedDate = dateNumbers.map((date) => {
      const year = new Date(date).getFullYear().toString()
      const quarter = Math.floor(new Date(date).getMonth() / 3) + 1
      return `${year}-Q${quarter}`
    })
    sortableDate = dateNumbers
  }
  if (format === 'month') {
    formattedDate = dateNumbers.map((date) => {
      const year = new Date(date).getFullYear().toString()
      const month = new Date(date).toLocaleString('default', { month: 'short' })
      return year + '-' + month
    })
    sortableDate = dateNumbers
  }
  if (format === 'day') {
    formattedDate = dateNumbers.map((date) => new Date(date).toISOString().split('T')[0])
    sortableDate = dateNumbers
  }
  if (format === 'hour') {
    formattedDate = dateNumbers.map(
      (date) => new Date(date).toISOString().split('T')[1].split(':')[0]
    )
    sortableDate = dateNumbers
  }
  if (format === 'month_cycle') {
    const formatter = new Intl.DateTimeFormat('default', { month: 'long' })
    formattedDate = dateNumbers.map((date) => formatter.format(new Date(date)))
    sortableDate = dateNumbers.map((date) => new Date(date).getMonth())
  }
  if (format === 'weekday_cycle') {
    const formatter = new Intl.DateTimeFormat('default', { weekday: 'long' })
    formattedDate = dateNumbers.map((date) => formatter.format(new Date(date)))
    sortableDate = dateNumbers.map((date) => new Date(date).getDay())
  }
  if (format === 'day_cycle') {
    const formatter = new Intl.DateTimeFormat('default', { day: 'numeric' })
    formattedDate = dateNumbers.map((date) => formatter.format(new Date(date)))
    sortableDate = dateNumbers.map((date) => new Date(date).getDay())
  }
  if (format === 'hour_cycle') {
    const formatter = new Intl.DateTimeFormat('default', { hour: 'numeric' })
    formattedDate = dateNumbers.map((date) => formatter.format(new Date(date)))
    sortableDate = dateNumbers.map((date) => new Date(date).getHours())
  }

  return [formattedDate, sortableDate]
}

export function tokenize (text: string): string[] {
  const tokens = text.split(' ')
  return tokens.filter((token) => /\p{L}/giu.test(token)) // only tokens with word characters
}

export function getTableColumn (table: PropsUITable & TableContext, column: string): string[] {
  const columnIndex = table.head.cells.findIndex((cell) => cell.text === column)
  if (columnIndex < 0) throw new Error(`column ${table.id}.${column} not found`)
  return table.body.rows.map((row) => row.cells[columnIndex].text)
}

export function rescaleToRange (
  value: number,
  min: number,
  max: number,
  newMin: number,
  newMax: number
): number {
  return ((value - min) / (max - min)) * (newMax - newMin) + newMin
}
