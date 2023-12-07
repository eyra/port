<p align="center">
  <a href="https://github.com/eyra/port">
    <img width="40%" height="40%" src="./public/port_logo.svg">
  </a>
</p>

# Port: A frontend for data donation

Port is a research tool that enables individuals to donate their digital trace data for academic research in a secure, transparent, and privacy-preserving way.

Data donation allows researchers to invite participants to share their data download packages (DDPs).
A major challenge is however that DDPs potentially contain very sensitive data, and often not all data is needed to answer the specific research question under investigation.
To circumvent these challenges, an alternative framework was developed:

1. The research participant requests their personal DDP at the platform of interest.
2. They download it onto their own personal device.
3. By means of local processing, only the features of interest to the researcher are extracted from that DDP.
4. The participant inspects the extracted features after which they can consent (or decline) to donate.

To allow for the local processing (step 3) to take place, we developed the software Port.
Port creates a frontend that guides participants through the data donation steps.

Port is open-source and allows for researchers to fully configure their own data donation study.

_Note_: Port is only a frontend. In order for it to be used in a live study, it needs to be hosted with a server and integrate with a solution to store and retrieve the donated data.
This repository will discuss a some readily available options.

## Installation

In order to start a local instance of Port go through the following steps:

0. Pre-requisites

   - Fork or clone this repo
   - Install [Node.js](https://nodejs.org/en)
   - Install [Python](https://www.python.org/)
   - Install [Poetry](https://python-poetry.org/)
   - Install [Earthly CLI](https://earthly.dev/get-earthly)

1. Install dependencies & tools:

   ```sh
   cd ./port
   npm install
   npm run prepare
   ```

2. Start the local web server (with hot reloading enabled):

   ```sh
   npm run start
   ```

3. You can now go to the browser: [`http://localhost:3000`](http://localhost:3000).

If the installation went correctly you should be greeted with a mock data donation study.

## How to use Port

A researcher can implement their own data donation flow by altering the Python script.
The Python scripts has 2 main functions:

1. It determines the data donation flow. i.e. what screens (for example a file prompt) does the participant gets to see and when. You can use the Port API ([`props.py`](src/framework/processing/py/port/api/props.py)) for this.
2. It determines what data gets extract from the participants submission. Here is were Python really shines, you can use most data extraction methods you are familiar with! (As long as it's available in [Pyodide](https://pyodide.org/en/stable/))

A typical script includes the following steps:

1. Prompt the participant to submit a file
2. Handling the submission from step 1. This is the step where you can extract the data you are interested in.
3. The extracted data is presented on screen accompanied with a consent button. After consent is given, the data is sent to a storage location of the researcher.

A example such a script is included in this repo: [`script.py`](src/framework/processing/py/port/script.py).
We recommend you use that script as starting point for your own data donation study.
You can find another example of such a script in this [repository](https://github.com/d3i-infra/port-d3i-pilot).

### Port API examples

Below you can find examples on how to use the Port API in your `script.py`

<details>
    <summary>Main function</summary>
Every `script.py` should have this function:

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

[`ScriptWrapper`](src/framework/processing/py/port/main.py) and [py_worker](src/framework/processing/py_worker.js) using `send` to iterate over the commands one by one. For more information on yield and Generators: https://realpython.com/introduction-to-python-generators

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
<summary>Create a consent page</summary>

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
<summary>Handling the result from a file input</summary>

```Python
page = props.PropsUIPageDonation(platform, header, file_input, footer)
result = yield CommandUIRender(page)

# Result is a dictionary (Payload)
if result.__type__ == "PayloadString":
    # File selected
    filename = result.value
    zipfile = zipfile.ZipFile(filename)

    # Extract the data you are interested contained in zipfile
    # Typically you will use your own written functions here
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

## Use Port in a data donation study

Port serves as the frontend, providing the application with which participants
engage. It defines the flow and logic for data donation. To utilize Port in a
data donation study, it must be hosted on a server capable of storing the
donated data.

You can host Port by embedding it in an
[iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe).
After the iframe loads, send a message that includes a channel. The Port
application will use this channel to relay messages with data ready for storage.
Here's a JavaScript example:

```javascript
// ... wait until the iframe is loaded
const channel = new MessageChannel();
channel.port1.onmessage = (e) => {
  console.log("Message receive from Port app", e);
};
// get the iframe via querySelector or another method
iframe.contentWindow.postMessage("init", "*", [this.channel.port2]);
```

### Data donation as a service

Data donation sounds intriguing but seems like a lot to handle? Don't hesitate
to reach out to [Eyra](https://eyra.co/).

### Previous studies done with Port

Here you can find a [list](https://github.com/eyra/port/wiki/Previous-data-donation-studies) of previous studies that were completed using Port. These studies can serve as inspiration or example for your own data donation study!

# Technical specifications of Port

Port is ready for use out of the box (just update the Python script). However,
if your study requires specific adjustments (new interactive elements etc.), you
have the flexibility to modify Port's functionalities. If customization is what
you're after, leverage the following technical insights to suit your needs.

## Data model

Port uses the following data model (also see: [src/framework/types](src/framework/types))

- [Modules](src/framework/types/modules.ts)

  | Module              | Description                                                |
  | ------------------- | ---------------------------------------------------------- |
  | ProcessingEngine    | Responsible for processing donation flows                  |
  | VisualizationEngine | Responsible for presenting the UI and accepting user input |
  | CommandHandler      | Decoupling of ProcessingEngine and VisualizationEngine     |
  | Bridge              | Callback interface for Bridge Commands (e.g. Donation)    |

- [Pages](src/framework/types/pages.ts)

  | Page         | Description                                                                                         |
  | ------------ | --------------------------------------------------------------------------------------------------- |
  | SplashScreen | First page that is rendered before the Python script is loaded with GDPR consent logic              |
  | Donation     | Page that uses several prompts to get a file from the user and consent to donate the extracted data |
  | End          | Final page with instructions on how to continue                                                     |

- [Prompts](src/framework/types/prompts.ts)

  | Prompt      | Description                                                 |
  | ----------- | ----------------------------------------------------------- |
  | FileInput   | File selection                                              |
  | RadioInput  | Multiple choice question                                    |
  | ConsentForm | Displays extracted data in tables and asks for user consent |
  | Confirm     | General dialog to ask for extra confirmation                |

- [Commands](src/framework/types/commands.ts)

  | Command | Description             |
  | ------- | ----------------------- |
  | Render  | Render the page         |
  | Donate  | Save the extracted data |

  Commands can be send from the Python script using the `yield` keyword.

- [Payloads](src/framework/types/commands.ts)

  | Payload | Description                                                                                                                                                                                                       |
  | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | Void    | Command without user input as a response                                                                                                                                                                          |
  | True    | Positive user input (e.g. Ok button in confirm prompt)                                                                                                                                                            |
  | False   | Negative user input (e.g. Cancel button in confirm prompt)                                                                                                                                                        |
  | Error   | Unexpected problem when handling command                                                                                                                                                                          |
  | String  | String result                                                                                                                                                                                                     |
  | File    | Only used in Javascript. This is intercepted in [py_worker.js](src/framework/processing/py_worker.js) and translated into a String (filename), while the bytes of the file are written to the Pyodide file system |
  | JSON    | User input structured as JSON, used to return the consent data from the consent form                                                                                                                              |

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

- [ScriptWrapper](src/framework/processing/py/port/main.py)

  This object is used in [main](src/framework/processing/py/port/main.py) to wrap the `process` generator function in your script. It translates incoming Javascript and outgoing Python commands.

- [API](src/framework/processing/py/port/api)

  - [commands.py](src/framework/processing/py/port/api/commands.py): Defines commands, pages and prompts that are used to communicate from the Python script to the `VisualisationEngine` and `Bridge`.
  - [props.py](src/framework/processing/py/port/api/commands.py): Defines property objects for pages and prompts

## Code instructions

These instructions give you some pointers on things you might like to change or add to Port.

<details>
<summary>Change copy (texts shown on the web pages)</summary>
<br>
The app has two types of copy:

- Dynamic copy: part of the [Python script](src/framework/processing/py/port/script.py)
- Static copy: part of [React components](src/framework/visualisation/react/ui)

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
<summary>Use external Python libraries</summary>
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

The standard library is available by default. Please check The Pyodide [docs](https://pyodide.org/en/stable/usage/packages-in-pyodide.html) for other packages you can use.

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
import { VisualisationEngine, ProcessingEngine, Bridge } from './types/modules'
import CommandRouter from './command_router'

export default class Assembly {
    visualisationEngine: VisualisationEngine
    processingEngine: ProcessingEngine
    router: CommandRouter

    constructor (worker: Worker, bridge: Bridge) {
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

### Technical notes

#### Code generation

Code in [Javascript types](src/framework/types) and [Python api](src/framework/processing/py/port/api/) are currently created by hand. Since both of them are implementions of the same model we will seek the opportunity in the future to define this model in a more abstract way and generate the needed Javascript and Python code accordingly.

#### React

The project is a react app created by [create-react-app](https://create-react-app.dev). This is not set in stone for the future but it was a nice way to speed up the development process in the beginning. Using this strongly opinionated setup hides most of the configuration. It uses [webpack](https://webpack.js.org/concepts) to bundle and serve the app.

#### Code style

The project uses [ts-standard](https://github.com/standard/ts-standard) for managing the code style. This is a TypeScript Style Guide, with linter and automatic code fixer based on StandardJS.

#### Pre-commit hooks

Before committing to github [Husky](https://github.com/typicode/husky) runs all the necessary scripts to make sure the code conforms to `ts-standard`, all the tests run green, and the `dist` folder is up-to-date.

## Digital Data Donation Infrastructure (D3I)

Port is funded by the PDI-SSH and is a collaboration between six Dutch universities and Eyra.

The consortium is composed of researchers from:

- University of Amsterdam
- Radboud University Nijmegen
- VU Amsterdam
- Utrecht University
- Tilburg University
- Erasmus University Rotterdam

### D3I Pilot

The first phase of the project ended in December 2022 and resulted in an MVP solution to run one Port app on top of a Next bundle. This Next + Port combi can be released as a Docker image and deployed on [Azure Web App Service](https://azure.microsoft.com/en-us/products/app-service/web).

# Contributing

We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features

If you have any questions, find any bugs, or have any ideas, read how to contribute [here](https://github.com/eyra/port/blob/master/CONTRIBUTING.md).
