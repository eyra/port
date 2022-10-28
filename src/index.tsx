import './fonts.css'
import './framework/styles.css'
import Assembly from './framework/assembly'
import { PyScript } from './py_script'
import LocalSystem from './local_system'

const rootElement = document.getElementById('root') as HTMLElement

const locale = 'en'
const system = new LocalSystem()
const workerFile = new URL('./framework/processing/python/worker.js', import.meta.url)
const worker = new Worker(workerFile)

const assembly = new Assembly(worker, system)
assembly.visualisationEngine.start(rootElement, locale)
assembly.processingEngine.start(PyScript)
