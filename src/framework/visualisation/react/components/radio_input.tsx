import * as React from 'react'
import Translatable from '../../../translatable'
import RadioSvg from '../../../../assets/images/radio.svg'
import RadioActiveSvg from '../../../../assets/images/radio_active.svg'

export interface RadioInputProps {
  title: any
  description: any
  items: string[]
  locale: string
  resolve: (value: any) => void
}

interface Copy {
  title: string
  description: string
  continueButton: string
}

function prepareCopy ({ title, description, locale }: RadioInputProps): Copy {
  return {
    title: title.en,
    description: description.en,
    continueButton: continueButtonLabel().text(locale)
  }
}

export const RadioInputFactory = (props: RadioInputProps): JSX.Element => <RadioInput {...props} />

export const RadioInput = (props: RadioInputProps): JSX.Element => {
  const [selectedId, setSelectedId] = React.useState<number>(-1)
  const [confirmHidden, setConfirmHidden] = React.useState<boolean>(true)

  const { items, resolve } = props
  const { title, description, continueButton } = prepareCopy(props)

  function handleSelect (id: number): void {
    setSelectedId(id)
    setConfirmHidden(false)
  }

  function handleConfirm (): void {
    const value = items.at(selectedId)
    resolve(value)
  }

  return (
    <>
      <div className='text-title5 font-title5 sm:text-title4 sm:font-title4 lg:text-title3 lg:font-title3 text-grey1'>
        {title}
      </div>
      <div className='mt-8' />
      <div id='select-panel'>
        <div className='flex-wrap text-bodylarge font-body text-grey1 text-left'>
          {description}
        </div>
        <div className='mt-4' />
        <div>
          <div id='radio-group' className='flex flex-col gap-3'>
            {items.map((value, index) => <RadioItem key={index} onSelect={handleSelect} id={index} value={value} selected={selectedId === index} />)}
          </div>
        </div>
      </div>
      <div className='mt-8' />
      <div className={`flex flex-row ${confirmHidden ? 'hidden' : ''}`}>
        <div className='pt-15px pb-15px active:shadow-top4px active:pt-4 active:pb-14px leading-none font-button text-button rounded pr-4 pl-4 bg-primary text-white cursor-pointer' onClick={handleConfirm}>
          <div id='confirm-button' className='flex-wrap'>
            {continueButton}
          </div>
        </div>
      </div>
    </>
  )
}

const continueButtonLabel = (): Translatable => {
  return new Translatable()
    .add('en', 'Continue')
    .add('nl', 'Doorgaan')
}

export interface RadioItemProps {
  id: number
  value: string
  selected: boolean
  onSelect: (id: number) => void
}

export const RadioItem = ({ id, value, selected, onSelect }: RadioItemProps): JSX.Element => {
  return (
    <div id={`${id}`} className='radio-item flex flex-row gap-3 items-center cursor-pointer' onClick={() => onSelect(id)}>
      <div>
        <img src={RadioSvg} id={`${id}-off`} className={selected ? 'hidden' : ''} />
        <img src={RadioActiveSvg} id={`${id}-on`} className={selected ? '' : 'hidden'} />
      </div>
      <div className='text-grey1 text-label font-label select-none mt-1'>
        {value}
      </div>
    </div>
  )
}
