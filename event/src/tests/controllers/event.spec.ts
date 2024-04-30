import { describe, expect, test, jest } from '@jest/globals';
import request from 'supertest';

import { app } from '../../app';
import { order } from '../_stubs/order';
import { message } from '../_stubs/message';

jest.mock('axios');
jest.mock('../../client/create.client', () => {
  return jest.requireActual('../../__mocks__/createApiRoot');
});
jest.mock('../../utils/refreshToken.utils');

jest.mock('../../utils/config.utils', () => ({
  readConfiguration: jest.fn().mockReturnValue({
    clientId: 'mockClientId',
    clientSecret: 'mockClientSecret',
    projectKey: 'mockProjectKey',
    scope: 'mockScope',
    region: 'mockRegion',
    vsPassword: 'mockVsPassword',
    vsUsername: 'mockVsUsername',
    vsApi_v4: 'mockVsApi_v4',
    edgeApi_v4: 'mockEdgeApi_v4',
  }),
}));

describe('Event', () => {
  test('has a route handler listening to /event for post requests', async () => {
    const response = await request(app).post('/event').send({});

    expect(response.status).not.toEqual(404);
  });

  test('returns an error if the body is missing', async () => {
    const response = await request(app).post('/event').send();

    expect(response.status).toEqual(400);
  });

  test('returns an error if the body message is missing', async () => {
    const response = await request(app).post('/event').send({});

    expect(response.status).toEqual(400);
  });

  test('returns an error if the decoded data is missing', async () => {
    const newMessage = { ...message, data: '' };
    const response = await request(app)
      .post('/event')
      .send({ message: newMessage });

    expect(response.status).toEqual(400);
  });

  // Test for line 65-67
  test('returns an error if the resource typeId is not "order"', async () => {
    const newMessage = { ...message };
    const decodedData = JSON.parse(
      Buffer.from(newMessage.data, 'base64').toString().trim()
    );
    decodedData.resource.typeId = 'cart';
    newMessage.data = Buffer.from(JSON.stringify(decodedData)).toString(
      'base64'
    );

    const response = await request(app)
      .post('/event')
      .send({ message: newMessage });

    expect(response.status).toEqual(400);
  });

  test('returns an error if the message is not provided', async () => {
    const response = await request(app).post('/event').send();

    expect(response.status).toEqual(400);
  });

  test('returns an error if the message is not provided', async () => {
    const response = await request(app).post('/event').send({});

    expect(response.status).toEqual(400);
  });

  test("returns an error if the resource typeId is not 'order'", async () => {
    const newMessage = { ...message };
    const decodedData = Buffer.from(newMessage.data, 'base64')
      .toString()
      .trim();
    const messageObject = JSON.parse(decodedData);

    const mockedResource = {
      typeId: 'cart',
      id: '69442013-5dcd-41d3-a3f3-d702967f502c',
    };
    messageObject.resource = mockedResource;

    const jsonString = JSON.stringify(messageObject);
    const buffer = Buffer.from(jsonString);
    const base64String = buffer.toString('base64');

    newMessage.data = base64String;

    const response = await request(app).post('/event').send({
      newMessage,
    });

    expect(response.status).toEqual(400);
  });

  test('returns an error if the executeOrderProcess fails', async () => {
    const response = await request(app).post('/event').send({
      message,
    });

    expect(response.status).toEqual(500);
  });

  test('returns a success response if the executeOrderProcess succeeds', async () => {
    jest.doMock('../../api/axios-client.api', () => ({
      __esModule: true,
      default: () => ({
        post: jest.fn<() => Promise<any>>().mockResolvedValue({ data: {} }),
      }),
    }));
    jest.resetModules();

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { app } = require('../../app');

    const response = await request(app).post('/event').send({
      message,
    });

    expect(response.status).toEqual(200);
  });

  test('throws an error if the executeOrderProcess fails', async () => {
    jest.doMock('../../api/axios-client.api', () => ({
      __esModule: true,
      default: () => ({
        post: jest.fn<() => Promise<any>>().mockResolvedValue({ data: {} }),
      }),
    }));
    jest.resetModules();

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { app } = require('../../app');
    const mockedOrder = {
      ...order,
      lineItems: [
        {
          ...order.lineItems,
          variant: {
            ...order.lineItems[0].variant,
            availability: {},
          },
        },
      ],
    };
    const mockedMessage = { ...message };
    const decodedData = JSON.parse(
      Buffer.from(mockedMessage.data, 'base64').toString().trim()
    );
    const mockedData = {
      ...decodedData,
      order: mockedOrder,
    };
    mockedMessage.data = Buffer.from(JSON.stringify(mockedData)).toString(
      'base64'
    );

    const response = await request(app).post('/event').send({
      mockedMessage,
    });

    expect(response.status).toEqual(400);
  });
});
