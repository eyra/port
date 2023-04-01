# Port

Port is a research tool that enables individuals to donate their digital trace data for academic research in a secure, transparent, and privacy-preserving way. 

## Digital Data Donation Infrastructure (D3I)

The D3i project is funded by the PDI-SSH and is a collaboration between six Dutch universities and Eyra.

The consortium is composed of researchers from:

* University of Amsterdam
* Radboud University Nijmegen 
* VU Amsterdam
* Utrecht University
* Tilburg University
* Erasmus University Rotterdam

## D3i Pilot

The first phase of the project ended in December 2022 and resulted in an MVP solution to run one Port app on top of a Next bundle. This Next + Port combi can be released as a Docker image and deployed on [Azure Web App Service](https://azure.microsoft.com/en-us/products/app-service/web).

## Development setup 

0. Pre-requisites

    * Fork and clone this repo
    * Install [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
    * Must-have knowledge:
        * Python
        * Javascript
        * [Typescript](https://www.typescriptlang.org/docs)
    * Should-have knowledge:
        * [Tailwind CSS](https://tailwindcss.com/docs/installation)
        * [React](https://reactjs.org/docs/getting-started.html)
    * Could-have knowledge:
        * [Create React App](https://create-react-app.dev)
        * [webpack](https://webpack.js.org/concepts)
        
1. Install dependencies:

    ```sh
    npm install
    ```

2. Start the local web server (with hotloading enabled):

    ```sh
    npm run dev:start
    ```

3. Go to the browser: [http://localhost:3000](http://localhost:3000).

## Data model

See: [src/framework/types](src/framework/types)

* [Modules](src/framework/types/modules.ts)

    | Module  | Description |
    | ------------- | ------------- |
    | ProcessingEngine | Responsible for processing donation flows |
    | VisualizationEngine | Responsible for presenting the UI and accepting user input |
    | CommandHandler | Decoupling of ProcessingEngine and VisualizationEngine |
    | System | Callback interface for System Commands (e.g. Donation) |

* [Pages](src/framework/types/pages.ts)

    | Page  | Description |
    | ------------- | ------------- |
    | SplashScreen | First page that is rendered before the Python script is loaded with GDPR consent logic |
    | Donation | Page that uses several prompts to get a file from the user and consent to donate the extracted data |
    | End | Final page with instructions on how to continue |

* [Prompts](src/framework/types/prompts.ts)

    | Prompt  | Description |
    | ------------- | ------------- |
    | FileInput | File selection |
    | RadioInput | Multiple choice question |
    | ConsentForm | Displays extracted data in tables and asks for user consent |
    | Confirm | General dialog to ask for extra confirmation |

* [Commands](src/framework/types/commands.ts)

    | Command  | Description |
    | ------------- | ------------- |
    | Render | Render the page |
    | Donate | Save the extracted data |

    Commands can be send from the Python script using the `yield` keyword. 

* [Payloads](src/framework/types/commands.ts)

    | Payload  | Description |
    | ------------- | ------------- |
    | Void | Command without user input as a response |
    | True | Positive user input (e.g. Ok button in confirm prompt) |
    | False | Negative user input (e.g. Cancel button in confirm prompt) |
    | Error | Unexpected problem when handling command |
    | String | String result |
    | File | Only used in Javascript. This is intercepted in [py_worker.js](src/framework/processing/py_worker.js) and translated into a String (filename), while the bytes of the file are written to the Pyodide file system |
    | JSON | User input structured as JSON, used to return the consent data from the consent form |

    Payloads are part of a Response back to the Python script after sending commands:

    ```Javascript
    export interface Response {
        __type__: 'Response'
        command: Command
        payload: Payload
    }
    ```
    Responses are intercepted in [py_worker.js](src/framework/processing/py_worker.js) and only the payload is returned to the Python script. Payloads don't have a Python representation in the [API](src/framework/processing/py/port/api) yet. They are translated into a dictionary (default Pyodide behaviour).

## Python-Javascript interoperability

See: [src/framework/processing/py/port](src/framework/processing/py/port)

* [ScriptWrapper](src/framework/processing/py/port/main.py) 

    This object is used in [main](src/framework/processing/py/port/main.py) to wrap the `process` generator function in your script. It translates incoming Javascript and outgoing Python commands. 

* [API](src/framework/processing/py/port/api) 

    - [commands.py](src/framework/processing/py/port/api/commands.py): Defines commands, pages and prompts that are used to communicate from the Python script to the `VisualisationEngine` and `System`.
    - [props.py](src/framework/processing/py/port/api/commands.py): Defines property objects for pages and prompts

## Python script examples

In Port, a data donation flow is determined by a Python script. A typical data donation flow consists of these steps:

1. Prompt the participant to submit a file
2. Handling the results from step 1. This is the step where you can extract the data you are interested in.
3. The extracted data is presented on screen accompanied with a consent button. After consent is given, the data is sent to a storage location of the researcher.

A flow like this can be created with a Python script making use of predetermined building blocks. 
The examples on how you could use these blocks are outlined in detail below.

The examples are based on the example script that can be found here: [src/framework/processing/py/port/script.py](src/framework/processing/py/port/script.py). We recommend you changing that script to fit your personal needs.

<details>
    <summary>Main function</summary>
Every script should have this function:

```Python
def process(sessionId):
```

This function is a generator of commands by using `yield` statements. No `return` statements should be used.

```Python
def process(sessionId):
    result1 = yield CommandUIRender(page1)
    result2 = yield CommandUIRender(page2)
    # last yield should not expect a result
    yield CommandUIRender(page3)
```

[ScriptWrapper](src/framework/processing/py/port/main.py) and [py_worker](src/framework/processing/py_worker.js) using `send` to iterate over the commands one by one. For more information on yield and Generators: https://realpython.com/introduction-to-python-generators
</details>

<details>
<summary>API imports</summary>

```Python
from port.api.props as props
from port.api.commands import (CommandUIRender, CommandUIDonate)
```
</details>

<details>
<summary>Create file input</summary>

```Python
platform = "Twitter"
progress = 25

file_input_description = props.Translatable({
    "en": f"Please follow the download instructions and choose the file that you stored on your device. Click “Skip” at the right bottom, if you do not have a {platform} file. ",
    "nl": f"Volg de download instructies en kies het bestand dat u opgeslagen heeft op uw apparaat. Als u geen {platform} bestand heeft klik dan op “Overslaan” rechts onder."
})
allowed_extensions = "application/zip, text/plain"
file_input = props.PropsUIPromptFileInput(file_input_description, allowed_extensions)
```
</details>

<details>
<summary>Create consent form</summary>

```Python
import pandas as pd

table1_title = props.Translatable({
    "en": "Title 1",
    "nl": "Titel 1"
})
table1_data = pd.DataFrame(data, columns=["columnX", "columnY", "columnZ"])
table1 = props.PropsUIPromptConsentFormTable("table_1", table1_title, table1_data)

table2_title = props.Translatable({
    "en": "Title 2",
    "nl": "Titel 2"
})
table2_data = pd.DataFrame(data, columns=["columnA", "columnB", "columnC", "columnD"])
table2 = props.PropsUIPromptConsentFormTable("table_2", table2_title, table2_data)

tables = [table1, table1]
# Meta tables currently not supported
meta_tables = []

consent_form = props.PropsUIPromptConsentForm(tables, meta_tables)
```
</details>

<details>
<summary>Create donation page</summary>

```Python   
header = props.PropsUIHeader(title)
footer = props.PropsUIFooter(progress)
body = props.PropsUIPromptFileInput(file_input_description, allowed_extensions)
page = props.PropsUIPageDonation(platform, header, body, footer)
```
</details>

<details>
<summary>Create page with radio buttons</summary>

```Python   
header = props.PropsUIHeader(title)
footer = props.PropsUIFooter(progress)
body = props.PropsUIPromptRadioInput(title, description, [{"id": 0, "value": "Selection 1"}, {"id": 1, "value": "Selection 2"}])
page = props.PropsUIPageDonation(platform, header, body, footer)
```

</details>

<details>
<summary>Handling file input result</summary>

```Python
page = props.PropsUIPageDonation(platform, header, file_input, footer)
result = yield CommandUIRender(page)

# Result is a dictionary (Payload)
if result.__type__ == "PayloadString":
    # File selected
    filename = result.value
    zipfile = zipfile.ZipFile(filename)

    # Extract the data you are interested contained in zipfile
    ...
else:
    # No file selected
```
</details>

<details>
<summary>Handling consent result</summary>

```Python
platform = "Twitter"
donation_key = f"{sessionId}-{platform}" 
page = props.PropsUIPageDonation(platform, header, consent_form, footer)
result = yield CommandUIRender(page)

# Response is a dictionary (Payload)
if result.__type__ == "PayloadJSON":
    # User gave consent
    yield CommandSystemDonate(donation_key, result.value)
else:
    # User declined or skipped    
```
</details>

<details>
<summary>Track user behaviour</summary>

```Python
tracking_key = f"{sessionId}-tracking" 
data = "any json string"

# Use the donate command to store tracking data
yield CommandSystemDonate(tracking_key, data)
```
</details>


## Code instructions

<details>
<summary>Change copy (texts shown on the web pages)</summary>
<br>
The app has two types of copy:

* Dynamic copy: part of the [Python script](src/framework/processing/py/port/script.py)
* Static copy: part of [React components](src/framework/visualisation/react/ui)

Currently two languages are supported (Dutch and English). The Translatable object plays a central role and has a [Python](src/framework/processing/py/port/api/props.py) and a [Typescript](src/framework/types/elements.ts) implementation

From Python code copy can be used as follows:

```Python
from port.api.props import Translatable

copy = Translatable({
    "en": "English text",
    "nl": "Nederlandse tekst"
})
```   

In React components copy is handled as follows:

```Typescript
import TextBundle from '../../../../text_bundle'
import { Translator } from '../../../../translator'
import { Translatable } from '../../../../types/elements'

interface Props {
    dynamicCopy: Translatable // from Python script
    locale: string
}

export const MyComponent = ({ dynamicCopy, locale }: Props): JSX.Element => {
    const dynamicText = Translator.translate(dynamicCopy, locale)
    const staticText = Translator.translate(staticCopy(), locale)

    return (
        <>
            <div>{dynamicText}</div>
            <div>{staticText}</div>
        </>
    )
}

const staticCopy = (): Translatable => {
    return new TextBundle()
        .add('en', 'English')
        .add('nl', 'Nederlands')
}
```
</details>

<details>
<summary>Add new prompt</summary>
<br>
Add the properties of the prompt in [src/framework/types/prompts.ts](src/framework/types/prompts.ts) with the following template:

```Typescript
export type PropsUIPrompt =
    PropsUIPromptNew |
    ...

export interface PropsUIPromptNew {
    __type__: 'PropsUIPromptNew'
    title: Text
    description: Text
    ...
}
export function isPropsUIPromptNew (arg: any): arg is PropsUIPromptNew {
    return isInstanceOf<PropsUIPromptNew>(arg, 'PropsUIPromptNew', ['title', 'description', ... ])
}
```

Add the prompt component to [src/framework/visualisation/react/ui/prompts](src/framework/visualisation/react/ui/prompts) with the following template:

```Typescript
import { Weak } from '../../../../helpers'
import { ReactFactoryContext } from '../../factory'
import { PropsUIPromptNew } from '../../../../types/prompts'
import { Translator } from '../../../../translator'
import { Title2, BodyLarge } from '../elements/text'
import { PrimaryButton } from '../elements/button'

type Props = Weak<PropsUIPromptNew> & ReactFactoryContext

export const New = (props: Props): JSX.Element => {
    const { resolve } = props
    const { title, description, continueButton } = prepareCopy(props)

    function handleContinue (): void {
        // Send payload back to script
        resolve?.({ __type__: 'PayloadTrue', value: true })
    }

    return (
        <>
            <Title2 text={title} />
            <BodyLarge text={description} />
            <PrimaryButton label={continueButton} onClick={handleContinue} />
        </>
    )
}

interface Copy {
    title: string
    description: string
    continueButton: string
}

function prepareCopy ({ title, locale }: Props): Copy {
    return {
        title: Translator.translate(title, locale),
        description: Translator.translate(description, locale),
        continueButton: Translator.translate(continueButtonLabel(), locale),
    }
}

const continueButtonLabel = (): Translatable => {
    return new TextBundle()
        .add('en', 'Continue')
        .add('nl', 'Verder')
}
```
</details>

<details>
<summary>Use external Python library</summary>
<br>
Python packages are loaded using micropip:

```Python
await micropip.install("https://domain.com/path/to/python.whl", deps=False)
```    

Add the above statement to the [py_worker.js](src/framework/processing/py_worker.js) file as follows:

```Javascript
function installPortPackage() {
    console.log('[ProcessingWorker] load port package')
    return self.pyodide.runPythonAsync(`
        import micropip
        await micropip.install("https://domain.com/path/to/python.whl", deps=False)
        await micropip.install("/port-0.0.0-py3-none-any.whl", deps=False)

        import port
    `);  
}
```
</details>

<details>
<summary>Implement support for alternative web framework</summary>
<br>
Create a new folder in [src/framework/visualisation](src/framework/visualisation) with a file inside called `engine.ts` to add support for your web framework of choice.

```Typescript
import { VisualisationEngine } from '../../types/modules'
import { Response, CommandUIRender } from '../../types/commands'

export default class MyEngine implements VisualisationEngine {
    locale!: string
    root!: HTMLElement

    start (root: HTMLElement, locale: string): void {
        this.root = root
        this.locale = locale
    }

    async render (command: CommandUIRender): Promise<Response> {
        // Render page and return user input as a response
        ...
    }

    terminate (): void {
        ...
    }
}
```

Change implementation of [assembly.ts](src/framework/assembly.ts) to support your new VisualisationEngine:

```Typescript
import MyEngine from './visualisation/my/engine'
import WorkerProcessingEngine from './processing/worker_engine'
import { VisualisationEngine, ProcessingEngine, System } from './types/modules'
import CommandRouter from './command_router'

export default class Assembly {
    visualisationEngine: VisualisationEngine
    processingEngine: ProcessingEngine
    router: CommandRouter

    constructor (worker: Worker, system: System) {
        const sessionId = String(Date.now())
        this.visualisationEngine = new MyEngine()
        this.router = new CommandRouter(system, this.visualisationEngine)
        this.processingEngine = new WorkerProcessingEngine(sessionId, worker, this.router)
    }
}    
```
</details>

<details>
<summary>Implement support for alternative script language</summary>
<br>
To support an alternative for Python scripts, create a Javascript file (eg: `my_worker.js`) in [src/framework/processing](src/framework/processing) with the following template:

```Javascript
onmessage = (event) => {
    const { eventType } = event.data
    switch (eventType) {
        case 'initialise':
            // Insert initialisation code here
            self.postMessage({ eventType: 'initialiseDone' })
            break

        case 'firstRunCycle':
            runCycle(null)
            break

        case 'nextRunCycle':
            const { response } = event.data
            runCycle(response.payload)
            break

        default:
            console.log('[ProcessingWorker] Received unsupported event: ', eventType)
    }
}

function runCycle (payload) {
    console.log('[ProcessingWorker] runCycle ' + JSON.stringify(payload))
    // Insert script code here:
    // 1. Handle the payload
    // 2. Create next command, eg: 
    nextCommand = new CommandUIRender(new PropsUIPageDonation(...)) 
    self.postMessage({
        eventType: 'runCycleDone',
        scriptEvent: nextCommand
    })
}
``` 

Change the implementation of [index.tsx](src/index.tsx) to support your new worker file:

```Typescript
const workerFile = new URL('./framework/processing/my_worker.js', import.meta.url)
```

Make sure to add the worker to the `ts-standard` ignore list in [package.json](package.json):

```JSON
"ts-standard": {
    "ignore": [
        "src/framework/processing/my_worker.js"
    ]
}
```    

Note: don't forget to import this new worker file in your server code
</details>

## Testing

1. Automatic

    [Jest](https://jestjs.io) is used as a testing framework. Tests can be found here: [src/test](src/test).

    Run all unit tests:

    ```sh
    npm run dev:test
    ```

2. Manual
    
    Start the local web server (with hotloading enabled):

    ```sh
    npm run dev:start
    ```

3. Integration with Next

    To run the Port app on top of Next locally see: https://github.com/eyra/mono/blob/d3i/latest/PORT.md

## Release instructions

1. Create production code

    ```sh
    npm run prod:clean
    npm run prod:build
    ```

    The production code can now be found in the `dist` folder. 

2. Run code on top of Next in Azure.

    For instructions on running Next + Port see: https://github.com/eyra/mono/blob/d3i/latest/PORT.md 

## Custom integration

If you want to use your own server solution (in stead of Next), please follow the instuctions below:

<details>
<summary>Add Port app as dependency</summary>
<br>
Make sure to link your forked Port app as a dependency in your web server code. If `npm` is your dependency manager, add a dependency in `package.json` as follows:

```json
"dependencies": {
    "port": "github:<your_organisation>/port",
},
```  

And resolve dependencies:

```sh
npm install
```
</details>

<details>
<summary>Import code from Port dist folder</summary>

```Javascript
import Assembly from "port/dist/framework/assembly";
import Worker from "port/dist/framework/processing/py_worker.js";

import "port/dist/port-0.0.0-py3-none-any.whl";
import "port/dist/styles.css";
```

In this example above imports can be resolved by Webpack (worker-loader, css-loader, and file-loader). Make sure to include the correct config in your `webpack.config.js`:

```Javascript
module: {
    rules: [
        {
            test: /worker\.js$/,
            use: { loader: "worker-loader" },
        },
        {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
        },
        {
            test: /\.whl$/,
            use: [
            {
                loader: "file-loader",
                options: { name: "[name].[ext]", outputPath: "../" },
                },
            ],
        },
    ]
}
```  
</details>

<details>
<summary>Implement System callback interface</summary>

```Typescript
// Typescript example
import { CommandSystem, CommandSystemDonate, isCommandSystemDonate } from 'port/dist/framework/types/commands'
import { System } from 'port/dist/framework/types/modules'

export default class MySystem implements System {
    send (command: CommandSystem): void {
        if (isCommandSystemDonate(command)) {
            this.handleDonation(command)
        } else {
            console.log('[LocalSystem] received unknown command: ' + JSON.stringify(command))
        }
    } 

    handleDonation (command: CommandSystemDonate): void {
        console.log(`[LocalSystem] received donation: ${command.key}=${command.json_string}`)
    }
}
```
</details>

<details>
<summary>Implement start donation session</summary>

```Typescript
// Typescript example
import MySystem from "my_system.ts";
import Assembly from "port/dist/framework/assembly";
import Worker from "port/dist/framework/processing/py_worker.js";

import "port/dist/port-0.0.0-py3-none-any.whl";
import "port/dist/styles.css";

const locale = 'en' // preferred locale
const parent = 'parent_id' // parent DOM element id

const worker = new Worker();
const system = new MySystem();
const container = document.getElementById(parent);

this.assembly = new Assembly(worker, system);
this.assembly.visualisationEngine.start(container, locale);
this.assembly.processingEngine.start();
```
Workers can not be reused over sessions. Re-run code above for every new donation session.

</details>

## Technical notes

### Code generation
Code in [Javascript types](src/framework/types) and [Python api](src/framework/processing/py/port/api/) are currently created by hand. Since both of them are implementions of the same model we will seek the opportunity in the future to define this model in a more abstract way and generate the needed Javascript and Python code accordingly.

### React
The project is a react app created by [create-react-app](https://create-react-app.dev). This is not set in stone for the future but it was a nice way to speed up the development process in the beginning. Using this strongly opinionated setup hides most of the configuration. It uses [webpack](https://webpack.js.org/concepts) to bundle and serve the app. 

### Code style
The project uses [ts-standard](https://github.com/standard/ts-standard) for managing the code style. This is a TypeScript Style Guide, with linter and automatic code fixer based on StandardJS.

### Pre-commit hooks
Before committing to github [Husky](https://github.com/typicode/husky) runs all the necessary scripts to make sure the code conforms to `ts-standard`, all the tests run green, and the `dist` folder is up-to-date.
