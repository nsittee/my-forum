#!/bin/bash
source /home/ec2-user/.bash_profile

sleep 4s
echo "install"
cd /application

npm run server:install
npm run client:install
npm run client:build
