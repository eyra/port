import { PropsUITable, TableWithContext, TableContext } from '../../../../types/elements'
import { VisualizationType, VisualizationData, DateFormat, AxisSettings } from '../../../../types/visualizations'
import React, { useEffect, useState } from 'react'

type Status = 'success' | 'error' | 'loading'

export default function useVisualizationData(table: TableWithContext, visualization: VisualizationType): [VisualizationData | undefined, Status] {
  const [visualizationData, setVisualizationData] = useState<VisualizationData>()
  const [status, setStatus] = useState<Status>('loading')

  useEffect(() => {
    setStatus('loading')
    createVisualizationData(table, visualization)
      .then((visualizationData) => {
        setStatus('success')
        setVisualizationData(visualizationData)
      })
      .catch((e) => {
        console.error(e)
        setStatus('error')
        setVisualizationData(undefined)
      })
  }, [table, visualization])

  return [visualizationData, status]
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
  let xSortable: (string | number)[] = x // separate variable allows using epoch time for sorting dates

  // ADD CODE TO TRANSFORM TO DATE, BUT THEN ALSO KEEP AN INDEX BASED ON THE DATE ORDER
  if (visualization.dateFormat) {
    ;[x, xSortable] = formatDate(x, visualization.dateFormat)
  }

  const aggregate: Record<string, any> = {}
  for (let y of visualization.ys) {
    const aggFun = y.aggregate || 'count'
    const yValues = getTableColumn(table, y.column)
    if (!yValues) throw new Error(`Y column ${table.id}.${y.column} not found`)

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

    // if missing values should be treated as zero, we need to add the missing values after knowing all groups
    const addZeroes = !!y.addZeroes
    const uniqueGroups = new Set<string>([])

    for (let i = 0; i < x.length; i++) {
      const xValue = x[i]
      const yValue = yValues[i]
      const group = yGroup ? yGroup[i] : y.label || y.column
      if (addZeroes) uniqueGroups.add(group)
      const sortBy = xSortable ? xSortable[i] : x[i]
      const n = groupN[group] || 1

      // add the AxisSettings for the yKeys in this loop, because we need to get the unique group values from the data (if group_by is used)
      if (!visualizationData.yKeys[group]) visualizationData.yKeys[group] = { label: group, secondAxis: y.secondAxis }

      if (!aggregate[xValue]) aggregate[xValue] = { __rowIds: {}, __sortBy: sortBy, [visualizationData.xKey.label]: xValue }
      if (!aggregate[xValue].__rowIds[group]) aggregate[xValue].__rowIds[group] = []
      aggregate[xValue].__rowIds[group].push(rowIds[i])

      if (!aggregate[xValue][group]) aggregate[xValue][group] = 0
      if (aggFun === 'count') aggregate[xValue][group] += 1
      if (aggFun === 'count_pct') aggregate[xValue][group] += 100 / n
      if (aggFun === 'sum') aggregate[xValue][group] += Number(yValue) || 0
      if (aggFun === 'mean') aggregate[xValue][group] += (Number(yValue) || 0) / n
    }

    if (addZeroes) {
      uniqueGroups.forEach((group) => {
        for (let xValue of Object.keys(aggregate)) {
          if (!aggregate[xValue][group]) aggregate[xValue][group] = 0
        }
      })
    }
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

function formatDate(dateString: string[], format: DateFormat, minValues: number = 10): [string[], number[]] {
  let formattedDate: string[] = dateString
  let dateNumbers = dateString.map((date) => new Date(date).getTime())

  if (format === 'auto') format = autoFormatDate(dateNumbers, minValues)

  if (format === 'year') {
    formattedDate = dateNumbers.map((date) => new Date(date).getFullYear().toString())
    return [formattedDate, dateNumbers]
  }
  if (format === 'quarter') {
    formattedDate = dateNumbers.map((date) => {
      const year = new Date(date).getFullYear().toString()
      const quarter = Math.floor(new Date(date).getMonth() / 3) + 1
      return year + '-Q' + quarter
    })
    return [formattedDate, dateNumbers]
  }
  if (format === 'month') {
    formattedDate = dateNumbers.map((date) => {
      const year = new Date(date).getFullYear().toString()
      const month = new Date(date).toLocaleString('default', { month: 'short' })
      return year + '-' + month
    })
    return [formattedDate, dateNumbers]
  }
  if (format === 'day') {
    formattedDate = dateNumbers.map((date) => new Date(date).toISOString().split('T')[0])
    return [formattedDate, dateNumbers]
  }
  if (format === 'hour') {
    formattedDate = dateNumbers.map((date) => new Date(date).toISOString().split('T')[1].split(':')[0])
    return [formattedDate, dateNumbers]
  }
  if (format === 'month_cycle') {
    formattedDate = dateNumbers.map((date) => new Date(date).toLocaleString('default', { month: 'long' }))
    dateNumbers = dateNumbers.map((date) => new Date(date).getMonth())
  }
  if (format === 'day_cycle') {
    formattedDate = dateNumbers.map((date) => new Date(date).toLocaleString('default', { weekday: 'long' }))
    dateNumbers = dateNumbers.map((date) => new Date(date).getDay())
  }
  if (format === 'hour_cycle') {
    formattedDate = dateNumbers.map((date) => new Date(date).toLocaleString('default', { hour: 'numeric' }))
    dateNumbers = dateNumbers.map((date) => new Date(date).getHours())
  }

  return [formattedDate, dateNumbers]
}

function getTableColumn(table: PropsUITable & TableContext, column: string): string[] | undefined {
  const columnIndex = table.head.cells.findIndex((cell) => cell.text === column)
  if (columnIndex >= 0) return table.body.rows.map((row) => row.cells[columnIndex].text)
  return undefined
}
