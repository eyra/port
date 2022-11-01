import { isInstanceOf, isLike } from '../helpers'
import { } from './commands'
import { isPropsUIPage, PropsUIPage } from './pages'
import { isPropsUIPrompt, PropsUIPrompt } from './prompts'

export type PropsUI =
  PropsUIText |
  PropsUIButton |
  PropsUICheckBox |
  PropsUIRadioItem |
  PropsUISpinner |
  PropsUIHeader |
  PropsUITable |
  PropsUISearchBar |
  PropsUIPage |
  PropsUIPrompt

export type PropsUIText =
  PropsUITextTitle0 |
  PropsUITextTitle1 |
  PropsUITextTitle2 |
  PropsUITextTitle6 |
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
    isPropsUITextBodyLarge(arg) ||
    isPropsUITextBodyMedium(arg)
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

export interface PropsUITextBodyMedium {
  __type__: 'PropsUITextBodyMedium'
  text: string
  color?: string
  margin?: string
}
export function isPropsUITextBodyMedium (arg: any): arg is PropsUITextBodyMedium {
  return isInstanceOf<PropsUITextBodyMedium>(arg, 'PropsUITextBodyMedium', ['text', 'color', 'margin'])
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

export interface PropsUITextTitle6 {
  __type__: 'PropsUITextTitle6'
  text: string
  color?: string
  margin?: string
}
export function isPropsUITextTitle6 (arg: any): arg is PropsUITextTitle6 {
  return isInstanceOf<PropsUITextTitle6>(arg, 'PropsUITextTitle6', ['text', 'color', 'margin'])
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

export interface PropsUIButtonBack {
  __type__: 'PropsUIButtonBack'
  label: string
  onClick: () => void
}
export function isPropsUIButtonBack (arg: any): arg is PropsUIButtonBack {
  return isInstanceOf<PropsUIButtonBack>(arg, 'PropsUIButtonBack', ['label', 'onClick'])
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
  color?: string
  onClick: () => void
}
export function isPropsUIButtonLabel (arg: any): arg is PropsUIButtonLabel {
  return isInstanceOf<PropsUIButtonLabel>(arg, 'PropsUIButtonLabel', ['label', 'onClick'])
}

// Radio item

export interface PropsUIRadioItem {
  id: number
  value: string
  selected: boolean
  onSelect: () => void
}
export function isPropsUIRadioItem (arg: any): arg is PropsUIRadioItem {
  return isInstanceOf<PropsUIRadioItem>(arg, 'PropsUIRadioItem', ['id', 'value', 'selected', 'onSelect'])
}

// Check box

export interface PropsUICheckBox {
  id: string
  selected: boolean
  onSelect: () => void
}
export function isPropsUICheckBox (arg: any): arg is PropsUICheckBox {
  return isInstanceOf<PropsUICheckBox>(arg, 'PropsUICheckBox', ['id', 'selected', 'onSelect'])
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
  head: PropsUITableHead
  body: PropsUITableBody
  readOnly?: boolean
  pageSize?: number
}
export function isPropsUITable (arg: any): arg is PropsUITable {
  return isInstanceOf<PropsUITable>(arg, 'PropsUITable', ['readOnly', 'pageSize', 'id', 'head', 'body'])
}

export interface PropsUITableHead {
  __type__: 'PropsUITableHead'
  cells: PropsUITableCell[]
}
export function isPropsUITableHead (arg: any): arg is PropsUITableHead {
  return isInstanceOf<PropsUITableHead>(arg, 'PropsUITableHead', ['cells'])
}

export interface PropsUITableBody {
  __type__: 'PropsUITableBody'
  rows: PropsUITableRow[]
}
export function isPropsUITableBody (arg: any): arg is PropsUITableBody {
  return isInstanceOf<PropsUITableBody>(arg, 'PropsUITableBody', ['rows'])
}

export interface PropsUITableRow {
  __type__: 'PropsUITableRow'
  id: string
  cells: PropsUITableCell[]
}
export function isPropsUITableRow (arg: any): arg is PropsUITableRow {
  return isInstanceOf<PropsUITableRow>(arg, 'PropsUITableRow', ['id', 'cells'])
}

export interface PropsUITableCell {
  __type__: 'PropsUITableCell'
  text: string
}
export function isPropsUITableCell (arg: any): arg is PropsUITableCell {
  return isInstanceOf<PropsUITableCell>(arg, 'PropsUITableCell', ['text'])
}

// SEARCH BAR

export interface PropsUISearchBar {
  __type__: 'PropsUISearchBar'
  placeholder: string
  debounce?: number
  onSearch: (words: string[]) => void
}
export function isPropsUISearchBar (arg: any): arg is PropsUISearchBar {
  return isInstanceOf<PropsUISearchBar>(arg, 'PropsUISearchBar', ['placeholder'])
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
