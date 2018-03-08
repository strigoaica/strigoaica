const path = require('path')

const logger = require('agathias')
const express = require('express')
const bodyParser = require('body-parser')

const config = require(path.join(__dirname, 'config/config'))

const app = express()

app.init = initialize

app.use(bodyParser.json())

app.get('/', (req, res) => res.sendStatus(200))

app.post('/send', (req, res) => {
  if (req.body.templateId === undefined) {
    return res.sendStatus(400)
  }

  app.strigoaica
    .send(req.body.templateId, req.body.data, req.body.strategies)
    .then((result) => res.send(result))
    .catch((error) => {
      logger.error(error)
      // TODO: Handle error
      return res.sendStatus(500)
    })
})

function initialize () {
  /**
   * Logging
   */
  if (process.env.NODE_ENV !== 'test') {
    logger.init()
  }

  /**
   * Strigoaica
   */
  const Strigoaica = require(path.join(__dirname, 'lib/strigoaica'))

  let strategies = config.supportedStrategies
    .filter((type) => config[type])
    .map((type) => ({ type, options: config[type] }))

  let options = {
    templatesPath: config.templatesPath
  }

  app.strigoaica = new Strigoaica(strategies, options)
}

module.exports = app
