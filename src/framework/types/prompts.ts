import { childOf, instanceOf } from '../helpers'
import { Text } from './elements'

export type PropsUIPrompt =
  PropsUIPromptFileInput |
  PropsUIPromptRadioInput |
  PropsUIPromptConsentForm

export function isPropsUIPrompt (arg: any): arg is PropsUIPrompt {
  return childOf(arg, 'PropsUIPrompt')
}

export interface PropsUIPromptConfirm {
  __type__: 'PropsUIPromptConfirm'
  text: Text
  ok: Text
  cancel: Text
}
export function isPropsUIPromptConfirm (arg: any): arg is PropsUIPromptConfirm {
  return instanceOf<PropsUIPromptConfirm>(arg, ['__type__', 'text', 'ok', 'cancel']) && arg.__type__ === 'PropsUIPromptConfirm'
}

export interface PropsUIPromptFileInput {
  __type__: 'PropsUIPromptFileInput'
  title: Text
  description: Text
  extensions: string
}
export function isPropsUIPromptFileInput (arg: any): arg is PropsUIPromptFileInput {
  return instanceOf<PropsUIPromptFileInput>(arg, ['__type__', 'title', 'description', 'extensions']) && arg.__type__ === 'PropsUIPromptFileInput'
}

export interface PropsUIPromptRadioInput {
  __type__: 'PropsUIPromptRadioInput'
  title: Text
  description: Text
  items: string[]
}
export function isPropsUIPromptRadioInput (arg: any): arg is PropsUIPromptRadioInput {
  return instanceOf<PropsUIPromptRadioInput>(arg, ['__type__', 'title', 'description', 'items']) && arg.__type__ === 'PropsUIPromptRadioInput'
}
export interface PropsUIPromptConsentForm {
  __type__: 'PropsUIPromptConsentForm'
  title: Text
  description: Text
  tables: PropsUIPromptConsentFormTable[]
}
export function isPropsUIPromptConsentForm (arg: any): arg is PropsUIPromptConsentForm {
  return instanceOf<PropsUIPromptConsentForm>(arg, ['__type__', 'title', 'description', 'tables']) && arg.__type__ === 'PropsUIPromptConsentForm'
}

export interface PropsUIPromptConsentFormTable {
  __type__: 'PropsUIPromptConsentFormTable'
  id: string
  title: Text
  description: Text
  data_frame: any
}
export function isPropsUIPromptConsentFormTable (arg: any): arg is PropsUIPromptConsentFormTable {
  return instanceOf<PropsUIPromptConsentFormTable>(arg, ['__type__', 'id', 'title', 'description', 'data_frame']) && arg.__type__ === 'PropsUIPromptConsentFormTable'
}
