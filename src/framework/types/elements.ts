import { isInstanceOf, Weak, isLike } from '../helpers'
import { } from './commands'
import { isPropsUIPage, PropsUIPage } from './pages'
import { isPropsUIPrompt, PropsUIPrompt } from './prompts'

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
  PropsUITextTitle2 |
  PropsUITextBodyLarge

export type PropsUIButton =
  PropsUIButtonPrimary |
  PropsUIButtonSecundary |
  PropsUIButtonForward |
  PropsUIButtonLabel

// UI

export function isPropsUI (arg: any): arg is PropsUI {
  return isPropsUIText(arg) ||
    isPropsUIButton(arg) ||
    isPropsUISpinner(arg) ||
    isPropsUIHeader(arg) ||
    isPropsUITable(arg) ||
    isPropsUIPage(arg) ||
    isPropsUIPrompt(arg)
}

// TEXTS

export function isPropsUIText (arg: any): arg is PropsUIText {
  return isPropsUITextTitle0(arg) ||
    isPropsUITextTitle0(arg) ||
    isPropsUITextTitle0(arg) ||
    isPropsUITextBodyLarge(arg)
}

export interface PropsUITextBodyLarge {
  __type__: 'PropsUITextBodyLarge'
  text: string
  color?: string
  margin?: string
}
export function isPropsUITextBodyLarge (arg: any): arg is PropsUITextBodyLarge {
  return isInstanceOf<PropsUITextBodyLarge>(arg, 'PropsUITextBodyLarge', ['text', 'color', 'margin'])
}

export interface PropsUITextTitle0 {
  __type__: 'PropsUITextTitle0'
  text: string
  color?: string
  margin?: string
}
export function isPropsUITextTitle0 (arg: any): arg is PropsUITextTitle0 {
  return isInstanceOf<PropsUITextTitle0>(arg, 'PropsUITextTitle0', ['text', 'color', 'margin'])
}

export interface PropsUITextTitle1 {
  __type__: 'PropsUITextTitle1'
  text: string
  color?: string
  margin?: string
}
export function isPropsUITextTitle1 (arg: any): arg is PropsUITextTitle1 {
  return isInstanceOf<PropsUITextTitle1>(arg, 'PropsUITextTitle1', ['text', 'color', 'margin'])
}

export interface PropsUITextTitle2 {
  __type__: 'PropsUITextTitle2'
  text: string
  color?: string
  margin?: string
}
export function isPropsUITextTitle2 (arg: any): arg is PropsUITextTitle2 {
  return isInstanceOf<PropsUITextTitle2>(arg, 'PropsUITextTitle2', ['text', 'color', 'margin'])
}

// BUTTONS

export function isPropsUIButton (arg: any): arg is PropsUIButton {
  return isPropsUIButtonPrimary(arg) ||
    isPropsUIButtonSecundary(arg) ||
    isPropsUIButtonForward(arg) ||
    isPropsUIButtonLabel(arg)
}

export interface PropsUIButtonPrimary {
  __type__: 'PropsUIButtonPrimary'
  label: string
  color?: string
  onClick: () => void
}
export function isPropsUIButtonPrimary (arg: any): arg is PropsUIButtonPrimary {
  return isInstanceOf<PropsUIButtonPrimary>(arg, 'PropsUIButtonPrimary', ['label', 'color', 'onClick'])
}

export interface PropsUIButtonSecundary {
  __type__: 'PropsUIButtonSecundary'
  label: string
  color?: string
  onClick: () => void
}
export function isPropsUIButtonSecundary (arg: any): arg is PropsUIButtonSecundary {
  return isInstanceOf<PropsUIButtonSecundary>(arg, 'PropsUIButtonSecundary', ['label', 'color', 'onClick'])
}

export interface PropsUIButtonForward {
  __type__: 'PropsUIButtonForward'
  label: string
  onClick: () => void
}
export function isPropsUIButtonForward (arg: any): arg is PropsUIButtonForward {
  return isInstanceOf<PropsUIButtonForward>(arg, 'PropsUIButtonForward', ['label', 'onClick'])
}

export interface PropsUIButtonLabel {
  __type__: 'PropsUIButtonLabel'
  label: string
  onClick: () => void
}
export function isPropsUIButtonLabel (arg: any): arg is PropsUIButtonLabel {
  return isInstanceOf<PropsUIButtonLabel>(arg, 'PropsUIButtonLabel', ['label', 'onClick'])
}

// SPINNER

export interface PropsUISpinner {
  __type__: 'PropsUISpinner'
  text: Text
}
export function isPropsUISpinner (arg: any): arg is PropsUISpinner {
  return isInstanceOf<PropsUISpinner>(arg, 'PropsUISpinner', ['text'])
}

// Header

export interface PropsUIHeader {
  __type__: 'PropsUIHeader'
  title: Text
}
export function isPropsUIHeader (arg: any): arg is PropsUIHeader {
  return isInstanceOf<PropsUIHeader>(arg, 'PropsUIHeader', ['title'])
}

// TABLE

export interface PropsUITable {
  __type__: 'PropsUITable'
  id: string
  head: Weak<PropsUITableHead>
  body: Weak<PropsUITableBody>
}
export function isPropsUITable (arg: any): arg is PropsUITable {
  return isInstanceOf<PropsUITable>(arg, 'PropsUITable', ['id', 'head', 'body'])
}

export interface PropsUITableHead {
  __type__: 'PropsUITableHead'
  cells: PropsUITableCell[]
}
export function isPropsUITableHeader (arg: any): arg is PropsUITableHead {
  return isInstanceOf<PropsUITableHead>(arg, 'PropsUITableHead', ['cells'])
}

export interface PropsUITableBody {
  __type__: 'PropsUITableBody'
  rows: Weak<PropsUITableRow[]>
}
export function isPropsUITableBody (arg: any): arg is PropsUITableBody {
  return isInstanceOf<PropsUITableBody>(arg, 'PropsUITableBody', ['rows'])
}

export interface PropsUITableRow {
  __type__: 'PropsUITableRow'
  cells: PropsUITableCell[]
}
export function isPropsUITableRow (arg: any): arg is PropsUITableRow {
  return isInstanceOf<PropsUITableRow>(arg, 'PropsUITableRow', ['cells'])
}

export interface PropsUITableCell {
  __type__: 'PropsUITableCell'
  text: string
}
export function isPropsUITableCell (arg: any): arg is PropsUITableCell {
  return isInstanceOf<PropsUITableCell>(arg, 'PropsUITableCell', ['text'])
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
  return isLike<Translatable>(arg, ['translations'])
}
