import { describe, expect, test, jest, beforeEach } from '@jest/globals';
import request from 'supertest';

import { app } from '../../app';
import { logger } from '../../utils/logger.utils';
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
jest.mock('../../utils/logger.utils', () => ({
  logger: {
    info: jest.fn(),
  },
}));
jest.mock('../../controllers/event.controller', () => ({
  processOrder: jest.fn(),
}));

describe('Event', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  test('return correct response status when message.data is incorrect and logs correct message', async () => {
    const response = await request(app)
      .post('/event')
      .send({
        message: { data: '' },
      });

    expect(logger.info).toHaveBeenCalledTimes(1);
    expect(logger.info).toHaveBeenCalledWith('Error: {}');
    expect(response.status).toBe(200);
  });

  test('return correct response status when message.data is correct and logs correct message', async () => {
    const response = await request(app).post('/event').send({
      message,
    });

    expect(logger.info).toHaveBeenCalledTimes(1);
    expect(logger.info).toHaveBeenCalledWith('Order processed successfully.');
    expect(response.status).toBe(200);
  });
  test('return correct response status when message.resource is not of type order and loggs correct message', async () => {
    const mockedMessage = { ...message };
    const decodedData = JSON.parse(
      Buffer.from(mockedMessage.data, 'base64').toString().trim()
    );
    const mockedData = {
      ...decodedData,
      resource: { ...decodedData.resource, typeId: 'cart' },
    };
    mockedMessage.data = Buffer.from(JSON.stringify(mockedData)).toString(
      'base64'
    );

    const response = await request(app).post('/event').send({
      message: mockedMessage,
    });

    expect(logger.info).toHaveBeenCalledTimes(1);
    expect(logger.info).toHaveBeenCalledWith('Incorrect type.');
    expect(response.status).toBe(200);
  });
});
