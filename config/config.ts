'use strict'

import * as fs from 'fs'
import * as path from 'path'

import * as yaml from 'js-yaml'

interface Config {
  port: number,
  templatesPath: string,
  strategies: Strategy[]
}

interface Strategy {
  [key: string]: string
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

  if (!config.strategies) {
    console.error(new Error('At least 1 strategy must be provided'))
    process.exit(1)
  }

  Object.keys(config.strategies).forEach((strategy) => {
    if (require.resolve(`strigoaica-${strategy}`)) {
      // TODO: Validate config of each strategy
    }
  })
}

export {
  config
}
