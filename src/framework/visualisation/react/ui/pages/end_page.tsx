import { Weak } from '../../../../helpers'
import { PropsUIPageEnd } from '../../../../types/pages'
import { ReactFactoryContext } from '../../factory'
import { Header } from '../elements/header'

type Props = Weak<PropsUIPageEnd> & ReactFactoryContext

export const EndPage = (props: Props): JSX.Element => {
  return (
    <Header {...props.header} locale={props.locale} />
  )
}
