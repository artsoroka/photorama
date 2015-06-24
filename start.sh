#!/bin/bash
appEnv=$(curl -XGET localhost:8000/PHOTORAMA.env); 
if [ -z "$appEnv" ]
then 
    echo "Could not get config "  && exit 1
else 
    echo $appEnv node app.js | bash; 
fi