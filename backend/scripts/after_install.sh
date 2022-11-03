#!/bin/bash
echo 'run after_install.sh: ' >> /home/ec2-user/app-db/deploy.log

echo 'cd /home/ec2-user/nodejs-server-cicd' >> /home/ec2-user/app-db/deploy.log
cd /home/ec2-user/app-db >> /home/ec2-user/app-db/deploy.log

echo 'npm install' >> /home/ec2-user/app-db/deploy.log 
npm install >> /home/ec2-user/app-db/deploy.log