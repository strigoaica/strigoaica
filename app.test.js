/* globals describe, test, expect */

'use strict'

const request = require('supertest')

const app = require('./app')

app.init()

describe('General test', () => {
  test('It should response the GET method', async () => {
    await request(app).get('/').expect(200)
  })
})

describe('Facebook strategy', () => {
  test('It should return Bad Request', async () => {
    await request(app).post('/send').expect(400)
  })

  /**
   * example: Hello, *|name|*!
   */
  test('It should return enriched example template (1 recipient)', async () => {
    let data = {
      templateId: 'example',
      strategies: 'facebook',
      data: {
        to: '666',
        payload: {
          name: 'Sasha Grey'
        }
      }
    }

    const response = await request(app)
      .post('/send')
      .send(data)
      .expect(200)

    expect(response.body).toHaveLength(1)
    expect(response.body[0]).toHaveLength(1)
    expect(response.body[0][0]).toHaveProperty('to', '666')
    expect(response.body[0][0]).toHaveProperty('template', 'Hello, Sasha Grey!')
  })

  test('It should return enriched example template (2 recipients)', async () => {
    let data = {
      templateId: 'example',
      strategies: 'facebook',
      data: {
        to: [
          '666',
          '999'
        ],
        payload: {
          name: 'Sasha Grey'
        }
      }
    }

    const response = await request(app)
      .post('/send')
      .send(data)
      .expect(200)

    expect(response.body).toHaveLength(1)
    expect(response.body[0]).toHaveLength(2)
    expect(response.body[0][0]).toHaveProperty('to', '666')
    expect(response.body[0][0]).toHaveProperty('template', 'Hello, Sasha Grey!')
    expect(response.body[0][1]).toHaveProperty('to', '999')
    expect(response.body[0][1]).toHaveProperty('template', 'Hello, Sasha Grey!')
  })
})
