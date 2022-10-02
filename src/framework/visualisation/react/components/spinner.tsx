import Translatable from '../../../translatable'
import SpinnerSvg from '../../../../assets/images/spinner.svg'

export interface SpinnerProps {
  locale: string
}

interface Copy {
  text: string
}

function prepareCopy ({ texts, locale }: any): Copy {
  return {
    text: texts.text(locale)
  }
}

const texts = (): Translatable => {
  return new Translatable()
    .add('en', 'One moment please')
    .add('nl', 'Een moment geduld')
}

export const SpinnerFactory = (props: SpinnerProps): JSX.Element => <Spinner {...props} />

export const Spinner = (props: SpinnerProps): JSX.Element => {
  const { text } = prepareCopy({ texts: texts(), ...props })

  return (
    <div id='spinner' className='flex flex-row items-center gap-4'>
      <div className='font-body text-bodymedium text-grey1'>{text}</div>
      <div className='w-10 h-10'>
        <img src={SpinnerSvg} />
      </div>
    </div>
  )
}
