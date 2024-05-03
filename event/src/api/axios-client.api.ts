import axios from 'axios';
import axiosRetry from 'axios-retry';

interface ICLient {
  baseURL: string;
  auth?: {
    username: string;
    password: string;
  };
  headers: { [key: string]: string };
}

export default ({ baseURL, headers, auth }: ICLient) => {
  const client = axios.create({
    baseURL,
    headers,
    auth,
  });
  axiosRetry(client, { retries: 3 });

  return client;
};
