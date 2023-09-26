import { jsx as _jsx } from "react/jsx-runtime";
import { EndPage } from './ui/pages/end_page';
import { isPropsUIPageEnd, isPropsUIPageDonation, isPropsUIPageSplashScreen, isPropsUIPageError } from '../../types/pages';
import { DonationPage } from './ui/pages/donation_page';
import { SplashScreen } from './ui/pages/splash_screen';
import { ErrorPage } from './ui/pages/error_page';
export default class ReactFactory {
    createPage(page, context) {
        if (isPropsUIPageSplashScreen(page)) {
            return _jsx(SplashScreen, Object.assign({}, page, context));
        }
        if (isPropsUIPageEnd(page)) {
            return _jsx(EndPage, Object.assign({}, page, context));
        }
        if (isPropsUIPageDonation(page)) {
            return _jsx(DonationPage, Object.assign({}, page, context));
        }
        if (isPropsUIPageError(page)) {
            return _jsx(ErrorPage, Object.assign({}, page, context));
        }
        throw TypeError('Unknown page: ' + JSON.stringify(page));
    }
}
