'use strict'

const isValidString = function (str) {
  return typeof str === 'string' && str.length >= 2
}

export default {
  validate: function (params) {
    let valid = true

    for (const key in params) {
      const param = params[key]
      
      switch (param.type) {
        case 'string':
          valid = isValidString(param.value)
          break
        default:
          valid = !!param.value
          break
      }

      if (!valid) {
        break
      }
    }

    return valid
  }
}