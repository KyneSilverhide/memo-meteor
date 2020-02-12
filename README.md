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

## Production build
Bundle the project
```
meteor build ../build
```
Unpack the bundle, install dependencies
```
cd ../build
tar xvzf memo-meteor.tar.gz
cd bundle/programs/server
npm install // This works only with node 10
```

Run the project (from /build/bundle)
```
MONGO_URL=mongodb://[IP]:27017/myapp PORT=[PORT] ROOT_URL=[http://...] node main.js
```

Note : You'll also have to change the Security configuration and change the URLs to be able to use Google authentication on your production server.
