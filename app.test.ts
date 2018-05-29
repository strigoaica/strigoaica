'use strict'

declare var describe
declare var test
declare var expect

declare var app

import * as request from 'supertest'

describe('General test', () => {
  test('It should response the GET method', async () => {
    await request(app).get('/').expect(200)
  })
})

describe('Facebook strategy', () => {
  test('It should return Bad Request (no params)', async () => {
    await request(app).post('/send').expect(400)
  })

  test('It should return Bad Request (missing body values)', async () => {
    await request(app)
      .post('/send')
      .send({
        templateId: 'example',
        strategies: 'facebook'
      })
      .expect(400)
  })

  test('It should return Bad Request (missing data values)', async () => {
    await request(app)
      .post('/send')
      .send({
        templateId: 'example',
        strategies: 'facebook',
        data: {}
      })
      .expect(400)
  })

  /**
   * example:
   * Hello, *|name|*!
   */
  test('It should return Bad Request (missing merge values)', async () => {
    await request(app)
      .post('/send')
      .send({
        templateId: 'example',
        strategies: 'facebook',
        data: {
          to: '666',
          payload: {}
        }
      })
      .expect(400)
  })

  test('It should return enriched example template (1 recipient)', async () => {
    const data = {
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
    const data = {
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

describe('Gmail strategy', () => {
  test('It should return Bad Request (no params)', async () => {
    await request(app).post('/send').expect(400)
  })

  test('It should return Bad Request (missing body values)', async () => {
    await request(app)
      .post('/send')
      .send({
        templateId: 'example',
        strategies: 'gmail'
      })
      .expect(400)
  })

  test('It should return Bad Request (missing data values)', async () => {
    await request(app)
      .post('/send')
      .send({
        templateId: 'example',
        strategies: 'gmail',
        data: {}
      })
      .expect(400)
  })

  /**
   * example:
   * [SUBJECT: I am an example]
   * <div style="text-align:center">
   *   <h1 style="font-weight:initial">
   *     <strong>*|ANSWER|*</strong>
   *   </h1>
   *
   *   <h2 style="font-weight:initial">
   *     <strong>*|LONG_ANSWER|*</strong>
   *   </h2>
   * </div>
   */
  test('It should return Bad Request (missing merge values)', async () => {
    await request(app)
      .post('/send')
      .send({
        templateId: 'example',
        strategies: 'gmail',
        data: {
          from: 'strigoaica@gmail.com',
          to: 'john.smith@gmail.com,jane.smith@gmail.com',
          payload: {}
        }
      })
      .expect(400)
  })

  test('It should return enriched example template (1 recipient)', async () => {
    const processedTemplate = '<divstyle="text-align:center"><h1style="font-weight:initial"><strong>42</strong></h1><h2style="font-weight:initial"><strong>0011010000110010</strong></h2></div>'
    const data = {
      templateId: 'example',
      strategies: 'gmail',
      data: {
        from: 'strigoaica@gmail.com',
        to: 'john.smith@gmail.com,jane.smith@gmail.com',
        payload: {
          answer: 42,
          longAnswer: '0011010000110010'
        }
      }
    }

    const response = await request(app)
      .post('/send')
      .send(data)
      .expect(200)

    expect(response.body).toHaveLength(1)
    expect(response.body[0]).toContainAllKeys([
      'from',
      'to',
      'subject',
      'html'
    ])
    expect(response.body[0].html.replace(/\s/g, '')).toEqual(processedTemplate)
  })
})
