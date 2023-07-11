import { PropsUITableRow } from '../../../../types/elements'

interface Input {
  rows: PropsUITableRow[]
  query: string[]
}

self.onmessage = (e: MessageEvent<Input>) => {
  const ids = searchRows(e.data.rows, e.data.query)
  self.postMessage(ids)
}

function searchRows(rows: PropsUITableRow[], query: string[]): Set<string> | undefined {
  if (query.length === 0) return undefined
  const regexes: RegExp[] = []
  for (const q of query) regexes.push(new RegExp(q.replace(/[-/\\^$*+?.()|[\]{}]/, '\\$&'), 'i'))

  const ids = new Set<string>()
  outer: for (let row of rows) {
    for (let regex of regexes) {
      let anyCellMatches = false
      for (let cell of row.cells) {
        if (regex.test(cell.text)) {
          anyCellMatches = true
          break
        }
      }
      if (!anyCellMatches) continue outer
    }
    ids.add(row.id)
  }

  return ids
}

export {}
