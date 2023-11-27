# website-carbon-footprint-extension
A browser extension which measures the carbon footprint of the current website 🌱
# Instruction
To make the application work first clone the repro in a directory of your choice:
``` git clone https://github.com/barbarahuem/website-carbon-footprint-extension.git```
Open the project in the terminal and start the application:
``` npm run watch ```
After starting the application the `dist` folder should be created.
Now go to the Google Chrome Browser open > Extensions > Load unpacked.
Select the dist folder, the manifest file which handles the extension is placed in there.
🎉 hurray - the extension should work now!

Used in project:
## co2.js
https://github.com/thegreenwebfoundation/co2.js/
## Google Page Speed API
https://developers.google.com/speed/docs/insights/v5/get-started?hl=de
## Greencheck API from TheGreenWebFoundation
https://developers.thegreenwebfoundation.org/api/greencheck/v3/check-single-domain/
