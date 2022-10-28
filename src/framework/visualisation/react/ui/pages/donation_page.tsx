import React from 'react'
import { Weak } from '../../../../helpers'
import { Translator } from '../../../../translator'
import { PropsUIPageDonation } from '../../../../types/pages'
import { isPropsUIPromptConfirm, isPropsUIPromptConsentForm, isPropsUIPromptFileInput } from '../../../../types/prompts'
import { ReactFactoryContext } from '../../factory'
import { Spinner } from '../elements/spinner'
import { Title0 } from '../elements/text'
import { Confirm } from '../prompts/confirm'
import { ConsentForm } from '../prompts/consent_form'
import { FileInput } from '../prompts/file_input'

interface Copy {
  title: string
}

type Props = Weak<PropsUIPageDonation> & ReactFactoryContext

function prepareCopy ({ header: { title }, locale }: Props): Copy {
  return {
    title: Translator.translate(title, locale)
  }
}

export const DonationPage = (props: Props): JSX.Element => {
  const [spinnerHidden] = React.useState<boolean>(true)
  const { title } = prepareCopy(props)

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

  return (
    <>
      <Title0 text={title} />
      {renderBody(props)}
      <div className={spinnerHidden ? 'hidden' : ''}>
        <Spinner {... props.spinner} locale={props.locale} />
      </div>
    </>
  )
}
