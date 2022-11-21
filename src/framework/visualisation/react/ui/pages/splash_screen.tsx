import React from 'react'
import { Weak } from '../../../../helpers'
import TextBundle from '../../../../text_bundle'
import { Translator } from '../../../../translator'
import { PropsUIPageSplashScreen } from '../../../../types/pages'
import { ReactFactoryContext } from '../../factory'
import { PrimaryButton } from '../elements/button'
import { CheckBox } from '../elements/check_box'
import { BodyLarge, Label, Title1 } from '../elements/text'
import LogoSvg from '../../../../../assets/images/logo.svg'
import { Footer } from './templates/footer'
import { Page } from './templates/page'
import { Sidebar } from './templates/sidebar'
import { Bullet } from '../elements/bullet'

interface Copy {
  title: string
  continueButton: string
  privacyLabel: string
}

type Props = Weak<PropsUIPageSplashScreen> & ReactFactoryContext

function prepareCopy ({ locale }: Props): Copy {
  return {
    title: Translator.translate(title, locale),
    continueButton: Translator.translate(continueButton, locale),
    privacyLabel: Translator.translate(privacyLabel, locale)
  }
}

export const SplashScreen = (props: Props): JSX.Element => {
  const [checked, setChecked] = React.useState<boolean>(false)
  const [waiting, setWaiting] = React.useState<boolean>(false)
  const { title, continueButton, privacyLabel } = prepareCopy(props)
  const { locale, resolve } = props

  function handleContinue (): void {
    if (checked && !waiting) {
      setWaiting(true)
      resolve?.({ __type__: 'PayloadVoid', value: undefined })
    }
  }

  function handleCheck (): void {
    setChecked(true)
  }

  function renderDescription (): JSX.Element {
    if (locale === 'nl') return nlDescription
    return enDescription
  }

  const enDescription: JSX.Element = (
    <>
      <BodyLarge margin='mb-6' text='You are about to start the process of donating your data to Amsterdam University. The data that we ask you to donate can be used to research which interests are stored by various social media platforms. We will walk you through this process step by step. By participating in this process:' />
      <div className='flex flex-col gap-3 mb-10'>
        <Bullet>
          <BodyLarge margin='' text='I fully and voluntarily approve to donate the data that is presented on the screen for the research described above, after clicking donate.' />
        </Bullet>
        <Bullet>
          <BodyLarge margin='' text='I understand that my anonymity is fully guaranteed.' />
        </Bullet>
        <Bullet>
          <BodyLarge margin='' text='I understand that I have the right to withdraw my permission within 7 days.' />
        </Bullet>
      </div>
    </>
  )

  const nlDescription: JSX.Element = (
    <>
      <BodyLarge margin='mb-6' text='U kunt zo uw gegevens gaan doneren aan de universiteit van Amsterdam. De gegevens die we u vragen te doneren kunnen worden gebruikt om te onderzoeken welke interesses opgeslagen worden door verschillende social media platformen. We leggen u stap voor stap uit wat er van u verwacht wordt. Bij het doorlopen van de data donatie stappen:' />
      <div className='flex flex-col gap-3 mb-10'>
        <Bullet>
          <BodyLarge margin='' text='Geef ik volledig en vrijwillig toestemming om als ik op doneer klik, de data die op het scherm getoond wordt te doneren voor het hierboven beschreven onderzoek.' />
        </Bullet>
        <Bullet>
          <BodyLarge margin='' text='Geef ik aan te weten dat mijn anonimiteit hierbij volledig gegarandeerd is.' />
        </Bullet>
        <Bullet>
          <BodyLarge margin='' text='Geef ik aan te weten dat ik het recht heb om mijn toestemming binnen 7 dagen in te trekken.' />
        </Bullet>
      </div>
    </>
  )

  const footer: JSX.Element = <Footer />

  const sidebar: JSX.Element = <Sidebar logo={LogoSvg} />

  const body: JSX.Element = (
    <>
      <Title1 text={title} />
      {renderDescription()}
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

  return (
    <Page
      body={body}
      sidebar={sidebar}
      footer={footer}
    />
  )
}

const title = new TextBundle()
  .add('en', 'Welcome')
  .add('nl', 'Welkom')

const continueButton = new TextBundle()
  .add('en', 'Start')
  .add('nl', 'Start')

const privacyLabel = new TextBundle()
  .add('en', 'I have read and agree with the above text.')
  .add('nl', 'Ik heb de bovenstaande tekst gelezen en ben hiermee akkoord.')
