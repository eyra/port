import { Omit } from 'lodash';
export declare const isInstanceOf: <T>(arg: any, type: string, properties: (keyof T)[]) => arg is T;
export declare const isLike: <T>(arg: any, properties: (keyof T)[]) => arg is T;
export declare function assert(condition: unknown, msg?: string): asserts condition;
export declare type Weak<T> = Omit<T, '__type__'>;
