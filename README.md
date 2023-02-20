# Calendar Application

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts For Running the Application

* Firstly clone the project in your local system.
*In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
## Running of the Application and Code Structure

* Used `React` for the functionality and TailwindCSS for `styling`. 
* All the components are maintained in a separate folder in `src/components`. 
* Inside of components there will be `calendar component` and `input box component`. 
* `Input box component` store the code for `input date` from the user which needs to be `passed to Reusable Calendar component as props`. 
* `Errors handling` for the input box is done in the `inputValidation` method in the input-box.tsx file. 
* All the logic behind the plotting of the data is done in `getCalendarValues, arrayChunk and fillingLastArrayvalues` in `calendar.tsx`. 
* `Relevant comments` are added for each and every file to maintain the code `readability`. 
* Application is `hosted` using `Github Pages`. 