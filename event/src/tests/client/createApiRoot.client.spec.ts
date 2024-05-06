import { jest, describe, afterEach, test, expect } from '@jest/globals';

import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { createApiRoot } from '../../client/create.client';

jest.mock('../../utils/config.utils', () => ({
  readConfiguration: jest.fn().mockReturnValue({
    projectKey: 'mockProjectKey',
  }),
}));

jest.mock('@commercetools/platform-sdk', () => ({
  createApiBuilderFromCtpClient: jest.fn().mockReturnValue({
    withProjectKey: jest.fn(),
  }),
}));

describe('createApiRoot', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create apiRoot by invoking createApiBuilderFromCtpClient', async () => {
    // Call the function you want to test
    createApiRoot();

    expect(createApiBuilderFromCtpClient).toHaveBeenCalled();
  });
});
