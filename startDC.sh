#!/bin/sh

export HOST_IP=$(ifconfig wlp3s0 | grep 'inet ' | cut -d: -f2 | awk '{ print $1 }')
export DOCKER_BRIDGE_IP=$(ifconfig docker0 | grep 'inet ' | cut -d: -f2 | awk '{ print $1 }')
export HOSTNAME=$HOSTNAME

docker-compose up --build