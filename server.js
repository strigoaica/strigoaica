const path = require('path')

const logger = require('agathias')

const config = require(path.join(__dirname, 'config/config'))

const port = config.port

const app = require('./app')

app.listen(port, () => {
  logger.info(`Strigoaica listening on :${port}`)

  app.init()
})
