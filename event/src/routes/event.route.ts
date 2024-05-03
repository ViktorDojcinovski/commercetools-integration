import { Router, Request, Response, NextFunction } from 'express';

import { logger } from '../utils/logger.utils';
import { processOrder } from '../controllers/event.controller';
import CustomError from '../errors/custom.error';
import { publishMessage } from '../utils/pubSubClient.utils';

const eventRouter = Router();

eventRouter.post(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info(JSON.stringify(req.body));
    logger.info('req.body.message.data');
    logger.info(req.body.message.data);
    logger.info(Buffer.from(req.body.message.data, 'base64').toString().trim());
    try {
      const message = JSON.parse(
        Buffer.from(req.body.message.data, 'base64').toString().trim()
      );

      if (!message) {
        logger.info('No message received.');
        await publishMessage('No message recived!');
        return;
      }
      const { resource, order } = message;

      if (resource.typeId !== 'order') {
        logger.info('Incorrect type.');
        await publishMessage('The only allowed type is order!');
        return;
      }

      await processOrder(order, resource);
      logger.info('Order processed successfully.');

      return res.status(200).send();
    } catch (error) {
      logger.error(JSON.stringify(error));
      next(error as CustomError);
    }
  }
);

export default eventRouter;
