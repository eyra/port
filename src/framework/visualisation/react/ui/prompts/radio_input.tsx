import * as React from 'react'
import { Weak } from '../../../../helpers'
import { PropsUIRadioItem, Translatable } from '../../../../types/elements'
import TextBundle from '../../../../text_bundle'
import { Translator } from '../../../../translator'
import { ReactFactoryContext } from '../../factory'
import { PropsUIPromptRadioInput } from '../../../../types/prompts'
import { RadioItem } from '../elements/radio_item'
import { PrimaryButton } from '../elements/button'

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
  const [continueActive, setContinueActive] = React.useState<boolean>(false)
  const [waiting, setWaiting] = React.useState<boolean>(false)

  const { items, resolve } = props
  const { title, description, continueButton } = prepareCopy(props)

  function handleSelect (id: number): void {
    setSelectedId(id)
    setContinueActive(true)
  }

  function handleConfirm (): void {
    if (selectedId > -1) {
      const item = items.at(selectedId)
      if (item !== undefined) {
        resolve?.({ __type__: 'PayloadString', value: item.value })
      }
      setWaiting(true)
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
      <div className='mt-4' />
      <div className={`${selectedId === -1 ? 'opacity-30' : 'opacity-100'}`}>
        <div className='mt-8' />
        <div className='flex flex-row gap-4'>
          <PrimaryButton label={continueButton} onClick={handleConfirm} enabled={continueActive} spinning={waiting} />
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
