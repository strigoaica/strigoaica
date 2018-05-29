#!/usr/bin/env node

'use strict'

import * as http from 'http'

import * as logger from 'agathias'

import { config } from './config/config'

const port = config.port

const app = require('./app')
const server = http.createServer(app)

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

function onError (error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

  switch (error.code) {
    case 'EACCES':
      logger.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      logger.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

function onListening () {
  const addr = server.address()
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port

  logger.info(`Strigoaica listening on :${bind}`)
  if (process.env.NODE_ENV === 'development') {
    logger.debug('Development mode')
  }

  app.init(server)
}
