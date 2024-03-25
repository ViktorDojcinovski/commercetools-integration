import { describe, expect, test, jest } from '@jest/globals';
import request from 'supertest';
import Axios from 'axios';

import { app } from '../../src/app';
import { orderController } from '../../src/controllers/service.controller';
import { order } from '../../src/stubs/order.stub';
import { RequestBody, Resource } from '../../src/types/order.types';
import { refreshToken } from '../../src/utils/refreshToken.utils';

jest.mock('axios');

jest.mock('../../src/client/create.client', () => ({
  createApiRoot: () => {
    return {
      channels: () => {
        return {
          withId: () => ({
            get: () => {
              return {
                execute: () => {
                  return {
                    body: {
                      id: 'channelId',
                      key: 'channelKey',
                    },
                  };
                },
              };
            },
          }),
        };
      },
    };
  },
}));

jest.mock('../../src/utils/refreshToken.utils');

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
        },
        order,
      });

    expect(response.status).toEqual(200);
  });
});

describe('orderController', () => {
  test('should return data with statusCode 200', async () => {
    const body = {
      resource: {
        typeId: 'order',
      } as unknown as Resource,
      typeId: 'order',
      order,
    } as unknown as RequestBody;
    const mockResponse = { data: {} };
    (Axios as jest.Mocked<typeof Axios>).post.mockResolvedValue(mockResponse);
    const result = await orderController(body, Axios);
    expect(result).toEqual({
      statusCode: 200,
      actions: [
        {
          action: 'dispatchOrderToVirtualStock',
          updateProductData: false,
        },
      ],
    });
  });
  test('should throw CustomError on failure', async () => {
    const body = {
      resource: {
        typeId: 'order',
      } as unknown as Resource,
      typeId: 'order',
      order,
    } as unknown as RequestBody;
    const error = {
      response: {
        status: 500,
        data: {
          error: 'Failed to process the order.',
        },
      },
    };
    (Axios as jest.Mocked<typeof Axios>).post.mockRejectedValue(error);
    await expect(orderController(body, Axios)).rejects.toThrow(
      'Failed to process the order.'
    );
  });
  test('should refresh token and post order successfully', async () => {
    const body = {
      resource: {
        typeId: 'order',
      } as unknown as Resource,
      typeId: 'order',
      order,
    } as unknown as RequestBody;
    const error401 = {
      response: {
        status: 401,
        data: {
          error: 'Failed to process the order.',
        },
      },
    };
    const updatedClient = {
      post: jest.fn(),
    };
    (Axios as jest.Mocked<typeof Axios>).post.mockRejectedValueOnce(error401);
    (
      refreshToken as jest.MockedFunction<typeof refreshToken>
    ).mockResolvedValueOnce(updatedClient as any);
    await orderController(body, Axios);
    expect(updatedClient.post).toHaveBeenCalledTimes(1);
  });
  test('should throw CustomError on second failure after 401 status', async () => {
    const body = {
      resource: {
        typeId: 'order',
      } as unknown as Resource,
      typeId: 'order',
      order,
    } as unknown as RequestBody;
    const error401 = {
      response: {
        status: 401,
        data: {
          error: 'Failed to process the order.',
        },
      },
    };
    const error500 = {
      response: {
        status: 500,
        data: {
          error: 'Failed to process the order.',
        },
      },
    };
    (Axios as jest.Mocked<typeof Axios>).post
      .mockRejectedValueOnce(error401)
      .mockRejectedValueOnce(error500);
    (
      refreshToken as jest.MockedFunction<typeof refreshToken>
    ).mockResolvedValue(Axios);
    await expect(orderController(body, Axios)).rejects.toThrow(
      'Failed to refresh token or to process the order. Please try again later.'
    );
  });
  test('should throw CustomError on default case and else block', async () => {
    const body = {
      resource: {
        typeId: 'order',
      } as unknown as Resource,
      typeId: 'order',
      order,
    } as unknown as RequestBody;
    const error = {
      response: {
        status: 503,
        data: {
          error: 'Unexpected error.',
        },
      },
    };
    (Axios as jest.Mocked<typeof Axios>).post.mockRejectedValue(error);
    await expect(orderController(body, Axios)).rejects.toThrow(
      'Unexpected error.'
    );
  });
  test('should handle error without response', async () => {
    const body = {
      resource: {
        typeId: 'order',
      } as unknown as Resource,
      typeId: 'order',
      order,
    } as unknown as RequestBody;
    const error = {
      response: undefined,
      message: 'Network error',
    };
    (Axios as jest.Mocked<typeof Axios>).post.mockRejectedValue(error);
    await expect(orderController(body, Axios)).rejects.toThrow(
      'Internal server error. Please try again later.'
    );
  });
});
