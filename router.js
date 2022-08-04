'use strict'

import validation from './modules/validation/index.js'
import fileStreamer from './modules/fileStreamer/index.js'
import dataset from './modules/dataset/index.js'
import papaparse from 'papaparse'

const allowedCommands = ['help', 'average']
const DEFAULT_CHARACTERISTIC_NAME = 'Temperature, water'

const router = {
  route: function (args) {
    const request = args.slice(2)
    const command = request[0]
    const params = request.slice(1)

    if (!command) {
      return this.help()
    }
    
    if (!this[command]) {
      return console.error(`Command does not exist, must be one of [${allowedCommands.join(', ')}], type help for details`)
    }

    return this[command](...params)
  },
  average: async function (filePath, locationId, characteristicName = DEFAULT_CHARACTERISTIC_NAME) {
    try {
      // validate inputs
      const valid = validation.validate({
        filePath: {
          type: 'string',
          value: filePath
        },
        locationId: {
          type: 'string',
          value: locationId
        }
      })

      if (!valid) {
        return console.error('One or more parameter is invalid, type help for details')
      }

      // stream file
      const dataStream = fileStreamer.stream(filePath)
      const parseStream = papaparse.parse(papaparse.NODE_STREAM_INPUT, {header: true})

      // pipe to papaparse
      dataStream.pipe(parseStream)

      // let dataset use stream to calculate average ResultValue by checking conditions against each chunk
      // we use stream to help w/ large datasets and not having to run out of memory and be able to complete the request in a single loop of all data
      const result = await dataset.findAverageResultValue(parseStream, locationId, characteristicName)

      return console.log(`Average result value is ${result}, for ${characteristicName}`)
    } catch (e) {
      return console.error('Failed to return average', e)
    }
  },
  help: function () {
    return console.log(
      `
      node index.js <command> <parameters>

      Commands:
        average: <filePath> <MonitoringLocationID> <CharacteristicName>(Optional)  returns the average mean ResultValue for given Location ID & Characteristic
    `
    )
  }
}

export default router