import { isTranslatable } from './types/elements';
export var Translator = (function () {
    var defaultLocale = 'nl';
    function translate(text, locale) {
        if (typeof text === 'string') {
            return text;
        }
        if (isTranslatable(text)) {
            return resolve(text, locale);
        }
        throw new TypeError('Unknown text type');
    }
    function resolve(translatable, locale) {
        var text = translatable.translations[locale];
        if (text !== null) {
            return text;
        }
        var defaultText = translatable.translations[defaultLocale];
        if (defaultText !== null) {
            return defaultText;
        }
        if (Object.values(translatable.translations).length > 0) {
            return Object.values(translatable.translations)[0];
        }
        return '?text?';
    }
    return {
        translate: translate
    };
})();
