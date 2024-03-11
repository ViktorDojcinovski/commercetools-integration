import axios from 'axios';

interface ICLient {
  baseURL: string;
  headers: { [key: string]: string };
}

export default ({ baseURL, headers }: ICLient) => {
  return axios.create({
    baseURL,
    headers,
  });
};
