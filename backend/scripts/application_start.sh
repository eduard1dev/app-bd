#!/bin/bash

echo 'run application_start.sh: ' >> /home/ec2-user/app-db/deploy.log

echo 'genereting dist' >> /home/ec2-user/app-db/deploy.log
cd home/ec2-user/app-db && npx tsc

echo 'pm2 restart app-db' >> /home/ec2-user/app-db/deploy.log
pm2 restart app-db >> /home/ec2-user/app-db/deploy.log