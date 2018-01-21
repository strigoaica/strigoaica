'use strict'

const fs = require('fs')
const nodemailer = require('nodemailer')

const extractor = require('../lib/utils/extractor')
const embeddor = require('../lib/utils/embeddor')

class MailDev {
  constructor (options) {
    Object.assign(options, { port: 1025 })
    // TODO: Extend Email class
    this.smtpTransport = nodemailer.createTransport({
      host: options.host || 'localhost',
      port: options.port || 1025,
      ignoreTLS: options.ignoreTLS || true
    })

    this.templatesPath = options.templatesPath
  }

  /**
   * Send mail based on template
   * @param {string} templateId
   * @param {Object} data
   * @param {string} data.from
   * @param {string} data.to
   * @param {Object} data.payload
   * @returns {Promise<any>}
   */
  send (templateId, data) {
    console.log('[MailDev]', templateId, data)

    return new Promise((resolve, reject) => {
      const unprocessedTemplate = fs.readFileSync(`${this.templatesPath}/${templateId}.html`, {encoding:'utf-8'})
      const { templateWithoutParameters, subject } = extractor(unprocessedTemplate, ['subject'])
      const template = embeddor(templateWithoutParameters, data.payload)

      this.smtpTransport.sendMail({
        from: data.from,
        to: data.to,
        subject: subject,
        html: template
      }, (error, result) => {
        if (error) {
          reject(error)
        }

        resolve(result)
      })
    })
  }
}

module.exports = MailDev
