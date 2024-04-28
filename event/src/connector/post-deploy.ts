import dotenv from 'dotenv';
dotenv.config();

import { createApiRoot } from '../client/create.client';
import { assertError, assertString } from '../utils/assert.utils';
import { createOrderCreateSubscription } from './actions';

const CONNECT_GCP_TOPIC_NAME_KEY = 'CONNECT_GCP_TOPIC_NAME';
const CONNECT_GCP_PROJECT_ID_KEY = 'CONNECT_GCP_PROJECT_ID';

async function postDeploy(properties: Map<string, unknown>): Promise<void> {
  const topicName = properties.get(CONNECT_GCP_TOPIC_NAME_KEY);
  const projectId = properties.get(CONNECT_GCP_PROJECT_ID_KEY);

  assertString(topicName, CONNECT_GCP_TOPIC_NAME_KEY);
  assertString(projectId, CONNECT_GCP_PROJECT_ID_KEY);

  const apiRoot = createApiRoot();
  await createOrderCreateSubscription(apiRoot, topicName, projectId);
}

async function run(): Promise<void> {
  try {
    const properties = new Map(Object.entries(process.env));
    await postDeploy(properties);
  } catch (error) {
    assertError(error);
    process.stderr.write(`Post-deploy failed: ${error.message}`);
    process.exitCode = 1;
  }
}

run();
