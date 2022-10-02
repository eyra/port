export default class Translatable {
    translations: {
        [key: string]: string;
    };
    defaultLocale: string;
    add(locale: string, text: string): Translatable;
    text(locale: string): string;
    resolve(locale: string): string;
}
