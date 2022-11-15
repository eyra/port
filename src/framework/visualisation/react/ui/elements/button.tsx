import { Weak } from '../../../../helpers'
import { PropsUIButtonBack, PropsUIButtonForward, PropsUIButtonLabel, PropsUIButtonPrimary, PropsUIButtonSecundary } from '../../../../types/elements'

import BackSvg from '../../../../../assets/images/back.svg'
import ForwardSvg from '../../../../../assets/images/forward.svg'
import { Spinner } from './spinner'

function spinnerColor (buttonColor: string): string {
  if (buttonColor.includes('bg-tertiary')) {
    return 'dark'
  }
  return 'light'
}

export const PrimaryButton = ({ label, spinning = false, enabled = true, color = 'bg-primary text-white', onClick }: Weak<PropsUIButtonPrimary>): JSX.Element => {
  return (
    <div className='relative'>
      <div className={`pt-15px pb-15px pr-4 pl-4 leading-none font-button text-button rounded ${enabled ? 'cursor-pointer active:shadow-top4px active:pt-4 active:pb-14px' : ''} ${color}`} onClick={onClick}>
        <div id='confirm-button' className={`flex-wrap ${spinning ? 'opacity-0' : ''}`}>
          {label}
        </div>
      </div>
      <div className={`absolute top-0 h-full w-full flex flex-col justify-center items-center ${spinning ? '' : 'hidden'}`}>
        <div className='w-5 h-5'>
          <Spinner color={spinnerColor(color)} spinning={spinning} />
        </div>
      </div>
    </div>
  )
}

export const SecondaryButton = ({ label, color = 'bg-delete text-delete', onClick }: Weak<PropsUIButtonSecundary>): JSX.Element => {
  return (
    <div className={`pt-13px pb-13px active:pt-14px active:pb-3 active:shadow-top2px border-2 font-button text-button rounded bg-opacity-0 pr-4 pl-4 cursor-pointer ${color}`} onClick={onClick}>
      <div className='flex-wrap'>
        {label}
      </div>
    </div>
  )
}

export const BackButton = ({ label, onClick }: Weak<PropsUIButtonBack>): JSX.Element => {
  return (
    <div className='pt-1 pb-1 active:pt-5px active:pb-3px rounded bg-opacity-0 focus:outline-none cursor-pointer ' onClick={onClick}>
      <div className='flex items-center'>
        <div>
          <img className='mr-2 -mt-2px' src={BackSvg} alt={label} />
        </div>
        <div className='focus:outline-none'>
          <div className='flex flex-col justify-center h-full items-center'>
            <div className='flex-wrap text-button font-button text-grey1'>
              {label}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const ForwardButton = ({ label, onClick }: Weak<PropsUIButtonForward>): JSX.Element => {
  return (
    <div className='pt-1 pb-1 active:pt-5px active:pb-3px rounded bg-opacity-0 focus:outline-none cursor-pointer ' onClick={onClick}>
      <div className='flex items-center'>
        <div className='focus:outline-none'>
          <div className='flex flex-col justify-center h-full items-center'>
            <div className='flex-wrap text-button font-button text-grey1'>
              {label}
            </div>
          </div>
        </div>
        <div>
          <img className='ml-2 -mt-2px' src={ForwardSvg} alt={label} />
        </div>
      </div>
    </div>
  )
}

export const LabelButton = ({ label, color = 'text-grey1', onClick }: Weak<PropsUIButtonLabel>): JSX.Element => {
  return (
    <div className={`pt-15px pb-15px active:shadow-top4px active:pt-4 active:pb-14px leading-none font-button text-button rounded pr-4 pl-4 cursor-pointer bg-opacity-0 ${color}`} onClick={onClick}>
      <div id='confirm-button' className='flex-wrap'>
        {label}
      </div>
    </div>
  )
}
