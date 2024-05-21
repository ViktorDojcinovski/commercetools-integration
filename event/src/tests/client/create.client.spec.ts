import { jest, describe, afterEach, test, expect } from '@jest/globals';

import { createApiRoot, getProject } from '../../client/create.client';

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

jest.mock('../../client/create.client', () => {
  const originalModule = jest.requireActual('../../client/create.client');
  const mockedModule = Object.assign({}, originalModule, {
    createApiRoot: jest.fn(() => {
      const mockApiRoot = {
        get: jest.fn().mockReturnValue({ execute: jest.fn() }),
      };
      return mockApiRoot;
    }),
  });

  return mockedModule;
});

describe('createApiRoot', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return existing apiRoot', () => {
    const existingApiRoot = {};

    (createApiRoot as jest.Mock).mockReturnValue(existingApiRoot);

    const apiRoot = createApiRoot();
    expect(apiRoot).toBe(existingApiRoot);
  });
});

describe('getProject', () => {
  test('should execute get project request', async () => {
    const mockExecute = jest.fn();
    const mockGet = jest.fn().mockReturnValue({ execute: mockExecute });
    const mockApiRoot = { get: mockGet };

    (createApiRoot as jest.Mock).mockReturnValue(mockApiRoot);
    await getProject(createApiRoot);

    expect(mockGet).toHaveBeenCalled();
    expect(mockExecute).toHaveBeenCalled();
  });
});
