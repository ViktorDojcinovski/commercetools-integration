import { describe, expect, test, jest } from '@jest/globals';
import request from 'supertest';

import { app } from '../../app';
import { order } from '../_stubs/order';

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

describe('Service', () => {
  test('has a route handler listening to /service for post requests', async () => {
    const response = await request(app).post('/service').send({});

    expect(response.status).not.toEqual(404);
  });

  test('returns an error if the resource is not provided', async () => {
    const response = await request(app).post('/service').send({
      body: {},
    });

    expect(response.status).toEqual(400);
  });

  test("returns an error if the resource type is not 'order'", async () => {
    const response = await request(app)
      .post('/service')
      .send({
        resource: {
          typeId: 'cart',
        },
        order,
      });

    expect(response.status).toEqual(400);
  });

  test('returns an error if the order controller fails', async () => {
    const response = await request(app)
      .post('/service')
      .send({
        resource: {
          typeId: 'order',
        },
        order,
      });

    expect(response.status).toEqual(500);
  });

  test('returns a success response if the order controller succeeds', async () => {
    jest.doMock('../../src/api/axios-client.api', () => ({
      __esModule: true,
      default: () => ({
        post: jest.fn<() => Promise<any>>().mockResolvedValue({ data: {} }),
      }),
    }));
    jest.resetModules();

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { app } = require('../../src/app');

    const response = await request(app)
      .post('/service')
      .send({
        resource: {
          typeId: 'order',
          obj: order,
        },
      });

    expect(response.status).toEqual(200);
  });

  test('returns a 400 error response if the order controller fails with 400 error', async () => {
    jest.doMock('../../src/api/axios-client.api', () => ({
      __esModule: true,
      default: () => ({
        post: jest.fn<() => Promise<any>>().mockResolvedValue({ data: {} }),
      }),
    }));
    jest.resetModules();

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { app } = require('../../src/app');

    const response = await request(app)
      .post('/service')
      .send({
        resource: {
          typeId: 'order',
          obj: {
            ...order,
            lineItems: [{ variant: { availability: {} } }],
          },
        },
      });

    expect(response.status).toEqual(400);
  });
});
