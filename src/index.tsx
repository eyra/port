import './fonts.css'
import './framework/styles.css'
import { Assembly } from './framework/assembly'
import { PyScript } from './py_script'

const workerFile = new URL('./framework/processing/python/worker.js', import.meta.url)
const worker = new Worker(workerFile)

const rootElement = document.getElementById('root') as HTMLElement
const visualisationEngine = Assembly(worker)
visualisationEngine.start(PyScript, rootElement, 'en').then(
  () => {},
  () => {}
)
