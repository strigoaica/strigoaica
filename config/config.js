const fs = require('fs')
const path = require('path')

const yaml = require('js-yaml')

let extConfig

try {
  extConfig = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '..', 'strigoaica.yml'), 'utf8'))
} catch (error) {
  console.log(error)
  if (error.code !== 'ENOENT') {
    process.exit(1)
  }
}

let config = {
  supportedStrategies: ['facebook', 'gmail', 'sendgrid', 'maildev'],
  port: extConfig.port || 12987,
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
