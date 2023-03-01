var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx } from "react/jsx-runtime";
import { EndPage } from './ui/pages/end_page';
import { isPropsUIPageEnd, isPropsUIPageDonation, isPropsUIPageSplashScreen } from '../../types/pages';
import { DonationPage } from './ui/pages/donation_page';
import { SplashScreen } from './ui/pages/splash_screen';
var ReactFactory = /** @class */ (function () {
    function ReactFactory() {
    }
    ReactFactory.prototype.createPage = function (page, context) {
        if (isPropsUIPageSplashScreen(page)) {
            return _jsx(SplashScreen, __assign({}, page, context));
        }
        if (isPropsUIPageEnd(page)) {
            return _jsx(EndPage, __assign({}, page, context));
        }
        if (isPropsUIPageDonation(page)) {
            return _jsx(DonationPage, __assign({}, page, context));
        }
        throw TypeError('Unknown page: ' + JSON.stringify(page));
    };
    return ReactFactory;
}());
export default ReactFactory;
