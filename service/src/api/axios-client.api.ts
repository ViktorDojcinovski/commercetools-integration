import axios from 'axios';

interface ICLient {
  baseURL: string;
  headers: { [key: string]: string };
}

export default ({ baseURL, headers }: ICLient) => {
  const client = axios.create({
    baseURL,
    headers,
  });

  return client;
};
