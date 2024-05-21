import { Router, Request, Response } from 'express';

import { logger } from '../utils/logger.utils';
import { processOrder } from '../controllers/event.controller';

const eventRouter = Router();

eventRouter.post('/', async (req: Request, res: Response) => {
  try {
    const message = JSON.parse(
      Buffer.from(req.body.message.data, 'base64').toString().trim()
    );
    const { resource, order } = message;
    logger.info(`Received message: ${JSON.stringify(message)}`);
    logger.info(`Resource: ${JSON.stringify(resource)}`);
    logger.info(`Order: ${JSON.stringify(order)}`);
    if (resource.typeId !== 'order') {
      logger.info('Incorrect type.');
      return res.status(200).send();
    }

    await processOrder(order, resource);
    logger.info('Order processed successfully.');
    return res.status(200).send();
  } catch (error) {
    logger.info(JSON.stringify(error));
    logger.info('Incorect message received.');
    return res.status(200).send();
  }
});

export default eventRouter;
