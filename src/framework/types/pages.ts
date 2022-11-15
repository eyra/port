import { isInstanceOf } from '../helpers'
import { PropsUIHeader } from './elements'
import { PropsUIPromptFileInput, PropsUIPromptConfirm, PropsUIPromptConsentForm } from './prompts'

export type PropsUIPage =
  PropsUIPageSplashScreen |
  PropsUIPageDonation |
  PropsUIPageStart |
  PropsUIPageEnd

export function isPropsUIPage (arg: any): arg is PropsUIPage {
  return (
    isPropsUIPageSplashScreen(arg) ||
    isPropsUIPageDonation(arg) ||
    isPropsUIPageStart(arg) ||
    isPropsUIPageEnd(arg)
  )
}

export interface PropsUIPageSplashScreen {
  __type__: 'PropsUIPageSplashScreen'
}
export function isPropsUIPageSplashScreen (arg: any): arg is PropsUIPageSplashScreen {
  return isInstanceOf<PropsUIPageSplashScreen>(arg, 'PropsUIPageSplashScreen', [])
}

export interface PropsUIPageStart {
  __type__: 'PropsUIPageStart'
}
export function isPropsUIPageStart (arg: any): arg is PropsUIPageStart {
  return isInstanceOf<PropsUIPageStart>(arg, 'PropsUIPageStart', [])
}

export interface PropsUIPageDonation {
  __type__: 'PropsUIPageDonation'
  header: PropsUIHeader
  body: PropsUIPromptFileInput | PropsUIPromptConfirm | PropsUIPromptConsentForm
}
export function isPropsUIPageDonation (arg: any): arg is PropsUIPageDonation {
  return isInstanceOf<PropsUIPageDonation>(arg, 'PropsUIPageDonation', ['header', 'body'])
}

export interface PropsUIPageEnd {
  __type__: 'PropsUIPageEnd'
  header: PropsUIHeader
}
export function isPropsUIPageEnd (arg: any): arg is PropsUIPageEnd {
  return isInstanceOf<PropsUIPageEnd>(arg, 'PropsUIPageEnd', ['header'])
}
