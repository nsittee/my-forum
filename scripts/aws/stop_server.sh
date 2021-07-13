#!/bin/bash
source /home/ec2-user/.bash_profile
echo "stop script"

pm2 stop my-forum || : && echo "pm2 stop"
pm2 delete my-forum || : && echo "pm2 delete"
