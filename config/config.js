const fs = require('fs')
const path = require('path')

const yaml = require('js-yaml')

const configPath = process.env.CONFIG_PATH || path.join(__dirname, '..', 'strigoaica.yml')

let extConfig = {}

try {
  extConfig = yaml.safeLoad(fs.readFileSync(configPath, 'utf8'))
} catch (error) {
  if (error.code !== 'ENOENT') {
    console.error(error)
    process.exit(1)
  }
}

let config = {
  supportedStrategies: ['facebook', 'gmail', 'sendgrid', 'maildev'],
  port: extConfig.port || 1337,
  templatesPath: extConfig.templatesPath || path.join(__dirname, '..', 'templates')
}

if (extConfig.gmail) {
  config.gmail = {
    auth: {
      user: extConfig.gmail.user,
      pass: extConfig.gmail.pass
    }
  }
}

if (extConfig.sendgrid) {
  config.sendgrid = {
    auth: {
      apiKey: extConfig.sendgrid.apiKey
    }
  }
}

if (extConfig.maildev) {
  config.maildev = {
    port: extConfig.maildev.port
  }
}

if (extConfig.facebook) {
  config.facebook = {
    pageAccessToken: extConfig.facebook.pageAccessToken
  }
}

module.exports = config
