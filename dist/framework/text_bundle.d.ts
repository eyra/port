import { Translatable } from './types/elements';
export default class TextBundle implements Translatable {
    translations: {
        [key: string]: string;
    };
    defaultLocale: string;
    add(locale: string, text: string): TextBundle;
    translate(locale: string): string;
    resolve(locale: string): string;
}
