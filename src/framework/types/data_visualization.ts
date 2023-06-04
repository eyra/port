import { isInstanceOf } from '../helpers'

export interface VisualizationSettings {
  type: 'keyword_frequency' | 'word_frequency' | 'something_else'
  keyword?: string
}

export interface PropsUIDataVisualization {
  __type__: 'PropsUIDataVisualization'
  id: string
  settings: VisualizationSettings
}
// export function isPropsUIDataVisualization(arg: any): arg is PropsUIDataVisualization {
//   return isInstanceOf<PropsUIDataVisualization>(arg, 'PropsUIDataVisualization', ['id', 'title', 'data_frame', 'settings'])
// }
