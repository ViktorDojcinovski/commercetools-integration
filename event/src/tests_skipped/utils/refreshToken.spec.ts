import { describe, expect, test, jest } from '@jest/globals';
import Axios from 'axios';
import { refreshToken } from '../../utils/refreshToken.utils';

jest.mock('axios');
const mockedAxios = Axios as jest.Mocked<typeof Axios>;

mockedAxios.create.mockReturnThis();

describe('Refresh Token utility', () => {
  test('should succesfully refresh token', async () => {
    const mockResponse = { data: { access: 'newAccessToken' }, status: 200 };

    mockedAxios.post.mockResolvedValue(mockResponse);

    const result = await refreshToken(Axios.create());

    expect((result.defaults.headers as any)['Authorization']).toBe(
      'Bearer newAccessToken'
    );
  });

  test('should throw CustomError on failure', async () => {
    const error = {
      response: {
        status: 500,
        data: {
          error: 'Failed to refresh token.',
        },
      },
    };

    mockedAxios.post.mockResolvedValue(error);

    await expect(refreshToken(Axios.create())).rejects.toThrow(
      'Failed to refresh token'
    );
  });
});
