
import { EndPage } from './ui/pages/end_page'
import { isPropsUIPageEnd, isPropsUIPageDonation, PropsUIPage, isPropsUIPageSplashScreen, isPropsUIPageError } from '../../types/pages'
import { DonationPage } from './ui/pages/donation_page'
import { Payload } from '../../types/commands'
import { SplashScreen } from './ui/pages/splash_screen'
import { ErrorPage } from './ui/pages/error_page'

export interface ReactFactoryContext {
  locale: string
  resolve?: (payload: Payload) => void
}

export default class ReactFactory {
  createPage (page: PropsUIPage, context: ReactFactoryContext): JSX.Element {
    if (isPropsUIPageSplashScreen(page)) {
      return <SplashScreen {...page} {...context} />
    }
    if (isPropsUIPageEnd(page)) {
      return <EndPage {...page} {...context} />
    }
    if (isPropsUIPageDonation(page)) {
      return <DonationPage {...page} {...context} />
    }
    if (isPropsUIPageError(page)) {
      return <ErrorPage {...page} {...context} />
    }
    throw TypeError('Unknown page: ' + JSON.stringify(page))
  }
}
