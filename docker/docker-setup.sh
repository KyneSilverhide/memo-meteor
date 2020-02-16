#!/bin/bash

curl https://install.meteor.com/?release=1.8.1 | sh
mkdir -p /app

cd /app
git clone https://github.com/KyneSilverhide/memo-meteor.git 
cd memo-meteor 
npm install
meteor build build/ 

cd build/
tar xvzf memo-meteor.tar.gz  
mv bundle/* /app/

cd /app/programs/server 
npm install --production

rm -rf ~/.meteor
rm -rf /app/memo-meteor 
