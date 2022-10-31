import { Omit } from 'lodash'

export const isInstanceOf = <T>(
  arg: any,
  type: string,
  properties: Array<keyof T>
): arg is T => {
  return arg?.__type__ === type && isLike<T>(arg, properties)
}

export const isLike = <T>(
  arg: any,
  properties: Array<keyof T>
): arg is T => {
  properties.forEach((property) => assert((arg as T)[property] !== undefined, `Property ${String(property)} is required`))
  return true
}

export function assert (condition: unknown, msg?: string): asserts condition {
  if (condition === false) throw new Error(msg)
}

export type Weak<T> = Omit<T, '__type__'>
