import { Omit } from 'lodash'

export const childOf = (arg: any, superType: string): boolean => {
  return arg?.__type__?.startsWith(superType)
}

export const instanceOf = <T>(
  arg: any,
  properties: Array<keyof T>
): arg is T => {
  return !properties.some((property) => (arg as T)[property] === undefined)
}

export type Weak<T> = Omit<T, '__type__'>
