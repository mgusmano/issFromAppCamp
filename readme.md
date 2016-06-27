to create cordova hybrid app:

copy this project folder and rename folder to iss

go to iss folder in terminal
	(cd iss)

sencha app upgrade ../path/to/framework

sencha cordova init com.Sencha.ISS ISS

cd cordova
cordova plugin add ../Version1.5.0/SPass
cordova plugin add cordova-plugin-geolocation
cd ..

edit line 9 in app.json
                    "platforms": "android",

cp toCopy/SamsungSPass.js app/util/SamsungSPass.js
cp toCopy/Application.js app/Application.js

sencha app run native