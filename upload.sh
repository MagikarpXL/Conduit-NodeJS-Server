#!/bin/bash

LOCAL=/home/magikarpxl/Documents/nodejs/Conduit-NodeJS-Server

# Don't forget to setup SSH keys (http://www.linuxproblem.org/art_9.html)
echo 'Starting to transfer files...'
scp -prq $LOCAL/index.js admin@192.168.11.2:/Conduit-NodeJS-Server/index.js
echo 'Transfered files :D'
