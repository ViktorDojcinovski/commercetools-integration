import { describe, expect, test, jest } from '@jest/globals';
import request from 'supertest';
import Axios from 'axios';

import { app } from '../src/app';
import { orderController } from '../src/controllers/service.controller';

jest.mock('axios');

describe('Service', () => {
  test('has a route handler listening to /service for post requests', async () => {
    const response = await request(app).post('/service').send({});

    expect(response.status).not.toEqual(404);
  });

  test('returns an error if the resource is not provided', async () => {
    const response = await request(app).post('/service').send({});

    expect(response.status).toEqual(400);
  });

  test("returns an error if the resource type is not 'order'", async () => {
    const response = await request(app)
      .post('/service')
      .send({
        resource: {
          typeId: 'cart',
        },
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
      });

    expect(response.status).toEqual(500);
  });

  test('returns a success response if the order controller succeeds', async () => {
    jest.doMock('../src/api/axios-client.api', () => ({
      __esModule: true,
      default: () => ({
        post: jest.fn<() => Promise<any>>().mockResolvedValue({ data: {} }),
      }),
    }));

    jest.resetModules();

    const { app } = require('../src/app');
    const response = await request(app)
      .post('/service')
      .send({
        resource: {
          typeId: 'order',
        },
      });

    expect(response.status).toEqual(200);
  });
});

describe('orderController util function', () => {
  test('should return data with statusCode 200', async () => {
    const resource = {}; // replace with actual resource data
    const mockResponse = { data: {} }; // replace with actual response data

    (Axios as jest.Mocked<typeof Axios>).post.mockResolvedValue(mockResponse);

    const result = await orderController(resource, Axios);

    expect(result).toEqual({
      statusCode: 200,
      actions: [],
    });
  });

  test('should throw CustomError on failure', async () => {
    const resource = {}; // replace with actual resource data
    const error = new Error('Network error');

    (Axios as jest.Mocked<typeof Axios>).post.mockRejectedValue(error);

    await expect(orderController(resource, Axios)).rejects.toThrow(
      'Network error'
    );
  });
});
