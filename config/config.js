module.exports = {
  gmail: {
    user: process.env.STRIGOAICA_GMAIL_USER,
    pass: process.env.STRIGOAICA_GMAIL_PASS
  },
  sendgrid: {
    apiKey: process.env.STRIGOAICA_SENDGRID_KEY
  },
  maildev: {
    port: process.env.STRIGOAICA_MAILDEV_PORT
  }
}
