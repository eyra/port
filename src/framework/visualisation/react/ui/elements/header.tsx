import { Weak } from '../../../../helpers'
import { Translator } from '../../../../translator'
import { PropsUIHeader } from '../../../../types/elements'
import { ReactFactoryContext } from '../../factory'
import { Title0 } from './text'

interface Copy {
  title: string
}

type Props = Weak<PropsUIHeader> & ReactFactoryContext

function prepareCopy ({ title, locale }: Props): Copy {
  return {
    title: Translator.translate(title, locale)
  }
}

export const Header = (props: Props): JSX.Element => {
  const { title } = prepareCopy(props)

  return (
    <Title0 text={title} />
  )
}
