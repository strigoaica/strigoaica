'use strict'

const fs = require('fs')
const path = require('path')

const nodemailer = require('nodemailer')

const htmlProcessor = require(path.join(__dirname, '../lib/utils/html-processor'))

class Gmail {
  constructor (options) {
    // TODO: Extend Email class
    this.smtpTransport = nodemailer.createTransport({
      host: options.host || 'smtp.gmail.com',
      port: options.port || 587,
      secure: options.secure || false,
      requireTLS: options.requireTLS || true,
      auth: options.auth
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
    console.log('[gmail]', templateId, data)

    return new Promise((resolve, reject) => {
      const rawTemplate = fs.readFileSync(`${this.templatesPath}/${templateId}.html`, {
        encoding: 'utf-8'
      })
      const { template, meta } = htmlProcessor(rawTemplate, data.payload)

      if (process.env.NODE_ENV !== 'production') {
        console.log({ from: data.from, to: data.to, subject: meta.subject, html: template })
        return Promise.resolve()
      }

      this.smtpTransport.sendMail({
        from: data.from,
        to: data.to,
        subject: meta.subject,
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

module.exports = Gmail
