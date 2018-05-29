'use strict'

import * as fs from 'fs'

import * as Agathias from 'agathias'
import * as nodemailer from 'nodemailer'
import * as Mail from 'nodemailer/lib/mailer'

import { Strategy } from '../lib/strategy'

interface GmailMeta {
  subject: string
}

const config = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true
}

class Gmail implements Strategy {
  templatesPath: string
  type: string

  logger

  smtpTransport: Mail

  constructor (options) {
    this.templatesPath = options.templatesPath
    this.type = 'gmail'

    this.logger = Agathias.getChild('gmail')

    this.smtpTransport = nodemailer.createTransport(Object.assign(config, options))
  }

  async send (templateId, data) {
    this.logger.debug({ templateId, data })

    if (data.from === undefined || data.to === undefined || data.payload === undefined) {
      return Promise.reject(new Error('Missing parameters'))
    }

    let rawTemplate
    try {
      rawTemplate = fs.readFileSync(`${this.templatesPath}/${templateId}.html`, {
        encoding: 'utf-8'
      })
    } catch (error) {
      return Promise.reject(error)
    }

    const meta = Strategy.extractMergeValueMeta(rawTemplate) as GmailMeta
    const template = Strategy.fillMergeValueTemplate(rawTemplate, data.payload)

    let mailOptions = {
      from: data.from,
      to: data.to,
      subject: meta.subject,
      html: template
    }

    if (process.env.NODE_ENV !== 'production') {
      this.logger.debug({ mailOptions })
      return Promise.resolve(mailOptions)
    }

    return new Promise((resolve, reject) =>
      this.smtpTransport.sendMail(mailOptions, (error, result) =>
        error ? reject(error) : resolve(result)))
  }
}

module.exports = Gmail
