import './fonts.css'
import './framework/styles.css'
import Assembly from './framework/assembly'
import { Bridge } from './framework/types/modules'
import LiveBridge from './live_bridge'
import FakeBridge from './fake_bridge'

const rootElement = document.getElementById('root') as HTMLElement

const locale = 'en'
const workerFile = new URL('./framework/processing/py_worker.js', import.meta.url)
const worker = new Worker(workerFile)

let assembly: Assembly

const run = (bridge: Bridge): void => {
  assembly = new Assembly(worker, bridge)
  assembly.visualisationEngine.start(rootElement, locale)
  assembly.processingEngine.start()
}

if (process.env.NODE_ENV === 'production') {
  // Setup embedded mode (requires to be embedded in iFrame)
  console.log('Initializing system')
  LiveBridge.create(window, run)
} else {
  // Setup local development mode
  console.log('Running with fake bridge')
  run(new FakeBridge())
}
