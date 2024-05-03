import { Router, Request, Response, NextFunction } from 'express';

import { logger } from '../utils/logger.utils';
import { processOrder } from '../controllers/event.controller';
import CustomError from '../errors/custom.error';

const eventRouter = Router();

eventRouter.post(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info(JSON.stringify(req.body));
    try {
      const message = JSON.parse(
        Buffer.from(req.body.message.data, 'base64').toString().trim()
      );
      await processOrder(message);
      logger.info('Order processed successfully.');

      return res.status(200).send();
    } catch (error) {
      logger.error(JSON.stringify(error));
      next(error as CustomError);
    }
  }
);

export default eventRouter;
