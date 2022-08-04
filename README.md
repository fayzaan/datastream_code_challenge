# datastream_code_challenge

This app takes in CSV file and finds the average (mean) ResultValue based on the specified MonitoringLocationID and the specified Characteristic Name. Please note, the default Characteristic Name (if not provided), is "Temperature, water".

We stream the CSV file to calculate the average so that we don't have to load the entire file into memory or do multiple loops, to prevent causing slowdowns or crash. As the chunks are streamed and parsed, we read the ResultValue for the specified criteria and accumulate the total while also tracking the total count of matched ResultValues to calculate the average.

## Requirements
In order to run this app, you are required to have Node v16+ installed and npm to install dependencies. The test.csv file is already included to run the app against.

## How To Use

- run npm install
- in root directory, run node index.js <command> <paramaters>

## Commands
- average: \<filePath> \<MonitoringLocationID> \<CharacteristicName>(Optional) returns the average mean ResultValue for given Location ID & Characteristic
- help: returns list of available commands to run




