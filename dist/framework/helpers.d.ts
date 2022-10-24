import { Omit } from 'lodash';
export declare const childOf: (arg: any, superType: string) => boolean;
export declare const instanceOf: <T>(arg: any, properties: (keyof T)[]) => arg is T;
export declare type Weak<T> = Omit<T, '__type__'>;
