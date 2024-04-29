import { Router, Request, Response, NextFunction } from 'express';

import { logger } from '../utils/logger.utils';
import { processOrder } from '../controllers/event.controller';
import CustomError from '../errors/custom.error';

const eventRouter = Router();

eventRouter.post(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (typeof req === 'object' && req !== null) {
        logger.info(req);
      } else {
        try {
          JSON.parse(req);
          logger.info(req);
        } catch (e) {
          logger.info(JSON.stringify(req));
        }
      }
      logger.info('Order-created message received.');
      await processOrder(req, res);
      logger.info('Order processed successfully.');

      return res.send();
    } catch (error) {
      next(error as CustomError);
    }
  }
);

export default eventRouter;
