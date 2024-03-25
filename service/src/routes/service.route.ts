import { Router, Request, Response, NextFunction } from 'express';

import { logger } from '../utils/logger.utils';
import { post } from '../controllers/service.controller';
import CustomError from '../errors/custom.error';

const serviceRouter = Router();

serviceRouter.post(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await post(req, res);
      logger.info('Order processed successfully.');
    } catch (error) {
      next(error as CustomError);
    }
  }
);

export default serviceRouter;
