'use strict'

import * as fs from 'fs'
import * as https from 'https'

import * as Agathias from 'agathias'

import { Strategy } from '../lib/strategy'

class Facebook implements Strategy {
  templatesPath: string
  type: string

  logger

  pageAccessToken: string

  constructor (options) {
    this.templatesPath = options.templatesPath
    this.type = 'facebook'

    this.logger = Agathias.getChild('facebook')

    this.pageAccessToken = options.pageAccessToken
  }

  async send (templateId, data) {
    this.logger.debug({ templateId, data })

    if (data.to === undefined || data.payload === undefined) {
      return Promise.reject(new Error('Missing parameters'))
    }

    const recipients = Array.isArray(data.to) ? data.to : [data.to]

    let rawTemplate
    try {
      rawTemplate = fs.readFileSync(`${this.templatesPath}/${templateId}.txt`, {
        encoding: 'utf-8'
      })
    } catch (error) {
      return Promise.reject(error)
    }

    const template = Strategy.fillMergeValueTemplate(rawTemplate, data.payload)

    const templatesToSend = recipients.map((recipient) => ({
      to: recipient,
      template
    }))

    if (process.env.NODE_ENV !== 'production') {
      this.logger.debug({ templatesToSend })
      return Promise.resolve(templatesToSend)
    }

    return Promise.all(templatesToSend.map((data) =>
      this.sendHelper(data.recipient, data.template)))
  }

  private sendHelper (recipient, template) {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'graph.facebook.com',
        path: '/v2.6/me/messages?access_token=' + this.pageAccessToken,
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
          text: template
        }
      }

      const req = https.request(options, (res) => {
        let data = ''
        res.on('data', (chunk) => data += chunk)
        res.on('end', () => resolve(data))
      })

      req.on('error', (error) => reject(error))

      req.write(JSON.stringify(body).replace(/\\\\n/g, '\\n'))

      req.end()
    })
  }
}

module.exports = Facebook
