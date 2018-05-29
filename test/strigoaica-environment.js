const NodeEnvironment = require('jest-environment-node')

const app = require('../app')

class CustomEnvironment extends NodeEnvironment {
  constructor (config) {
    super(config)
  }

  async setup () {
    await super.setup()

    await app.init()

    this.global.app = app
  }

  async teardown () {
    await super.teardown()
  }

  runScript (script) {
    return super.runScript(script)
  }
}

module.exports = CustomEnvironment
