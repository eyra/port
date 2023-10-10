import { Text } from '@visx/text'
import Wordcloud from '@visx/wordcloud/lib/Wordcloud'
import { ParentSize } from '@visx/responsive'
import { TextVisualizationData } from '../../../../../types/visualizations'
import { useMemo } from 'react'

interface Props {
  visualizationData: TextVisualizationData
}

function VisxWordcloud ({ visualizationData }: Props): JSX.Element | null {
  const fontRange = [12, 60]
  const colors = ['#1E3FCC', '#4272EF', '#CC9F3F', '#FFCF60']
  const nWords = 100

  const words = useMemo(() => {
    return visualizationData.topTerms.slice(0, nWords)
  }, [visualizationData, nWords])

  return (
    <ParentSize>
      {(parent) => (
        <Wordcloud
          words={words}
          height={parent.height}
          width={parent.width}
          rotate={0}
          padding={3}
          spiral='rectangular'
          fontSize={(w) => w.importance * (fontRange[1] - fontRange[0]) + fontRange[0]}
          random={() => 0.5}
        >
          {(cloudWords) => {
            return cloudWords.map((w, i: number) => {
              return (
                <Text
                  key={w.text}
                  fill={colors[Math.floor((i / cloudWords.length) * colors.length)]}
                  fontSize={w.size}
                  textAnchor='middle'
                  fontFamily={w.font}
                  transform={`translate(${w.x ?? 0}, ${w.y ?? 0}) rotate(${w.rotate ?? 0})`}
                >
                  {w.text}
                </Text>
              )
            })
          }}
        </Wordcloud>
      )}
    </ParentSize>
  )
}

export default VisxWordcloud
