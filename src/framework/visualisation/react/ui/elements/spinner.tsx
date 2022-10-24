import SpinnerSvg from '../../../../../assets/images/spinner.svg'
import { Weak } from '../../../../helpers'
import { Translator } from '../../../../translator'
import { PropsUISpinner } from '../../../../types/elements'
import { ReactFactoryContext } from '../../factory'

interface Copy {
  text: string
}

function prepareCopy ({ text, locale }: Props): Copy {
  return {
    text: Translator.translate(text, locale)
  }
}

type Props = Weak<PropsUISpinner> & ReactFactoryContext

export const Spinner = (props: Props): JSX.Element => {
  const { text } = prepareCopy(props)

  return (
    <div id='spinner' className='flex flex-row items-center gap-4'>
      <div className='font-body text-bodymedium text-grey1'>{text}</div>
      <div className='w-10 h-10'>
        <img src={SpinnerSvg} />
      </div>
    </div>
  )
}
