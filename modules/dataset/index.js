'use strict'

export default {
  findAverageResultValue: function (stream, locationId, characteristicName) {
    return new Promise((resolve, reject) => {
      // Iterate over each chunk of data and accumulate values and count the number of values so we can get the average

      let accumulatedValue = 0
      let count = 0
      let found = false
      
      stream.on('data', chunk => {
        if (chunk.MonitoringLocationID === locationId && chunk.CharacteristicName === characteristicName) {
          found = true
          count++
          accumulatedValue += parseFloat(chunk.ResultValue || 0)
        }
      })

      stream.on('finish', () => {
        if (!found) {
          return reject('Failed to find data for given locationId and Characteristic Name')
        }

        return resolve(accumulatedValue / count)
      })
    })
  }
}