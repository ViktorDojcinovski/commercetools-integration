import * as dotenv from 'dotenv';
dotenv.config();
import { app } from './app';
// Import logger
import { logger } from './utils/logger.utils';
import axiosClient from './api/axios-client.api';
import { virtualStockApi_v4 } from './consts/virtualstock.const';

const PORT = process.env.PORT || 8080;

const start = async () => {
  if (!process.env.CTP_VS_USERNAME || !process.env.CTP_VS_PASSWORD) {
    logger.error('Missing environment variables');
    process.exit(1);
  }
  const virtualStockClient = axiosClient({
    baseURL: virtualStockApi_v4,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!process.env.AUTH_TOKEN || !process.env.REFRESH_TOKEN) {
    const response = await virtualStockClient.post('/token', {
      username: process.env.CTP_VS_USERNAME ?? '',
      password: process.env.CTP_VS_PASSWORD ?? '',
    });

    if (response.status !== 200) {
      logger.error(
        'Failed to authenticate with virtual stock API. Please check your credentials.'
      );
      process.exit(1);
    }

    process.env.AUTH_TOKEN = response.data.access;
    process.env.REFRESH_TOKEN = response.data.refresh;
  }

  app.listen(PORT, () => {
    logger.info(`⚡️ Service application listening on port ${PORT}`);
  });
};

start();
