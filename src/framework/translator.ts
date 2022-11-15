import { isTranslatable, Text, Translatable } from './types/elements'

export const Translator = (function () {
  const defaultLocale: string = 'nl'

  function translate (text: Text, locale: string): string {
    if (typeof text === 'string') {
      return text
    }
    if (isTranslatable(text)) {
      return resolve(text, locale)
    }
    throw new TypeError('Unknown text type')
  }

  function resolve (translatable: Translatable, locale: string): string {
    const text = translatable.translations[locale]
    if (text !== null) {
      return text
    }

    const defaultText = translatable.translations[defaultLocale]
    if (defaultText !== null) {
      return defaultText
    }

    if (Object.values(translatable.translations).length > 0) {
      return Object.values(translatable.translations)[0]
    }

    return '?text?'
  }

  return {
    translate
  }
})()
