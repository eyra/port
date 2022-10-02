import _ from 'lodash'

export default class Translatable {
  translations: { [key: string]: string } = {}
  defaultLocale: string = 'nl'

  add (locale: string, text: string): Translatable {
    this.translations[locale] = text
    return this
  }

  text (locale: string): string {
    return _.escape(this.resolve(locale))
  }

  resolve (locale: string): string {
    const text = this.translations[locale]
    if (text !== null) {
      return text
    }

    const defaultText = this.translations[this.defaultLocale]
    if (defaultText !== null) {
      return defaultText
    }

    if (Object.values(this.translations).length > 0) {
      return Object.values(this.translations)[0]
    }

    return '?text?'
  }
}
