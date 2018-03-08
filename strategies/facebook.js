'use strict'

const fs = require('fs')
const path = require('path')

const logger = require('agathias').getChild('facebook')

class Facebook {
  constructor (options) {
    this.options = options
    this.type = 'facebook'
  }

  send (templateId, data) {
    logger.debug('[facebook]', { templateId, data })

    let recipients = Array.isArray(data.to) ? data.to : [data.to]

    return new Promise((resolve, reject) => {
      const rawTemplate = fs.readFileSync(path.join(this.options.templatesPath, `${templateId}.txt`), {
        encoding: 'utf-8'
      })
      logger.debug('[facebook]', { rawTemplate })
      const values = extractMergeValues(rawTemplate)

      if (areValuesMissing(values, data.payload)) {
        return reject(new Error('Missing values'))
      }

      const template = enrichRawTemplate(rawTemplate, values, data.payload)

      if (process.env.NODE_ENV !== 'production') {
        return resolve(recipients.map((r) => ({
          to: r,
          template
        })))
      }
    })
  }
}

function extractMergeValues (text) {
  return text
    .match(/\*\|(\w*)\|\*/g)
    .reduce((acc, curr) => {
      if (!acc.includes(curr)) {
        acc.push(curr)
      }

      return acc
    }, [])
}

function areValuesMissing (requiredValues, values) {
  for (let rv of requiredValues) {
    if (!values[stripMergeValue(rv)]) {
      return true
    }
  }

  return false
}

function enrichRawTemplate (rawTemplate, requiredValues, values) {
  let t = rawTemplate

  requiredValues.forEach((rv) => {
    const v = values[stripMergeValue(rv)]

    rv = rv
      .replace(/\*/g, '\\*')
      .replace(/\|/g, '\\|')

    t = t.replace(new RegExp(rv, 'g'), v)
  })

  return t
}

function stripMergeValue (text) {
  return text.replace(/[*|]/g, '')
}

module.exports = Facebook
