# Description

This applications is mostly a merge between a TODO list and a topic list, where each task/topic is split into categories.
It's based on the latest meteor version, and the latest angular version (right now : Meteor 1.8 and Angular 8)

Meteor : https://www.meteor.com/\
Angular :  https://angular.io/
Angular-Meteor : https://github.com/Urigo/angular-meteor 

# How to use :
## Prequisites :
* Node.js (latest or LTS) : https://nodejs.org/en/
* Angular : `npm install -g @angular/cli`
* Meteor :  `curl https://install.meteor.com/ | sh`
 (windows user will need [Chocolatey](https://chocolatey.org/install) to run `choco install meteor`)

## Instructions
* Clone this repository `git clone https://github.com/KyneSilverhide/memo-meteor.git`
* Open folder`cd memo-meteor`
* Install dependencies : `npm install`
* Star development server `npm start`

## Commands
- `$ npm run start` - Run the Meteor application.
- `$ npm run start:prod` - Run the Meteor application in production mode.
- `$ npm run build` - Creates a Meteor build version under `./build/` directory.
- `$ npm run clear` - Resets Meteor's cache and clears the MongoDB collections.
- `$ npm run meteor:update` - Updates Meteor's version and it's dependencies.
- `$ npm run test` - Executes Meteor in test mode with Mocha.
- `$ npm run test:ci` - Executes Meteor in test mode with Mocha for CI (run once).
