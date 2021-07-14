#!/bin/bash
source /home/ec2-user/.bash_profile

sleep 4s
echo "start server"
cd /application

pm2 start npm --name "my-forum" -- start
pm2 save
