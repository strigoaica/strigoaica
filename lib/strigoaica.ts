'use strict'

import * as Agathias from 'agathias'

import { Strategy } from './strategy'

const logger = Agathias.getChild('strigoaica')

class Strigoaica {
  templatesPath: string
  strategies: Strategy[]

  constructor (options) {
    this.templatesPath = options.templatesPath

    this.strategies = options.strategies.map((s) => {
      let strategyOptions = {
        templatesPath: `${this.templatesPath}/${s.type}`
      }

      if (s.type === 'gmail') {
        const Gmail = require('../strategies/gmail')
        return new Gmail(Object.assign(strategyOptions, {
          auth: {
            user: s.options.user,
            pass: s.options.pass
          }
        }))
      }

      if (s.type === 'facebook') {
        const Facebook = require('../strategies/facebook')
        return new Facebook(Object.assign(strategyOptions, {
          pageAccessToken: s.options.pageAccessToken
        }))
      }

      // if (s.type === 'sendgrid') {
      //   const Sendgrid = require(path.join(__dirname, '../strategies/sendgrid'))
      //   return new Sendgrid(Object.assign({
      //     auth: {
      //       apiKey: s.options.auth.apiKey
      //     }
      //   }, strategyOptions))
      // }

      // if (s.type === 'maildev') {
      //   const MailDev = require(path.join(__dirname, '../strategies/maildev'))
      //   return new MailDev(Object.assign({
      //     port: s.options.port
      //   }, strategyOptions))
      // }this.type = 'gmail'

      throw new Error(`Strategy ${s.type} not recognized`)
    })
  }

  /**
   * Send to all active strategies
   * @param {string} templateId
   * @param {object} data
   * @param {(string|string[])} strategies
   * @returns {Promise<number[]>}
   */
  send (templateId: string, data: any, strategies: string|string[] = 'all') {
    logger.debug({ templateId, data, strategies })

    strategies = Array.isArray(strategies) ? strategies.join('|') : strategies

    return Promise.all(this.strategies
      .filter((s) => strategies === 'all' || strategies.includes(s.type))
      .map((s) => s.send(templateId, data))
    )
  }
}

module.exports = Strigoaica
