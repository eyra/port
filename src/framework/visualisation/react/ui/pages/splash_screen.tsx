import React from 'react'
import { Weak } from '../../../../helpers'
import TextBundle from '../../../../text_bundle'
import { Translator } from '../../../../translator'
import { PropsUIPageSplashScreen } from '../../../../types/pages'
import { ReactFactoryContext } from '../../factory'
import { PrimaryButton } from '../elements/button'
import { CheckBox } from '../elements/check_box'
import { Label, Title1 } from '../elements/text'
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
      <div className='text-bodylarge font-body text-grey1'>
        <div className='mb-4 text-bodylarge font-body text-grey1'>
          You are about to start the process of donating your data to research institute ASCoR at Amsterdam University. The data that we ask you to donate will be used for academic research to gain insight into how social media platforms work.
        </div>
        <div className='mb-4 text-bodylarge font-body text-grey1'>
          We will walk you through this process step by step. During this process no data is stored or sent to ASCoR. You can delete rows from the data before donating. Data will only be donated and stored when you click the button “Yes, donate” on the page that shows your data.
        </div>
        <div className='mb-6 text-bodylarge font-body text-grey1'>
          By clicking the button “<span className='font-bodybold'>Yes, donate</span>”:
        </div>
        <div className='flex flex-col gap-3 mb-6'>
          <Bullet>
            <div>you fully and voluntarily agree to donate your data for this research.</div>
          </Bullet>
          <Bullet>
            <div>you are aware that when your data is used for academic publications, or made publicly available in some other form, this will be anonymous.</div>
          </Bullet>
          <Bullet>
            <div>you are aware that you have the right to withdraw your permission within 7 days by contacting Panel Inzicht.</div>
          </Bullet>
        </div>
        <div className='mb-10'>
          This website keeps track of your activity - for example on which pages of this website you click - as part of this research. More information can be found on our privacy page.
        </div>
      </div>
    </>
  )

  const nlDescription: JSX.Element = (
    <>
      <div className='text-bodylarge font-body text-grey1'>
        <div className='mb-4'>
          U kunt zo uw gegevens gaan doneren voor een onderzoek van onderzoeksinstituut ASCoR aan de Universiteit van Amsterdam. De gegevens die we u vragen te doneren worden gebruikt voor wetenschappelijke onderzoek om inzicht te krijgen in de werkwijze van sociale media.
        </div>
        <div className='mb-4'>
          We leggen u stap voor stap wat er van u verwacht wordt. Tijdens deze stappen worden geen gegevens opgeslagen of naar ASCoR verstuurd. U kunt zelf rijen uit uw data verwijderen die u niet wilt doneren. Pas als u de vraag krijgt of u de gegevens wilt doneren en u op de knop “Ja, doneer” klikt, worden de gegevens gedoneerd en opgeslagen.
        </div>
        <div className='mb-4'>
          Door op de knop “<span className='font-bodybold'>Ja, doneer</span>” te klikken:
        </div>
        <div className='flex flex-col gap-3 mb-6'>
          <Bullet>
            <div>Geeft u volledig en vrijwillig toestemming om uw data te doneren voor dit onderzoek.'</div>
          </Bullet>
          <Bullet>
            <div>Geeft u aan te weten dat als uw gegevens worden gebruikt in wetenschappelijke publicaties, of deze op een andere manier openbaar worden gemaakt, dit dan anoniem gebeurt.</div>
          </Bullet>
          <Bullet>
            <div>Geeft u aan te weten dat u het recht hebt om uw toestemming binnen 7 dagen in te trekken door contact met Panel Inzicht op te nemen.</div>
          </Bullet>
        </div>
        <div className='mb-10'>
          Deze website houdt ook uw activiteiten bij – bijvoorbeeld op welke pagina’s van deze website u klikt – als deel van dit onderzoek. U kunt meer informatie op onze privacy pagina vinden.
        </div>
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
  .add('en', 'I have read and agree with the above terms.')
  .add('nl', 'Ik heb deze voorwaarden gelezen en ben hiermee akkoord.')
