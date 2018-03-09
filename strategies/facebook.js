'use strict'

const fs = require('fs')
const path = require('path')
const https = require('https')

const logger = require('agathias').getChild('facebook')

class Facebook {
  constructor (options) {
    this.options = options
    this.type = 'facebook'
  }

  send (templateId, data) {
    logger.debug('[facebook]', { templateId, data })

    let recipients = Array.isArray(data.to) ? data.to : [data.to]

    const rawTemplate = fs.readFileSync(path.join(this.options.templatesPath, `${templateId}.txt`), {
      encoding: 'utf-8'
    })

    const values = extractMergeValues(rawTemplate)

    logger.debug('[facebook]', { rawTemplate, values })

    if (areValuesMissing(values, data.payload)) {
      return Promise.reject(new Error('Missing values'))
    }

    const template = enrichRawTemplate(rawTemplate, values, data.payload)

    const toSend = recipients.map((r) => ({
      to: r,
      template
    }))

    if (process.env.NODE_ENV !== 'production') {
      return Promise.resolve(toSend)
    }

    return Promise.all(toSend.map((data) => sendHelper(this.options.pageAccessToken, data.to, data.template)))
  }
}

function sendHelper (accessToken, recipient, message) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'graph.facebook.com',
      path: '/v2.6/me/messages?access_token=' + accessToken,
      port: 443,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    }
    const body = {
      messaging_type: 'UPDATE',
      recipient: {
        id: recipient
      },
      message: {
        text: message
      }
    }
    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', (chunk) => data += chunk)
      res.on('end', () => resolve(data))
    })

    req.on('error', (error) => reject(error))
    logger.debug(JSON.stringify(body))
    req.write(JSON.stringify(body))
    req.end()
  })
}

/**
 * General
 */
// TODO: Be grouped
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
