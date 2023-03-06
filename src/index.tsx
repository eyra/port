import './fonts.css'
import './framework/styles.css'
import Assembly from './framework/assembly'
import LocalSystem from './local_system'

const rootElement = document.getElementById('root') as HTMLElement

const locale = 'nl'
const system = new LocalSystem()
const workerFile = new URL('./framework/processing/py_worker.js', import.meta.url)
const worker = new Worker(workerFile)

const assembly = new Assembly(worker, system)
assembly.visualisationEngine.start(rootElement, locale)
assembly.processingEngine.start()
