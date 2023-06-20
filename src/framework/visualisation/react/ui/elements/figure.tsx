import { PropsUITable, TableContext, PropsUIDataVisualization } from '../../../../types/elements'
import { ReactFactoryContext } from '../../factory'

type Props = Tables & PropsUIDataVisualization & ReactFactoryContext
type Tables = Array<PropsUITable & TableContext>

export const Figure = (props: Props): JSX.Element => {
  console.log(props)
  return <></>
}
