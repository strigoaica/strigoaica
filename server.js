const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const config = require(path.join(__dirname, 'config/config'))
const Strigoaica = require(path.join(__dirname, 'lib/strigoaica'))

const port = process.env.PORT || 12987

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

  let strategies = [
    {
      type: 'gmail',
      options: {
        auth: {
          user: config.gmail.user,
          pass: config.gmail.pass
        }
      }
    }
    // TODO: Generate dynamically from config file if needed
    // {
    //   type: 'sendgrid',
    //   options: {
    //     auth: {
    //       apiKey: config.sendgrid.apiKey
    //     }
    //   }
    // },
    // {
    //   type: 'maildev',
    //   options: {
    //     port: config.maildev.port
    //   }
    // }
  ]
  let options = {
    templatesPath: path.join(__dirname, 'templates')
  }

  strigoaica = new Strigoaica(strategies, options)
})
