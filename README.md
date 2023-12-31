# Trigger Warning Includer for Sensitive Topics (TWIST) App

This project is a Chrome extension built with React to nudge X users to add trigger warnings or content warnings when posting about sensitive topics.

## How to Set Up

1. Create a project directory (I call mine 'twist')

2. Navigate to the directory you just created, and clone the repository.

3. Make sure you have Node.js installed so `npm` will be recognized as valid command.

4. Set up client side

   1. In the project directory, navigate to twist-client

   2. Run `npm install` to install needed dependencies for client side.

   3. Run `npm run build` to build the app for production to the `build` folder.

5. Load unpacked extension in Chrome extensions menu

   1. Switch to developer mode (top right corner switch) if you are not already in developer mode.

   2. Click "load unpacked" button and navigate to twist-client directory.

   3. Click "select folder" button. It should be added as a Chrome extension and another tab will open with some details about the app.

6. Set up server side

   1. In the project directory, navigate to twist-server

   2. Run `npm install` to install needed dependencies for server side.

## How to Run

1. In twist-client directory, run `npm start` to run the app in the development mode.

2. In the twist-server directory, run `node index.js` to start the server.

3. Clear any errors and refresh the app in the Chrome extension menu.

4. Re-load or navigate to the [X posting page](https://twitter.com/compose/tweet).
