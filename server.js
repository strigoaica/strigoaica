const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')

const config = require(path.join(__dirname, 'config/config'))
const Strigoaica = require(path.join(__dirname, 'lib/strigoaica'))

const port = config.port

const app = express()

let strigoaica

app.use(bodyParser.json())

app.post('/send', (req, res) => {
  console.log('POST [/send]', req.body)

  strigoaica
    .send(req.body.templateId, req.body.data)
    .then((result) => {
      console.log(result)
      // TODO: Handle success
      return res.sendStatus(200)
    })
    .catch((error) => {
      console.error(error)
      // TODO: Handle error
      return res.sendStatus(500)
    })
})

app.listen(port, () => {
  console.log(`Strigoaica listening on :${port}`)

  let strategies = config.supportedStrategies
    .filter((type) => config[type])
    .map((type) => ({ type, options: config[type] }))

  let options = {
    templatesPath: config.templatesPath
  }

  strigoaica = new Strigoaica(strategies, options)
})
