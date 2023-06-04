import { Weak } from '../../../../helpers'
import { ReactFactoryContext } from '../../factory'
import { PropsUIDataVisualization } from '../../../../types/data_visualization'

type Props = Weak<PropsUIDataVisualization> & ReactFactoryContext

export const DataVisualization = (props: Props): JSX.Element => {
  console.log(props)

  return <>test this</>
}
