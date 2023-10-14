import './fonts.css'
import './framework/styles.css'
import Assembly from './framework/assembly'
import { Storage } from './framework/types/modules'
import LiveStorage from './live_storage'
import FakeStorage from './fake_storage'

const rootElement = document.getElementById('root') as HTMLElement

const locale = 'en'
const workerFile = new URL('./framework/processing/py_worker.js', import.meta.url)
const worker = new Worker(workerFile)

let assembly: Assembly

const run = (system: Storage): void => {
  assembly = new Assembly(worker, system)
  assembly.visualisationEngine.start(rootElement, locale)
  assembly.processingEngine.start()
}

if (process.env.REACT_APP_BUILD!=='standalone' && process.env.NODE_ENV === 'production') {
  // Setup embedded mode (requires to be embedded in iFrame)
  console.log('Initializing storage system')
  LiveStorage.create(window, run)
} else {
  // Setup local development mode
  console.log('Running with fake storage')
  run(new FakeStorage())
}
