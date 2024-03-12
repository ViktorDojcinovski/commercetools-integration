import { app } from './app';

// Import logger
import { logger } from './utils/logger.utils';

const PORT = process.env.PORT || 8080;

const start = async () => {
  if (
    !process.env.VS_API_URL ||
    !process.env.VS_USERNAME ||
    !process.env.VS_PASSWORD
  ) {
    throw new Error('Missing environment variables');
  }

  app.listen(PORT, () => {
    logger.info(`⚡️ Service application listening on port ${PORT}`);
  });
};

start();
