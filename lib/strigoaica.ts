'use strict'

import * as Agathias from 'agathias'

import { Strategy } from 'strigoaica-strategy'

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

      let strategy

      try {
        strategy = require(`strigoaica-${s.type}`)
      } catch (e) {
        throw new Error(`Strategy ${s.type} not recognized`)
      }

      return new strategy(Object.assign(strategyOptions, s.options))
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
