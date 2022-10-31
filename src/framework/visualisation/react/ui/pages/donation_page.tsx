import React from 'react'
import { Weak } from '../../../../helpers'
import TextBundle from '../../../../text_bundle'
import { Translator } from '../../../../translator'
import { Translatable } from '../../../../types/elements'
import { PropsUIPageDonation } from '../../../../types/pages'
import { isPropsUIPromptConfirm, isPropsUIPromptConsentForm, isPropsUIPromptFileInput } from '../../../../types/prompts'
import { ReactFactoryContext } from '../../factory'
import { ForwardButton } from '../elements/button'
import { Spinner } from '../elements/spinner'
import { Title0 } from '../elements/text'
import { Confirm } from '../prompts/confirm'
import { ConsentForm } from '../prompts/consent_form'
import { FileInput } from '../prompts/file_input'

type Props = Weak<PropsUIPageDonation> & ReactFactoryContext

export const DonationPage = (props: Props): JSX.Element => {
  const [spinnerHidden] = React.useState<boolean>(true)
  const { title, forwardButton } = prepareCopy(props)
  const { resolve } = props

  function renderBody (props: Props): JSX.Element {
    const context = { locale: props.locale, resolve: props.resolve }
    const body = props.body
    if (isPropsUIPromptFileInput(body)) {
      return <FileInput {...body} {...context} />
    }
    if (isPropsUIPromptConfirm(body)) {
      return <Confirm {...body} {...context} />
    }
    if (isPropsUIPromptConsentForm(body)) {
      return <ConsentForm {...body} {...context} />
    }
    throw new TypeError('Unknown body type')
  }

  function handleSkip (): void {
    resolve?.({ __type__: 'PayloadFalse', value: false })
  }

  return (
    <>
      <Title0 text={title} />
      {renderBody(props)}
      <div className={spinnerHidden ? 'hidden' : ''}>
        <Spinner {... props.spinner} locale={props.locale} />
      </div>
      <div className='mb-10' />
      <div className='flex flex-row gap-4 items-center w-full'>
        <div className='flex-grow' />
        <ForwardButton label={forwardButton} onClick={handleSkip} />
      </div>
    </>
  )
}

interface Copy {
  title: string
  forwardButton: string
}

function prepareCopy ({ header: { title }, locale }: Props): Copy {
  return {
    title: Translator.translate(title, locale),
    forwardButton: Translator.translate(forwardButtonLabel(), locale)
  }
}

const forwardButtonLabel = (): Translatable => {
  return new TextBundle()
    .add('en', 'Skip this step')
    .add('nl', 'Sla deze stap over')
}
