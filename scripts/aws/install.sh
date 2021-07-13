#!/bin/bash
source /home/ec2-user/.bash_profile
echo "install"
cd /application

npm run server:install
npm run client:install
npm run client:build
