import { instanceOf, childOf, Weak } from '../helpers'
import { } from './commands'
import { PropsUIPage } from './pages'
import { PropsUIPrompt } from './prompts'

export type PropsUI =
  PropsUIText |
  PropsUIButton |
  PropsUISpinner |
  PropsUIHeader |
  PropsUITable |
  PropsUIPage |
  PropsUIPrompt

export type PropsUIText =
  PropsUITextTitle0 |
  PropsUITextTitle1 |
  PropsUITextTitle2

export type PropsUIButton =
  PropsUIButtonPrimary |
  PropsUIButtonSecundary |
  PropsUIButtonForward |
  PropsUIButtonLabel

// UI

export function isPropsUI (arg: any): arg is PropsUI {
  return childOf(arg, 'PropsUI')
}

// TEXTS

export function isPropsUIText (arg: any): arg is PropsUIText {
  return childOf(arg, 'PropsUIText')
}

export interface PropsUITextBody {
  __type__: 'PropsUITextBody'
  text: string
  color?: string
  margin?: string
}
export function isPropsUITextBody (arg: any): arg is PropsUITextBody {
  return instanceOf<PropsUITextBody>(arg, ['__type__', 'text', 'color', 'margin']) && arg.__type__ === 'PropsUITextBody'
}

export interface PropsUITextTitle0 {
  __type__: 'PropsUITextTitle0'
  text: string
  color?: string
  margin?: string
}
export function isPropsUITextTitle0 (arg: any): arg is PropsUITextTitle0 {
  return instanceOf<PropsUITextTitle0>(arg, ['__type__', 'text', 'color', 'margin']) && arg.__type__ === 'PropsUITextTitle0'
}

export interface PropsUITextTitle1 {
  __type__: 'PropsUITextTitle1'
  text: string
  color?: string
  margin?: string
}
export function isPropsUITextTitle1 (arg: any): arg is PropsUITextTitle1 {
  return instanceOf<PropsUITextTitle1>(arg, ['__type__', 'text', 'color', 'margin']) && arg.__type__ === 'PropsUITextTitle1'
}

export interface PropsUITextTitle2 {
  __type__: 'PropsUITextTitle2'
  text: string
  color?: string
  margin?: string
}
export function isPropsUITextTitle2 (arg: any): arg is PropsUITextTitle2 {
  return instanceOf<PropsUITextTitle2>(arg, ['__type__', 'text', 'color', 'margin']) && arg.__type__ === 'PropsUITextTitle2'
}

// BUTTONS

export function isPropsUIButton (arg: any): arg is PropsUIButton {
  return childOf(arg, 'PropsUIButton')
}

export interface PropsUIButtonPrimary {
  __type__: 'PropsUIButtonPrimary'
  label: string
  color?: string
  onClick: () => void
}
export function isPropsUIButtonPrimary (arg: any): arg is PropsUIButtonPrimary {
  return instanceOf<PropsUIButtonPrimary>(arg, ['__type__', 'label', 'color', 'onClick']) && arg.__type__ === 'PropsUIButtonPrimary'
}

export interface PropsUIButtonSecundary {
  __type__: 'PropsUIButtonSecundary'
  label: string
  color?: string
  onClick: () => void
}
export function isPropsUIButtonSecundary (arg: any): arg is PropsUIButtonSecundary {
  return instanceOf<PropsUIButtonSecundary>(arg, ['__type__', 'label', 'color', 'onClick']) && arg.__type__ === 'PropsUIButtonSecundary'
}

export interface PropsUIButtonForward {
  __type__: 'PropsUIButtonForward'
  label: string
  onClick: () => void
}
export function isPropsUIButtonForward (arg: any): arg is PropsUIButtonForward {
  return instanceOf<PropsUIButtonForward>(arg, ['__type__', 'label', 'onClick']) && arg.__type__ === 'PropsUIButtonForward'
}

export interface PropsUIButtonLabel {
  __type__: 'PropsUIButtonLabel'
  label: string
  onClick: () => void
}
export function isPropsUIButtonLabel (arg: any): arg is PropsUIButtonLabel {
  return instanceOf<PropsUIButtonLabel>(arg, ['__type__', 'label', 'onClick']) && arg.__type__ === 'PropsUIButtonLabel'
}

// SPINNER

export interface PropsUISpinner {
  __type__: 'PropsUISpinner'
  text: Text
}
export function isPropsUISpinner (arg: any): arg is PropsUISpinner {
  return instanceOf<PropsUISpinner>(arg, ['__type__', 'text']) && arg.__type__ === 'PropsUISpinner'
}

// Header

export interface PropsUIHeader {
  __type__: 'PropsUIHeader'
  title: Text
}
export function isPropsUIHeader (arg: any): arg is PropsUIHeader {
  return instanceOf<PropsUIHeader>(arg, ['__type__', 'title']) && arg.__type__ === 'PropsUIHeader'
}

// TABLE

export interface PropsUITable {
  __type__: 'PropsUITable'
  id: string
  head: Weak<PropsUITableHead>
  body: Weak<PropsUITableBody>
}
export function isPropsUITable (arg: any): arg is PropsUITable {
  return instanceOf<PropsUITable>(arg, ['__type__', 'id', 'head', 'body']) && arg.__type__ === 'PropsUITable'
}

export interface PropsUITableHead {
  __type__: 'PropsUITableHead'
  cells: PropsUITableCell[]
}
export function isPropsUITableHeader (arg: any): arg is PropsUITableHead {
  return instanceOf<PropsUITableHead>(arg, ['__type__', 'cells']) && arg.__type__ === 'PropsUITableHead'
}

export interface PropsUITableBody {
  __type__: 'PropsUITableBody'
  rows: Weak<PropsUITableRow[]>
}
export function isPropsUITableBody (arg: any): arg is PropsUITableBody {
  return instanceOf<PropsUITableBody>(arg, ['__type__', 'rows']) && arg.__type__ === 'PropsUITableBody'
}

export interface PropsUITableRow {
  __type__: 'PropsUITableRow'
  cells: PropsUITableCell[]
}
export function isPropsUITableRow (arg: any): arg is PropsUITableRow {
  return instanceOf<PropsUITableRow>(arg, ['__type__', 'cells']) && arg.__type__ === 'PropsUITableRow'
}

export interface PropsUITableCell {
  __type__: 'PropsUITableCell'
  text: string
}
export function isPropsUITableCell (arg: any): arg is PropsUITableCell {
  return instanceOf<PropsUITableCell>(arg, ['__type__', 'text']) && arg.__type__ === 'PropsUITableCell'
}

// BASE TYPES

export type Text = Translatable | string

export function isText (arg: any): arg is Text {
  return typeof arg === 'string' || isTranslatable(arg)
}

export interface Translatable {
  translations: { [locale: string]: string }
}
export function isTranslatable (arg: any): arg is Translatable {
  return instanceOf<Translatable>(arg, ['translations'])
}
