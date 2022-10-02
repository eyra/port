# Port

## Description
Research tool for transparent donation of digital trace data by citizens. 

## Start
Run the following command in the root of the project to fetch all dependencies:

    npm install

Run the following command to start the local web server (with hotloading enabled):

    npm run dev:start

Start the app by browsing to: [http://localhost:3000](http://localhost:3000).

## Development

### React
The project is a react app created by [create-react-app](https://create-react-app.dev). This is not set in stone for the future but it was a nice way to speed up the development process in the beginning. Using this stronly opinionated setup hides most of the configuration. It uses webpack (dev server) under the hood to bundle and serve the app. 

### App logic
The app logic can be divided in 3 parts:
1. Intro
2. Donation 
3. Outro

The intro and outro logic (welcome/thank you) is implemented in `src/framework/visualisation/react/engine.ts`
The actual donation logic can be found in `src/py_script.ts`. That file exports a string which is a Python script.

Note: the Python wrapped in a Typescript file is temporary and needs to be replaced by something like [raw-loader](https://v4.webpack.js.org/loaders/raw-loader/) or [file-loader](https://v4.webpack.js.org/loaders/file-loader/). These loaders make sure the Python file is runtime available as an online resource. 

### UI Components
Adding new React components can be done in the `src/framework/visualisation/react/components` folder. Make sure to add the component also to `src/framework/visualisation/react/factory.ts`. 
To be able to create the new component directly from a Python script make sure to add a class to `pyPortApi` in `src/framework/processing/python/worker.js`.

### Testing
[Jest](https://jestjs.io) is used as a testing framework. All the tests can be found here: `src/test`.

### Code style
The project uses [ts-standard](https://github.com/standard/ts-standard) for managing the code style. This is a TypeScript Style Guide, with linter and automatic code fixer based on StandardJS.

### Pre-commit hooks
Before committing to github [Husky](https://github.com/typicode/husky) runs all the necessary scripts to make sure the code conforms to `ts-standard`, all the tests run green, and the `dist` folder is up-to-date.

## Releases
We don't formally release the project as npm package yet. For now clients can install this project directly via github by running the following command:  

    npm install eyra/port

The `dist` folder contains everything clients needs to run integrate the port tool.


