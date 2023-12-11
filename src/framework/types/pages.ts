import { isInstanceOf } from '../helpers'
import { PropsUIFooter, PropsUIHeader } from './elements'
import {
  PropsUIPromptFileInput,
  PropsUIPromptConfirm,
  PropsUIPromptConsentForm,
  PropsUIPromptRadioInput,
  PropsUIPromptQuestionnaire
} from './prompts'

export type PropsUIPage =
  PropsUIPageDonation |
  PropsUIPageEnd |
  PropsUIPageError

export function isPropsUIPage (arg: any): arg is PropsUIPage {
  return (
    isPropsUIPageDonation(arg) ||
    isPropsUIPageEnd(arg) ||
    isPropsUIPageError(arg)
  )
}

export interface PropsUIPageDonation {
  __type__: 'PropsUIPageDonation'
  platform: string
  header: PropsUIHeader
  body: PropsUIPromptFileInput | PropsUIPromptConfirm | PropsUIPromptConsentForm | PropsUIPromptRadioInput | PropsUIPromptQuestionnaire
  footer?: PropsUIFooter
}
export function isPropsUIPageDonation (arg: any): arg is PropsUIPageDonation {
  return isInstanceOf<PropsUIPageDonation>(arg, 'PropsUIPageDonation', ['platform', 'header', 'body'])
}

export interface PropsUIPageEnd {
  __type__: 'PropsUIPageEnd'
}
export function isPropsUIPageEnd (arg: any): arg is PropsUIPageEnd {
  return isInstanceOf<PropsUIPageEnd>(arg, 'PropsUIPageEnd', [])
}

export interface PropsUIPageError {
  __type__: 'PropsUIPageError'
  stacktrace: string
}
export function isPropsUIPageError (arg: any): arg is PropsUIPageError {
  return isInstanceOf<PropsUIPageError>(arg, 'PropsUIPageError', ['stacktrace'])
}
