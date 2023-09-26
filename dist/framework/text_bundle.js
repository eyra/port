import _ from 'lodash';
export default class TextBundle {
    constructor() {
        this.translations = {};
        this.defaultLocale = 'nl';
    }
    add(locale, text) {
        this.translations[locale] = text;
        return this;
    }
    translate(locale) {
        return _.escape(this.resolve(locale));
    }
    resolve(locale) {
        const text = this.translations[locale];
        if (text !== null) {
            return text;
        }
        const defaultText = this.translations[this.defaultLocale];
        if (defaultText !== null) {
            return defaultText;
        }
        if (Object.values(this.translations).length > 0) {
            return Object.values(this.translations)[0];
        }
        return '?text?';
    }
}
