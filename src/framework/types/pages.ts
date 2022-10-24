import { childOf, instanceOf } from '../helpers'
import { PropsUIHeader, PropsUISpinner } from './elements'
import { PropsUIPromptFileInput, PropsUIPromptConfirm, PropsUIPromptConsentForm } from './prompts'

export type PropsUIPage =
  PropsUIPageSplashScreen |
  PropsUIPageDonation |
  PropsUIPageStart |
  PropsUIPageEnd

export function isPropsUIPage (arg: any): arg is PropsUIPage {
  return childOf(arg, 'PropsUIPage')
}

export interface PropsUIPageSplashScreen {
  __type__: 'PropsUIPageSplashScreen'
}
export function isPropsUIPageSplashScreen (arg: any): arg is PropsUIPageSplashScreen {
  return instanceOf<PropsUIPageSplashScreen>(arg, ['__type__']) && arg.__type__ === 'PropsUIPageSplashScreen'
}

export interface PropsUIPageStart {
  __type__: 'PropsUIPageStart'
}
export function isPropsUIPageStart (arg: any): arg is PropsUIPageStart {
  return instanceOf<PropsUIPageStart>(arg, ['__type__']) && arg.__type__ === 'PropsUIPageStart'
}

export interface PropsUIPageDonation {
  __type__: 'PropsUIPageDonation'
  header: PropsUIHeader
  body: PropsUIPromptFileInput | PropsUIPromptConfirm | PropsUIPromptConsentForm
  spinner: PropsUISpinner
}
export function isPropsUIPageDonation (arg: any): arg is PropsUIPageDonation {
  return instanceOf<PropsUIPageDonation>(arg, ['__type__', 'header', 'body']) && arg.__type__ === 'PropsUIPageDonation'
}

export interface PropsUIPageEnd {
  __type__: 'PropsUIPageEnd'
  header: PropsUIHeader
}
export function isPropsUIPageEnd (arg: any): arg is PropsUIPageEnd {
  return instanceOf<PropsUIPageEnd>(arg, ['__type__', 'header']) && arg.__type__ === 'PropsUIPageEnd'
}
