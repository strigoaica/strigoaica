const Gmail = require(`${__dirname}/gmail/gmail`)

const _supportedStrategies = ['gmail']

class Strigoaica {
  constructor (strategies) {
    this.strategies = strategies
      .filter((s) => _supportedStrategies.includes(s.type))
      .map((s) => {
        if (s.type === 'gmail') {
          return new Gmail({
            auth: {
              user: s.options.auth.user,
              pass: s.options.auth.pass
            }
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
