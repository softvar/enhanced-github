#! /bin/bash
# replaces localhost with fly io endpoint

#sed -i 's/https:\/\/turbosrc-service.fly.dev/http:\/\/localhost:4000/g' src/inject.js
#sed -i 's/https:\/\/turbosrc-service.fly.dev/http:\/\/localhost:4000/g' src/requests.js
#sed -i 's/https:\/\/turbosrc-auth.fly.dev\/authenticate/http:\/\/localhost:5000\/authenticate/g' src/inject.js
sed -i 's/http:\/\/localhost:4000/https:\/\/turbosrc-service.fly.dev/g' src/inject.js
sed -i 's/http:\/\/localhost:4000/https:\/\/turbosrc-service.fly.dev/g' src/requests.js
sed -i 's/http:\/\/localhost:5000\/authenticate/https:\/\/turbosrc-auth.fly.dev\/authenticate/g' src/inject.js
