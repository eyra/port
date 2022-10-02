export default interface ProcessingEngine {
  start: () => void
  loadScript: (script: any) => void
  firstRunCycle: () => void
  nextRunCycle: (response: any) => void
  terminate: () => void
}
