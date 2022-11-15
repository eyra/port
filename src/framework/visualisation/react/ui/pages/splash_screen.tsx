import React from 'react'
import { Weak } from '../../../../helpers'
import TextBundle from '../../../../text_bundle'
import { Translator } from '../../../../translator'
import { PropsUIPageSplashScreen } from '../../../../types/pages'
import { ReactFactoryContext } from '../../factory'
import { PrimaryButton } from '../elements/button'
import { CheckBox } from '../elements/check_box'
import { BodyLarge, Label, Title0 } from '../elements/text'

interface Copy {
  title: string
  description: string
  continueButton: string
  privacyLabel: string
}

type Props = Weak<PropsUIPageSplashScreen> & ReactFactoryContext

function prepareCopy ({ locale }: Props): Copy {
  return {
    title: Translator.translate(title, locale),
    description: Translator.translate(description, locale),
    continueButton: Translator.translate(continueButton, locale),
    privacyLabel: Translator.translate(privacyLabel, locale)
  }
}

export const SplashScreen = (props: Props): JSX.Element => {
  const [checked, setChecked] = React.useState<boolean>(false)
  const [waiting, setWaiting] = React.useState<boolean>(false)
  const { title, description, continueButton, privacyLabel } = prepareCopy(props)
  const { resolve } = props

  function handleContinue (): void {
    if (checked && !waiting) {
      setWaiting(true)
      resolve?.({ __type__: 'PayloadVoid', value: undefined })
    }
  }

  function handleCheck (): void {
    setChecked(true)
  }

  return (
    <>
      <Title0 text={title} />
      <BodyLarge text={description} />
      <div className='flex flex-col gap-8'>
        <div className='flex flex-row gap-4 items-center'>
          <CheckBox id='0' selected={checked} onSelect={() => handleCheck()} />
          <Label text={privacyLabel} />
        </div>
        <div className={`flex flex-row gap-4 ${checked ? '' : 'opacity-30'}`}>
          <PrimaryButton label={continueButton} onClick={handleContinue} enabled={checked} spinning={waiting} />
        </div>
      </div>
    </>
  )
}

const title = new TextBundle()
  .add('en', 'Welcome')
  .add('nl', 'Welkom')

const description = new TextBundle()
  .add('en', 'This way you can donate your data to the University of Amsterdam. The data we ask you to donate can be used to research… . We explain step by step what is expected of you. No data is saved or sent during these steps. The data is only saved when you are asked whether you want to send the data. Thank you in advance.')
  .add('nl', 'U kunt zo uw gegevens gaan doneren aan de universiteit van Amsterdam. De gegevens die we u vragen te doneren kunnen worden gebruikt om te onderzoeken … . We leggen u stap voor stap uit wat er van u verwacht wordt. Tijdens deze stappen worden geen gegevens opgeslagen of verstuurd. Pas als u de vraag krijgt of u de gegevens wilt versturen, worden de gegevens opgeslagen. Alvast hartelijk dank.')

const continueButton = new TextBundle()
  .add('en', 'Continue')
  .add('nl', 'Ga verder')

const privacyLabel = new TextBundle()
  .add('en', 'I have read and agree to the privacy conditions.')
  .add('nl', 'Ik heb de privacy voorwaarden gelezen en ben hiermee akkoord.')
