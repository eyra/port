import { isInstanceOf, isLike } from '../helpers'
import {} from './commands'
import { isPropsUIPage, PropsUIPage } from './pages'
import { isPropsUIPrompt, PropsUIPrompt } from './prompts'
import { VisualizationType } from './visualizations'

export type PropsUI =
  | PropsUIText
  | PropsUIButton
  | PropsUICheckBox
  | PropsUIRadioItem
  | PropsUISpinner
  | PropsUIProgress
  | PropsUIHeader
  | PropsUITable
  | PropsUISearchBar
  | PropsUIPage
  | PropsUIPrompt

export type PropsUIText =
  | PropsUITextTitle0
  | PropsUITextTitle1
  | PropsUITextTitle2
  | PropsUITextTitle3
  | PropsUITextTitle6
  | PropsUITextBodyLarge
  | PropsUITextLabel

export type PropsUIButton =
  | PropsUIButtonPrimary
  | PropsUIButtonSecundary
  | PropsUIButtonBack
  | PropsUIButtonForward
  | PropsUIButtonIconBack
  | PropsUIButtonIconForward
  | PropsUIButtonIcon
  | PropsUIButtonLabel
  | PropsUIButtonIconLabel

// UI

export function isPropsUI (arg: any): arg is PropsUI {
  return (
    isPropsUIText(arg) ||
    isPropsUIButton(arg) ||
    isPropsUISpinner(arg) ||
    isPropsUIProgress(arg) ||
    isPropsUIHeader(arg) ||
    isPropsUITable(arg) ||
    isPropsUIPage(arg) ||
    isPropsUIPrompt(arg)
  )
}

// TEXTS

export function isPropsUIText (arg: any): arg is PropsUIText {
  return (
    isPropsUITextTitle0(arg) ||
    isPropsUITextTitle0(arg) ||
    isPropsUITextTitle1(arg) ||
    isPropsUITextTitle2(arg) ||
    isPropsUITextTitle3(arg) ||
    isPropsUITextTitle4(arg) ||
    isPropsUITextTitle6(arg) ||
    isPropsUITextBodyLarge(arg) ||
    isPropsUITextBodyMedium(arg) ||
    isPropsUITextLabel(arg) ||
    isPropsUITextCaption(arg)
  )
}

export interface PropsUITextLabel {
  __type__: 'PropsUITextLabel'
  text: string
  color?: string
  margin?: string
}
export function isPropsUITextLabel (arg: any): arg is PropsUITextLabel {
  return isInstanceOf<PropsUITextLabel>(arg, 'PropsUITextLabel', ['text', 'color', 'margin'])
}

export interface PropsUITextCaption {
  __type__: 'PropsUITextCaption'
  text: string
  color?: string
  margin?: string
}
export function isPropsUITextCaption (arg: any): arg is PropsUITextCaption {
  return isInstanceOf<PropsUITextCaption>(arg, 'PropsUITextCaption', ['text', 'color', 'margin'])
}

export interface PropsUITextBodyLarge {
  __type__: 'PropsUITextBodyLarge'
  text: string
  color?: string
  margin?: string
}
export function isPropsUITextBodyLarge (arg: any): arg is PropsUITextBodyLarge {
  return isInstanceOf<PropsUITextBodyLarge>(arg, 'PropsUITextBodyLarge', [
    'text',
    'color',
    'margin'
  ])
}

export interface PropsUITextBodyMedium {
  __type__: 'PropsUITextBodyMedium'
  text: string
  color?: string
  margin?: string
}
export function isPropsUITextBodyMedium (arg: any): arg is PropsUITextBodyMedium {
  return isInstanceOf<PropsUITextBodyMedium>(arg, 'PropsUITextBodyMedium', [
    'text',
    'color',
    'margin'
  ])
}

export interface PropsUITextBodySmall {
  __type__: 'PropsUITextBodySmall'
  text: string
  color?: string
  margin?: string
}
export function isPropsUITextBodySmall (arg: any): arg is PropsUITextBodySmall {
  return isInstanceOf<PropsUITextBodySmall>(arg, 'PropsUITextBodySmall', [
    'text',
    'color',
    'margin'
  ])
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

export interface PropsUITextTitle3 {
  __type__: 'PropsUITextTitle3'
  text: string
  color?: string
  margin?: string
}
export function isPropsUITextTitle3 (arg: any): arg is PropsUITextTitle3 {
  return isInstanceOf<PropsUITextTitle3>(arg, 'PropsUITextTitle3', ['text', 'color', 'margin'])
}

export interface PropsUITextTitle4 {
  __type__: 'PropsUITextTitle4'
  text: string
  color?: string
  margin?: string
}
export function isPropsUITextTitle4 (arg: any): arg is PropsUITextTitle4 {
  return isInstanceOf<PropsUITextTitle4>(arg, 'PropsUITextTitle4', ['text', 'color', 'margin'])
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
  return (
    isPropsUIButtonPrimary(arg) ||
    isPropsUIButtonSecundary(arg) ||
    isPropsUIButtonBack(arg) ||
    isPropsUIButtonForward(arg) ||
    isPropsUIButtonIconBack(arg) ||
    isPropsUIButtonIconForward(arg) ||
    isPropsUIButtonIcon(arg) ||
    isPropsUIButtonLabel(arg) ||
    isPropsUIButtonIconLabel(arg)
  )
}

export interface PropsUIButtonPrimary {
  __type__: 'PropsUIButtonPrimary'
  label: string
  color?: string
  enabled?: boolean
  spinning?: boolean
  onClick: () => void
}
export function isPropsUIButtonPrimary (arg: any): arg is PropsUIButtonPrimary {
  return isInstanceOf<PropsUIButtonPrimary>(arg, 'PropsUIButtonPrimary', [
    'label',
    'color',
    'onClick'
  ])
}

export interface PropsUIButtonSecundary {
  __type__: 'PropsUIButtonSecundary'
  label: string
  color?: string
  onClick: () => void
}
export function isPropsUIButtonSecundary (arg: any): arg is PropsUIButtonSecundary {
  return isInstanceOf<PropsUIButtonSecundary>(arg, 'PropsUIButtonSecundary', [
    'label',
    'color',
    'onClick'
  ])
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

export interface PropsUIButtonIconBack {
  __type__: 'PropsUIButtonIconBack'
  onClick: () => void
}
export function isPropsUIButtonIconBack (arg: any): arg is PropsUIButtonIconBack {
  return isInstanceOf<PropsUIButtonIconBack>(arg, 'PropsUIButtonIconBack', ['onClick'])
}

export interface PropsUIButtonIconForward {
  __type__: 'PropsUIButtonIconForward'
  onClick: () => void
}
export function isPropsUIButtonIconForward (arg: any): arg is PropsUIButtonIconForward {
  return isInstanceOf<PropsUIButtonIconForward>(arg, 'PropsUIButtonIconForward', ['onClick'])
}

export interface PropsUIButtonIcon {
  __type__: 'PropsUIButtonIcon'
  icon: string
  onClick: () => void
}
export function isPropsUIButtonIcon (arg: any): arg is PropsUIButtonIcon {
  return isInstanceOf<PropsUIButtonIcon>(arg, 'PropsUIButtonIcon', ['icon', 'onClick'])
}

export interface PropsUIButtonIconLabel {
  __type__: 'PropsUIButtonIconLabel'
  icon: string
  label: string
  color?: string
  alignment?: string
  onClick: () => void
}
export function isPropsUIButtonIconLabel (arg: any): arg is PropsUIButtonIconLabel {
  return isInstanceOf<PropsUIButtonIconLabel>(arg, 'PropsUIButtonIconLabel', [
    'icon',
    'label',
    'color',
    'alignment',
    'onClick'
  ])
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
  return isInstanceOf<PropsUIRadioItem>(arg, 'PropsUIRadioItem', [
    'id',
    'value',
    'selected',
    'onSelect'
  ])
}

// Check box

export interface PropsUICheckBox {
  id: string
  selected: boolean
  size?: string
  onSelect: () => void
}
export function isPropsUICheckBox (arg: any): arg is PropsUICheckBox {
  return isInstanceOf<PropsUICheckBox>(arg, 'PropsUICheckBox', ['id', 'selected', 'onSelect'])
}

// SPINNER

export interface PropsUISpinner {
  __type__: 'PropsUISpinner'
  spinning?: boolean
  color?: string
}
export function isPropsUISpinner (arg: any): arg is PropsUISpinner {
  return isInstanceOf<PropsUISpinner>(arg, 'PropsUISpinner', ['color', 'spinning'])
}

// PROGRESS

export interface PropsUIProgress {
  __type__: 'PropsUIProgress'
  percentage: number
}
export function isPropsUIProgress (arg: any): arg is PropsUIProgress {
  return isInstanceOf<PropsUIProgress>(arg, 'PropsUIProgress', ['percentage'])
}

// Header

export interface PropsUIHeader {
  __type__: 'PropsUIHeader'
  title: Text
}
export function isPropsUIHeader (arg: any): arg is PropsUIHeader {
  return isInstanceOf<PropsUIHeader>(arg, 'PropsUIHeader', ['title'])
}

// Footer

export interface PropsUIFooter {
  __type__: 'PropsUIFooter'
  progressPercentage: number
}
export function isPropsUIFooter (arg: any): arg is PropsUIFooter {
  return isInstanceOf<PropsUIFooter>(arg, 'PropsUIFooter', ['progressPercentage'])
}

// TABLE

export interface PropsUITable {
  __type__: 'PropsUITable'
  id: string
  head: PropsUITableHead
  body: PropsUITableBody
  pageSize?: number
}
export function isPropsUITable (arg: any): arg is PropsUITable {
  return isInstanceOf<PropsUITable>(arg, 'PropsUITable', ['pageSize', 'id', 'head', 'body'])
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

export interface TableContext {
  title: string
  deletedRowCount: number
  annotations: Annotation[]
  originalBody: PropsUITableBody
  deletedRows: string[][]
  visualizations?: VisualizationType[]
}

export type TableWithContext = TableContext & PropsUITable

export interface Annotation {
  row_id: string
  [key: string]: any
}

// SEARCH BAR

export interface PropsUISearchBar {
  __type__: 'PropsUISearchBar'
  search: string
  onSearch: (search: string) => void
  placeholder?: string
  debounce?: number
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

// QUESTION ITEMS

export interface PropsUIQuestionMultipleChoice {
  __type__: 'PropsUIQuestionMultipleChoice'
  id: number
  question: Text
  choices: Text[]
}
export function isPropsUIQuestionMultipleChoice (arg: any): arg is PropsUIQuestionMultipleChoice {
  return isInstanceOf<PropsUIQuestionMultipleChoice>(arg, 'PropsUIQuestionMultipleChoice', ['id', 'question', 'choices'])
}

export interface PropsUIQuestionMultipleChoiceCheckbox {
  __type__: 'PropsUIQuestionMultipleChoiceCheckbox'
  id: number
  question: Text
  choices: Text[]
}
export function isPropsUIQuestionMultipleChoiceCheckbox (arg: any): arg is PropsUIQuestionMultipleChoiceCheckbox {
  return isInstanceOf<PropsUIQuestionMultipleChoiceCheckbox>(arg, 'PropsUIQuestionMultipleChoiceCheckbox', ['id', 'question', 'choices'])
}

export interface PropsUIQuestionOpen {
  __type__: 'PropsUIQuestionOpen'
  id: number
  question: Text
}
export function isPropsUIQuestionOpen (arg: any): arg is PropsUIQuestionOpen {
  return isInstanceOf<PropsUIQuestionOpen>(arg, 'PropsUIQuestionOpen', ['id', 'question'])
}
