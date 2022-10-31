import * as React from 'react'
import { Weak } from '../../../../helpers'
import { PropsUIRadioItem, Translatable } from '../../../../types/elements'
import TextBundle from '../../../../text_bundle'
import { Translator } from '../../../../translator'
import { ReactFactoryContext } from '../../factory'
import { PropsUIPromptRadioInput } from '../../../../types/prompts'
import { RadioItem } from '../elements/radio_item'

interface Copy {
  title: string
  description: string
  continueButton: string
}

type Props = Weak<PropsUIPromptRadioInput> & ReactFactoryContext

function prepareCopy ({ title, description, locale }: Props): Copy {
  return {
    title: Translator.translate(title, locale),
    description: Translator.translate(description, locale),
    continueButton: Translator.translate(continueButtonLabel(), locale)
  }
}

export const RadioInput = (props: Props): JSX.Element => {
  const [selectedId, setSelectedId] = React.useState<number>(-1)
  const [confirmHidden, setConfirmHidden] = React.useState<boolean>(true)

  const { items, resolve } = props
  const { title, description, continueButton } = prepareCopy(props)

  function handleSelect (id: number): void {
    setSelectedId(id)
    setConfirmHidden(false)
  }

  function handleConfirm (): void {
    const item = items.at(selectedId)
    if (item !== undefined) {
      resolve?.({ __type__: 'PayloadString', value: item.value })
    }
  }

  function renderItems (items: PropsUIRadioItem[]): JSX.Element[] {
    return items.map((item, index) => <RadioItem key={index} onSelect={() => handleSelect(index)} id={index} value={item.value} selected={selectedId === index} />)
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
            {renderItems(items)}
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
  return new TextBundle()
    .add('en', 'Continue')
    .add('nl', 'Doorgaan')
}
