#!/bin/bash
source /home/ec2-user/.bash_profile
echo "install"
cd /application

npm run client:install
npm run client:build
npm run server:install
