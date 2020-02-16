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

Run the project _(from /build/bundle)_\

**Note :**

* You will need to write a settings-production.json file based on the sample settings.json file in this project
* You'll also have to change the Security configuration and change the URLs to be able to use Google authentication on your production server.
```
MONGO_URL=mongodb://[IP]:27017/myapp PORT=[PORT] ROOT_URL=[http://...] METEOR_SETTINGS=$(cat settings-production.json) node main.js
```

## Docker build
An alternative to the previous build.

### Prequisites :
(Assuming you know how to use docker on Unix or Windows)

* Docker : https://www.docker.com/
* Docker-compose : https://docs.docker.com/compose/

Build the project
```
cd docker
docker build -t yourname/memo-meteor . 
```

Sample docker-compose :
```
version: '3.3'
services:
    mongo:
        image: mongo
        container_name: mongo
        ports:
            - '27017:27017'
        volumes:
            - 'mongodb:/data/db'
        environment:
            - 'MONGO_INITDB_ROOT_USERNAME=XXXXXX'
            - 'MONGO_INITDB_ROOT_PASSWORD=XXXXXX'
        restart: always
    memo-meteor:
        image: kynesilverhide/memo-meteor
        container_name: memometeor
        ports:
            - 8080:8080
        environment:
            - 'MONGO_URL=mongodb://XXXXXX:XXXXXX@mongo:27017/memometeor?authSource=admin'
            - 'PORT=8080'
            - 'ROOT_URL=http://XXXXXXXX:8080'
            - 'METEOR_SETTINGS={PASTE settings.json HERE with "production/development" values}'
        
volumes:
     mongodb:
```

