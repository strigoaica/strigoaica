const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const config = require(`${__dirname}/config/config`)
const Strigoaica = require(`${__dirname}/lib/strigoaica`)

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

  strigoaica = new Strigoaica([
    {
      type: 'gmail',
      options: {
        auth: {
          user: config.gmail.user,
          pass: config.gmail.pass
        }
      }
    }
  ])
})
