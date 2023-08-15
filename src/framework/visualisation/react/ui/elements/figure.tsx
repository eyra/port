import { TableWithContext } from '../../../../types/elements'

import TextBundle from '../../../../text_bundle'
import { Translator } from '../../../../translator'
import { VisualizationType, VisualizationData } from '../../../../types/visualizations'

import { useMemo } from 'react'

import { ReactFactoryContext } from '../../factory'

import useVisualizationData from '../hooks/useVisualizationData'
import { Title6 } from './text'

import Lottie from 'lottie-react'
import spinnerDark from '../../../../../assets/lottie/spinner-dark.json'
import RechartsGraph from './figures/recharts_graph'
import Wordcloud from './figures/wordcloud'

type Props = VisualizationProps & ReactFactoryContext

export interface VisualizationProps {
  table: TableWithContext
  visualization: VisualizationType
  locale: string
  handleDelete: (rowIds: string[]) => void
  handleUndo: () => void
}

export const Figure = ({
  table,
  visualization,
  locale,
  handleDelete,
  handleUndo
}: Props): JSX.Element => {
  const [visualizationData, status] = useVisualizationData(table, visualization)

  const { title } = useMemo(() => {
    const title = Translator.translate(visualization.title, locale)
    return { title }
  }, [visualization])

  const { errorMsg, noDataMsg } = prepareCopy(locale)

  if (!visualizationData && status === 'loading')
    return (
      <div className={`w-12 h-12`}>
        <Lottie animationData={spinnerDark} loop />
      </div>
    )

  if (status === 'error')
    return <div className="flex justify-center items-center text-error">{errorMsg}</div>

  const minHeight = visualization.height ? visualization.height + 'px' : `20rem`

  return (
    <div className="flex flex-col overflow-hidden">
      <Title6 text={title} margin="mt-2 mb-4" />
      <div
        className={`relative z-50 flex max-w-full`}
        style={{ flex: `1 1 ${minHeight}`, minHeight }}
      >
        {visualizationData?.data.length === 0 ? (
          <div className="m-auto font-bodybold text-4xl text-grey2 ">{noDataMsg}</div>
        ) : (
          <RenderVisualization visualizationData={visualizationData} />
        )}
      </div>
    </div>
  )
}

const RenderVisualization = ({
  visualizationData
}: {
  visualizationData: VisualizationData | undefined
}): JSX.Element | null => {
  if (!visualizationData) return null

  if (['line', 'bar', 'area'].includes(visualizationData.type))
    return <RechartsGraph visualizationData={visualizationData} />

  if (visualizationData.type === 'wordcloud')
    return <Wordcloud visualizationData={visualizationData} />
  return null
}

function prepareCopy(locale: string): Record<string, string> {
  return {
    errorMsg: Translator.translate(errorMsg, locale),
    noDataMsg: Translator.translate(noDataMsg, locale)
  }
}

const noDataMsg = new TextBundle().add('en', 'No data').add('nl', 'Geen data')

const errorMsg = new TextBundle()
  .add('en', 'Could not create visualization')
  .add('nl', 'Kon visualisatie niet maken')
