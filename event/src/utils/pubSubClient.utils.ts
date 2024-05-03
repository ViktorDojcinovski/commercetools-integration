import { PubSub } from '@google-cloud/pubsub';

import { logger } from './logger.utils';

const pubSubClient = new PubSub();

const CONNECT_GCP_TOPIC_NAME_KEY = 'CONNECT_GCP_TOPIC_NAME';
const CONNECT_GCP_PROJECT_ID_KEY = 'CONNECT_GCP_PROJECT_ID';

const props: Map<string, unknown> = new Map(Object.entries(process.env));

const publishMessage = async (
  message: string,
  properties: Map<string, unknown> = props
) => {
  const dataBuffer = Buffer.from(message);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const projectId = properties.get(CONNECT_GCP_PROJECT_ID_KEY);
  const topicName = properties.get(CONNECT_GCP_TOPIC_NAME_KEY);

  const messageId = await pubSubClient
    .topic(topicName as string)
    .publish(dataBuffer, (err, messageId) => {
      if (err) {
        logger.info(`Message ${messageId} not published.`);
      }
    });
  logger.info(`Message ${messageId} published.`);
};

export { publishMessage };
