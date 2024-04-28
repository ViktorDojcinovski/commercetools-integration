import { Axios } from 'axios';
import CustomError from '../errors/custom.error';

export const refreshToken = async (client: Axios) => {
  const refresh_token = process.env.REFRESH_TOKEN;
  const refresh_response = await client.post('/token/refresh', {
    refresh: refresh_token,
  });

  if (refresh_response.status !== 200) {
    throw new CustomError(500, 'Failed to refresh token');
  }

  const new_access_token = refresh_response.data.access;

  process.env.AUTH_TOKEN = new_access_token;
  (client.defaults.headers as any)['Authorization'] =
    `Bearer ${new_access_token}`;

  return client;
};
