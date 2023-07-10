import { PropsUITable, TableContext, TableWithContext } from '../../../../types/elements'
import { VisualizationData, VisualizationType, DateFormat, TickerFormat } from '../../../../types/visualizations'

interface Input {
  table: TableWithContext
  visualization: VisualizationType
}

self.onmessage = (e: MessageEvent<Input>) => {
  createVisualizationData(e.data.table, e.data.visualization)
    .then((visualizationData) => {
      self.postMessage({ status: 'success', visualizationData })
    })
    .catch((error) => {
      console.error(error)
      self.postMessage({ status: 'error', visualizationData: undefined })
    })
}

async function createVisualizationData(table: PropsUITable & TableContext, visualization: VisualizationType): Promise<VisualizationData> {
  const visualizationData: VisualizationData = {
    type: visualization.type,
    xKey: { label: visualization.x.label || visualization.x.column },
    yKeys: {},
    data: []
  }

  // First get the unique values of the x column
  const rowIds = table.body.rows.map((row) => row.id)
  let x = getTableColumn(table, visualization.x.column)
  if (!x || x.length === 0) throw new Error(`X column ${table.id}.${visualization.x.column} not found`)
  let xSortable: (string | number)[] | null = null // separate variable allows using epoch time for sorting dates

  // ADD CODE TO TRANSFORM TO DATE, BUT THEN ALSO KEEP AN INDEX BASED ON THE DATE ORDER
  if (visualization.dateFormat) {
    ;[x, xSortable] = formatDate(x, visualization.dateFormat)
  }

  const aggregate: Record<string, any> = {}
  for (let y of visualization.ys) {
    const aggFun = y.aggregate || 'count'
    let tickerFormat: TickerFormat = 'default'
    if (aggFun === 'pct' || aggFun === 'count_pct') tickerFormat = 'percent'

    const yValues = getTableColumn(table, y.column)
    if (!yValues) throw new Error(`Y column ${table.id}.${y.column} not found`)

    // If group_by column is specified, the columns in the aggregated data will be the unique group_by columns
    const yGroup = y.group_by ? getTableColumn(table, y.group_by) : null

    // if missing values should be treated as zero, we need to add the missing values after knowing all groups
    const addZeroes = !!y.addZeroes
    const groupSummary: Record<string, any> = {}
    const uniqueGroups = new Set<string>([])

    for (let i = 0; i < x.length; i++) {
      const xValue = x[i]
      const yValue = yValues[i]
      const group = yGroup ? yGroup[i] : y.label || y.column
      if (addZeroes) uniqueGroups.add(group)
      const sortBy = xSortable ? xSortable[i] : x[i]

      // calculate group summary statistics. This is used for the mean, pct and count_pct aggregations
      if (!groupSummary[group]) groupSummary[group] = { n: 0, sum: 0 }
      if (aggFun === 'count_pct' || aggFun === 'mean') groupSummary[group].n += 1
      if (aggFun === 'pct') groupSummary[group].sum += Number(yValue) || 0

      // add the AxisSettings for the yKeys in this loop, because we need to get the unique group values from the data (if group_by is used)
      if (!visualizationData.yKeys[group]) visualizationData.yKeys[group] = { label: group, secondAxis: !!y.secondAxis, tickerFormat }

      if (!aggregate[xValue]) aggregate[xValue] = { __rowIds: {}, __sortBy: sortBy, [visualizationData.xKey.label]: xValue }
      if (!aggregate[xValue].__rowIds[group]) aggregate[xValue].__rowIds[group] = []
      aggregate[xValue].__rowIds[group].push(rowIds[i])

      if (!aggregate[xValue][group]) aggregate[xValue][group] = 0
      if (aggFun === 'count' || aggFun === 'count_pct') aggregate[xValue][group] += 1
      if (aggFun === 'sum' || aggFun === 'mean' || aggFun === 'pct') aggregate[xValue][group] += Number(yValue) || 0
    }

    Object.keys(groupSummary).forEach((group) => {
      for (let xValue of Object.keys(aggregate)) {
        if (!aggregate[xValue][group]) {
          if (addZeroes) aggregate[xValue][group] = 0
          else continue
        }
        if (aggFun === 'mean') aggregate[xValue][group] = aggregate[xValue][group] / groupSummary[group].n
        if (aggFun === 'count_pct') aggregate[xValue][group] = (100 * aggregate[xValue][group]) / groupSummary[group].n
        if (aggFun === 'pct') aggregate[xValue][group] = (100 * aggregate[xValue][group]) / groupSummary[group].sum
        aggregate[xValue][group] = Number(aggregate[xValue][group].toFixed(2))
      }
    })
  }

  visualizationData.data = Object.values(aggregate).sort((a: any, b: any) => (a.__sortBy < b.__sortBy ? -1 : b.sortBy < a.sortBy ? 1 : 0))
  return visualizationData
}

function autoFormatDate(dateNumbers: number[], minValues: number): DateFormat {
  const minTime = Math.min(...dateNumbers)
  const maxTime = Math.max(...dateNumbers)

  let autoFormat: DateFormat = 'hour'
  if (maxTime - minTime > 1000 * 60 * 60 * 24 * minValues) autoFormat = 'day'
  if (maxTime - minTime > 1000 * 60 * 60 * 24 * 30 * minValues) autoFormat = 'month'
  if (maxTime - minTime > 1000 * 60 * 60 * 24 * 30 * 3 * minValues) autoFormat = 'quarter'
  if (maxTime - minTime > 1000 * 60 * 60 * 24 * 365 * minValues) autoFormat = 'year'

  return autoFormat
}

function formatDate(dateString: string[], format: DateFormat, minValues: number = 10): [string[], number[] | null] {
  let formattedDate: string[] = dateString
  let dateNumbers = dateString.map((date) => new Date(date).getTime())
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
      return year + '-Q' + quarter
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
    formattedDate = dateNumbers.map((date) => new Date(date).toISOString().split('T')[1].split(':')[0])
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

function getTableColumn(table: PropsUITable & TableContext, column: string): string[] | undefined {
  const columnIndex = table.head.cells.findIndex((cell) => cell.text === column)
  if (columnIndex >= 0) return table.body.rows.map((row) => row.cells[columnIndex].text)
  return undefined
}

export {}
