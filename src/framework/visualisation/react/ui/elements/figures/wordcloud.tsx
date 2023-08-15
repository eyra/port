import ReactWordcloud from 'react-wordcloud'
import { VisualizationData } from '../../../../../types/visualizations'
import { useMemo, useState } from 'react'

interface Props {
  visualizationData: VisualizationData
}

export default function Wordcloud({ visualizationData }: Props): JSX.Element | null {
  const [options] = useState<any>({
    rotations: 2,
    rotationAngles: [0],
    scale: 'sqrt',
    fontSizes: [10, 50],
    enableTooltip: true,
    deterministic: true,
    tooltipOptions: {
      theme: 'wordcloud'
    },
    colors: ['#4272EF', '#FFCF60', '#1E3FCC', '#CC9F3F']
  })

  const words = useMemo(() => {
    const words = []
    for (let row of visualizationData.data) {
      const text = row[visualizationData?.xKey.label] as string
      let value = 0
      for (let yKey of Object.values(visualizationData.yKeys)) {
        value += Number(row[yKey.label]) || 0
      }
      words.push({ text, value })
    }

    return words.sort((a, b) => b.value - a.value).slice(0, 50)
  }, [visualizationData])

  return <ReactWordcloud words={words} options={options} />
}
