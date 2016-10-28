# Conduit-NodeJS-Server
[![js-semistandard-style](https://cdn.rawgit.com/flet/semistandard/master/badge.svg)](https://github.com/Flet/semistandard)

A NodeJS server that handles LoRaWAN communication by sending it to another API on the internet.

It's using the semistandard code convention, https://github.com/Flet/semistandard;
Before a commit, please make sure semistandard doesn't give back any errors. If you made a commit to the master branch, please run JSDoc to keep the documentation updated.

upload.sh is a bash script that deploys index.js to 

How to use semistandard:

```sh
semistandard index.js
```
You'll see all the code style errors in your terminal,
if you want to you could let semistandard fix some of them automatically

```sh
semistandard index.js --fix
```

To run JSDoc, use

```sh
./node_modules/.bin/jsdoc index.js
```