'use strict'

import * as fs from 'fs'
import * as path from 'path'

import * as yaml from 'js-yaml'

interface Config {
  port: number,
  templatesPath: string
  strategies: {
    facebook: {
      pageAccessToken: string
    },
    gmail: {
      user: string,
      pass: string
    },
    sendGrid: {
      apiKey: string
    },
    maildev: {
      port: number
    }
  },
}

let config: Config

if (!config) {
  loadConfigFile()
}

function loadConfigFile () {
  const configPath = process.env.CONFIG_PATH || path.join(__dirname, '..', 'strigoaica.yml')

  let extConfig = {} as Config

  /**
   * Add Defaults
   */
  config = {
    port: 1337,
    templatesPath: path.join(__dirname, '..', 'templates'),
    strategies: {} as any
  }

  /**
   * Load External Config File
   */
  try {
    extConfig = yaml.safeLoad(fs.readFileSync(configPath, 'utf8'))
  } catch (error) {
    console.error(error)
    process.exit(1)
  }

  /**
   * Populate/ Overwrite in-memory config
   */
  config = Object.assign(config, extConfig)

  if (!extConfig.strategies) {
    console.error(new Error('At least 1 strategy must be provided'))
    process.exit(1)
  }
}

export {
  config
}
