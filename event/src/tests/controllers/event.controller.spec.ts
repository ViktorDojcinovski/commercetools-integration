import { jest, describe, expect, test } from '@jest/globals';

import axiosClient from '../../api/axios-client.api';
import { processOrder } from '../../controllers/event.controller';
import { executeOrderProcess } from '../../utils/order.utils';
import { readConfiguration } from '../../utils/config.utils';
import { order } from '../_stubs/order';
import { resource } from '../_stubs/resource';
import { Order } from '../../types/order.types';

jest.mock('../../api/axios-client.api', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({}),
}));
jest.mock('../../utils/order.utils');
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

describe('Event Controller', () => {
  test('should setup axios client and call executeOrderProcess', async () => {
    await processOrder(order as unknown as Order, resource);

    expect(readConfiguration).toHaveBeenCalled();
    expect(axiosClient).toHaveBeenCalledWith({
      baseURL: readConfiguration().vsApi_v4,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
      },
    });
    expect(executeOrderProcess).toHaveBeenLastCalledWith(order, resource, {});
  });
});
