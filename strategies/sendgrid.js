'use strict'

const fs = require('fs')
const path = require('path')

const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid')

const extractor = require('../lib/utils/extractor')
const embeddor = require('../lib/utils/embeddor')

class Sendgrid {
  constructor (options) {
    // TODO: Extend Email class
    this.smtpTransport = nodemailer.createTransport(sendgridTransport(options.auth))

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
    console.log('[sendgrid]', templateId, data)

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

module.exports = Sendgrid
