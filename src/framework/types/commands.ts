import { instanceOf, childOf } from '../helpers'
import { PropsUIPage } from './pages'

export type Script = string | File | URL
export function isScript (arg: any): arg is Script {
  return typeof arg === 'string' || isFile(arg) || isURL(arg)
}
export function isFile (arg: unknown): arg is File {
  return instanceOf<File>(arg, ['arrayBuffer', 'lastModified', 'name', 'size', 'slice', 'stream', 'text', 'type', 'webkitRelativePath'])
}
export function isURL (arg: any): arg is URL {
  return instanceOf<URL>(arg, ['hash', 'host', 'hostname', 'href', 'origin', 'toString', 'password', 'pathname', 'port', 'protocol', 'search', 'searchParams', 'username', 'toJSON'])
}

export interface Table {
  id: string
  title: Text
  data: any
}
export function isTable (arg: any): arg is Table {
  return instanceOf<Table>(arg, ['id', 'title', 'data'])
}

export interface Response {
  command: Command
  payload: Payload
}
export function isResponse (arg: any): arg is Response {
  return instanceOf<Response>(arg, ['command', 'payload'])
}

export type Payload =
  PayloadResolved |
  PayloadRejected

export type PayloadRejected =
  PayloadFalse |
  PayloadError

export interface PayloadFalse {
  __type__: 'PayloadFalse'
  value: false
}

export interface PayloadError {
  __type__: 'PayloadError'
  value: string
}

export type PayloadResolved =
  PayloadVoid |
  PayloadTrue |
  PayloadString |
  PayloadFile

export interface PayloadVoid {
  __type__: 'PayloadVoid'
  value: undefined
}

export interface PayloadTrue {
  __type__: 'PayloadTrue'
  value: true
}

export interface PayloadString {
  __type__: 'PayloadString'
  value: string
}

export interface PayloadFile {
  __type__: 'PayloadFile'
  value: File
}

export type Command =
  CommandUI |
  CommandSystem

export function isCommand (arg: any): arg is Command {
  return childOf(arg, 'Command')
}

export type CommandSystem =
  CommandSystemDonate

export function isCommandSystem (arg: any): arg is CommandSystem {
  return childOf(arg, 'CommandSystem')
}

export type CommandUI =
  CommandUIRender

export function isCommandUI (arg: any): arg is CommandUI {
  return childOf(arg, 'CommandUI')
}

export interface CommandSystemDonate {
  __type__: 'CommandSystemDonate'
  key: string
  data: string
}
export function isCommandSystemDonate (arg: any): arg is CommandSystemDonate {
  return instanceOf<CommandSystemDonate>(arg, ['__type__', 'key', 'data']) && arg.__type__ === 'CommandSystemDonate'
}

export interface CommandUIRender {
  __type__: 'CommandUIRender'
  page: PropsUIPage
}
export function isCommandUIRender (arg: any): arg is CommandUIRender {
  return instanceOf<CommandUIRender>(arg, ['__type__', 'page']) && arg.__type__ === 'CommandUIRender'
}
