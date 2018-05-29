'use strict'

import * as logger from 'agathias'
import * as express from 'express'
import * as bodyParser from 'body-parser'

import { config } from  './config/config'

const app = express()

app.init = initialize

app.use(bodyParser.json())

app.get('/', (req, res) => res.sendStatus(200))

app.post('/send', (req, res) => {
  if (
    req.body.templateId === undefined ||
    req.body.data === undefined
  ) {
    return res.sendStatus(400)
  }

  app.strigoaica
    .send(req.body.templateId, req.body.data, req.body.strategies)
    .then((result) => res.send(result))
    .catch((error) => {
      if (error.message === 'Missing parameters') {
        return res.status(400).send('Missing parameters')
      }

      if (error.message === 'Missing merge values') {
        return res.status(400).send('Missing merge values')
      }

      logger.error(error)
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
  const Strigoaica = require('./lib/strigoaica')

  const options = {
    templatesPath: config.templatesPath,
    strategies: Object.keys(config.strategies).map((key) => ({
      type: key,
      options: config.strategies[key]
    }))
  }

  app.strigoaica = new Strigoaica(options)
}

module.exports = app
