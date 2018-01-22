const path = require('path')
const Gmail = require(path.join(__dirname, '..', '/strategies/gmail'))
const Sendgrid = require(path.join(__dirname, '..', '/strategies/sendgrid'))
const MailDev = require(path.join(__dirname, '..', '/strategies/maildev'))

const _supportedStrategies = ['gmail', 'sendgrid', 'maildev']

class Strigoaica {
  constructor (strategies, options) {
    this.templatesPath = options && options.templatesPath || `${path.join(__dirname, '..', 'templates')}`

    this.strategies = strategies
      .filter((s) => {
          if (!_supportedStrategies.includes(s.type)) {
            throw new Error(`Unsupported strategy ${s.type}. Please make sure the name of the strategy is spelled correctly and that it is supported.`)
          }
          return _supportedStrategies.includes(s.type)
        }
      )
      .map((s) => {
        if (s.type === 'gmail') {
          return new Gmail({
            auth: {
              user: s.options.auth.user,
              pass: s.options.auth.pass
            },
            templatesPath: `${this.templatesPath}/${s.type}`
          })
        }

        if (s.type === 'sendgrid') {
          return new Sendgrid({
            auth: {
              apiKey: s.options.auth.apiKey
            },
            templatesPath: `${this.templatesPath}/${s.type}`
          })
        }

        if (s.type === 'maildev') {
          return new MailDev({
            port: s.options.port,
            templatesPath: `${this.templatesPath}/${s.type}`
          })
        }
      })
  }

  /**
   * Send to all active strategies
   * @param {string} templateId
   * @param {object} data
   * @returns {Promise<number[]>}
   */
  send (templateId, data) {
    console.log('[strigoaica]', templateId, data)
    return Promise.all(this.strategies.map((s) => s.send(templateId, data)))
  }
}

module.exports = Strigoaica
