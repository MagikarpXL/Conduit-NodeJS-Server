#!/bin/bash
# Set the folder where the app is stored
LOCAL=/home/magikarpxl/Documents/nodejs/Conduit-NodeJS-Server

# Don't forget to setup SSH keys (http://www.linuxproblem.org/art_9.html)
echo 'Starting to transfer files...'
scp -prq -P 522 $LOCAL/index.js admin@82.176.177.68:/home/root/Conduit-NodeJS-Server/index.js
echo 'If you have not seen an scp error, index.js was succesfully transfered'
