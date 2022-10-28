import { Weak } from '../../../../helpers'
import TextBundle from '../../../../text_bundle'
import { Translator } from '../../../../translator'
import { PropsUIPageStart } from '../../../../types/pages'
import { ReactFactoryContext } from '../../factory'
import { PrimaryButton } from '../elements/button'
import { BodyLarge, Title0 } from '../elements/text'

type Props = Weak<PropsUIPageStart> & ReactFactoryContext

export const StartPage = (props: Props): JSX.Element => {
  const { resolve } = props
  const { title, description, startButton } = prepareCopy(props)

  function handleStart (): void {
    resolve?.({ __type__: 'PayloadVoid', value: undefined })
  }

  return (
    <>
      <Title0 text={title} />
      <BodyLarge text={description} />
      <div className='flex flex-row gap-4'>
        <PrimaryButton label={startButton} onClick={handleStart} />
      </div>
    </>
  )
}

interface Copy {
  title: string
  description: string
  startButton: string
}

function prepareCopy ({ locale }: Props): Copy {
  return {
    title: Translator.translate(title, locale),
    description: Translator.translate(description, locale),
    startButton: Translator.translate(startButtonLabel, locale)
  }
}

const title = new TextBundle()
  .add('en', 'Instructions')
  .add('nl', 'Instructies')

const startButtonLabel = new TextBundle()
  .add('en', 'Start')
  .add('nl', 'Start')

const description = new TextBundle()
  .add('en', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
  .add('nl', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
