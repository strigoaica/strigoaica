'use strict'

const path = require('path')

const supportedStrategies = require(path.join(__dirname, '..', 'config/config')).supportedStrategies

class Strigoaica {
  constructor (strategies, options) {
    this.templatesPath = options.templatesPath

    this.strategies = strategies
      .filter((s) => {
        if (!supportedStrategies.includes(s.type)) {
          throw new Error(`Unsupported strategy ${s.type}. Please make sure the name of the strategy is spelled correctly and that it is supported.`)
        }

        return supportedStrategies.includes(s.type)
      })
      .map((s) => {
        let strategyOptions = {
          templatesPath: `${this.templatesPath}/${s.type}`
        }

        if (s.type === 'gmail') {
          const Gmail = require(path.join(__dirname, '../strategies/gmail'))
          return new Gmail(Object.assign({
            auth: {
              user: s.options.auth.user,
              pass: s.options.auth.pass
            }
          }, strategyOptions))
        }

        if (s.type === 'sendgrid') {
          const Sendgrid = require(path.join(__dirname, '../strategies/sendgrid'))
          return new Sendgrid(Object.assign({
            auth: {
              apiKey: s.options.auth.apiKey
            }
          }, strategyOptions))
        }

        if (s.type === 'maildev') {
          const MailDev = require(path.join(__dirname, '../strategies/maildev'))
          return new MailDev(Object.assign({
            port: s.options.port
          }, strategyOptions))
        }

        if (s.type === 'facebook') {
          const Facebook = require(path.join(__dirname, '../strategies/facebook'))
          return new Facebook(Object.assign(s.options, strategyOptions))
        }
      })
  }

  /**
   * Send to all active strategies
   * @param {string} templateId
   * @param {object} data
   * @param {(string|string[])} strategies
   * @returns {Promise<number[]>}
   */
  send (templateId, data, strategies = 'all') {
    console.log('[strigoaica]', templateId, data, strategies)
    strategies = Array.isArray(strategies) ? strategies.join('|') : strategies

    return Promise.all(this.strategies
      .filter((s) => strategies === 'all' || strategies.includes(s.type))
      .map((s) => s.send(templateId, data))
    )
  }
}

module.exports = Strigoaica
