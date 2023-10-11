import React from 'react'
import { Weak } from '../../../../helpers'
import TextBundle from '../../../../text_bundle'
import { Translator } from '../../../../translator'
import { PropsUIPageSplashScreen } from '../../../../types/pages'
import { ReactFactoryContext } from '../../factory'
import { PrimaryButton } from '../elements/button'
import { Title1 } from '../elements/text'
import { Page } from './templates/page'

interface Copy {
  title: string
  continueButton: string
}

type Props = Weak<PropsUIPageSplashScreen> & ReactFactoryContext

function prepareCopy ({ locale }: Props): Copy {
  return {
    title: Translator.translate(title, locale),
    continueButton: Translator.translate(continueButton, locale)
  }
}

export const SplashScreen = (props: Props): JSX.Element => {
  const [waiting, setWaiting] = React.useState<boolean>(false)
  const { title, continueButton } = prepareCopy(props)
  const { locale, resolve } = props

  function handleContinue (): void {
    if (!waiting) {
      setWaiting(true)
      resolve?.({ __type__: 'PayloadVoid', value: undefined })
    }
  }

  function renderDescription (): JSX.Element {
    if (locale === 'nl') return nlDescription
    return enDescription
  }

  const enDescription: JSX.Element = (
    <>
      <div className='text-bodylarge font-body text-grey1'>
        <div className='mb-4 text-bodylarge font-body text-grey1'>
          You are about to start the process of donating your data to a research institute. The data that we ask you to donate will be used for academic research to gain insight into how platforms work.
        </div>
        <div className='mb-4 text-bodylarge font-body text-grey1'>
          We will walk you through this process step by step. During this process no data is stored or sent to a server. You can delete rows from the data before donating. Data will only be donated and stored when you click the button “Yes, donate” on the page that shows your data.
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
          U kunt zo uw gegevens gaan doneren voor een onderzoek van een onderzoeksinstituut. De gegevens die we u vragen te doneren worden gebruikt voor wetenschappelijke onderzoek om inzicht te krijgen in de werkwijze van sociale media.
        </div>
        <div className='mb-4'>
          We leggen u stap voor stap wat er van u verwacht wordt. Tijdens deze stappen worden geen gegevens opgeslagen of naar een server verstuurd. U kunt zelf rijen uit uw data verwijderen die u niet wilt doneren. Pas als u de vraag krijgt of u de gegevens wilt doneren en u op de knop “Ja, doneer” klikt, worden de gegevens gedoneerd en opgeslagen.
        </div>
        <div className='mb-10'>
          Deze website houdt ook uw activiteiten bij – bijvoorbeeld op welke pagina’s van deze website u klikt – als deel van dit onderzoek. U kunt meer informatie op onze privacy pagina vinden.
        </div>
      </div>
    </>
  )

  const body: JSX.Element = (
    <>
      <Title1 text={title} />
      {renderDescription()}
      <div className='flex flex-col gap-8'>
        <div className='flex flex-row gap-4'>
          <PrimaryButton label={continueButton} onClick={handleContinue} spinning={waiting} />
        </div>
      </div>
    </>
  )

  return (
    <Page
      body={body}
    />
  )
}

const title = new TextBundle()
  .add('en', 'Introduction')
  .add('nl', 'Introductie')

const continueButton = new TextBundle()
  .add('en', 'Continue')
  .add('nl', 'Doorgaan')
