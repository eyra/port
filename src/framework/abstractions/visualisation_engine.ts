export default interface VisualisationEngine {
  start: (script: string, rootElement: HTMLElement, locale: string) => Promise<any>
  terminate: () => void
}
