import { Weak } from '../../../../helpers'
import TextBundle from '../../../../text_bundle'
import { Translator } from '../../../../translator'
import { PropsUIPageSplashScreen } from '../../../../types/pages'
import { ReactFactoryContext } from '../../factory'
import { Spinner } from '../elements/spinner'
import { BodyLarge, Title0 } from '../elements/text'

interface Copy {
  title: string
  description: string
}

type Props = Weak<PropsUIPageSplashScreen> & ReactFactoryContext

function prepareCopy ({ locale }: Props): Copy {
  return {
    title: Translator.translate(title, locale),
    description: Translator.translate(description, locale)
  }
}

export const SplashScreen = (props: Props): JSX.Element => {
  const { title, description } = prepareCopy(props)

  return (
    <>
      <Title0 text={title} />
      <BodyLarge text={description} />
      <Spinner text={spinnerText} {...props} />
    </>
  )
}
const title = new TextBundle()
  .add('en', 'Welcome')
  .add('nl', 'Welkom')

const description = new TextBundle()
  .add('en', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
  .add('nl', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')

const spinnerText = new TextBundle()
  .add('en', 'One moment please..')
  .add('nl', 'Een moment geduld..')
