#!/bin/bash
service_name="dviraciu-remontas"

sudo service $service_name stop
git pull
npm install
npm run-script build
sudo \cp -f $service_name.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable $service_name
sudo service $service_name start
sudo nginx -s reload
