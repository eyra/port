import _ from 'lodash';
var TextBundle = /** @class */ (function () {
    function TextBundle() {
        this.translations = {};
        this.defaultLocale = 'nl';
    }
    TextBundle.prototype.add = function (locale, text) {
        this.translations[locale] = text;
        return this;
    };
    TextBundle.prototype.translate = function (locale) {
        return _.escape(this.resolve(locale));
    };
    TextBundle.prototype.resolve = function (locale) {
        var text = this.translations[locale];
        if (text !== null) {
            return text;
        }
        var defaultText = this.translations[this.defaultLocale];
        if (defaultText !== null) {
            return defaultText;
        }
        if (Object.values(this.translations).length > 0) {
            return Object.values(this.translations)[0];
        }
        return '?text?';
    };
    return TextBundle;
}());
export default TextBundle;
