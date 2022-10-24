import _ from 'lodash'
import { Translatable } from './types/elements'

export default class TextBundle implements Translatable {
  translations: { [key: string]: string } = {}
  defaultLocale: string = 'nl'

  add (locale: string, text: string): TextBundle {
    this.translations[locale] = text
    return this
  }

  translate (locale: string): string {
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
