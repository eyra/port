import _ from 'lodash';
var Translatable = /** @class */ (function () {
    function Translatable() {
        this.translations = {};
        this.defaultLocale = 'nl';
    }
    Translatable.prototype.add = function (locale, text) {
        this.translations[locale] = text;
        return this;
    };
    Translatable.prototype.text = function (locale) {
        return _.escape(this.resolve(locale));
    };
    Translatable.prototype.resolve = function (locale) {
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
    return Translatable;
}());
export default Translatable;
