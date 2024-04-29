import { Router, Request, Response, NextFunction } from 'express';

import { logger } from '../utils/logger.utils';
import { processOrder } from '../controllers/event.controller';
import CustomError from '../errors/custom.error';

const eventRouter = Router();

eventRouter.post(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info('Order-created message received.');
      logger.info(
        JSON.stringify({
          method: req.method,
          url: req.url,
          headers: req.headers,
          body: req.body,
        })
      );
      await processOrder(req, res);
      logger.info('Order processed successfully.');

      return res.send();
    } catch (error) {
      next(error as CustomError);
    }
  }
);

export default eventRouter;
