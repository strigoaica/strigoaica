'use strict'

const nodemailer = require('nodemailer')

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
      const template = require(`${__dirname}/templates/${templateId}`)(data.payload)

      this.smtpTransport.sendMail({
        from: data.from,
        to: data.to,
        subject: template.subject,
        html: template.html
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
