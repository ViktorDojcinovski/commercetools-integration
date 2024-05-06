import * as dotenv from 'dotenv';
dotenv.config();
import { app } from './app';
import { logger } from './utils/logger.utils';
import axiosClient from './api/axios-client.api';
import { readConfiguration } from './utils/config.utils';

const PORT = process.env.PORT || 8080;

export const start = async () => {
  const properties = new Map(Object.entries(process.env));
  logger.info('env vars');
  logger.info(JSON.stringify(properties));
  const { vsApi_v4, vsUsername, vsPassword } = readConfiguration();

  if (!vsUsername || !vsPassword) {
    logger.error('Missing environment variables');
    process.exit(1);
  }
  const virtualStockClient = axiosClient({
    baseURL: vsApi_v4 as string,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!process.env.AUTH_TOKEN || !process.env.REFRESH_TOKEN) {
    const response = await virtualStockClient.post('/token', {
      username: vsUsername ?? '',
      password: vsPassword ?? '',
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
    logger.info(`⚡️ Event application listening on port ${PORT}`);
  });
};

start();
