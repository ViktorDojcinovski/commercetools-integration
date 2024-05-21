import axios from 'axios';

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

  return client;
};
