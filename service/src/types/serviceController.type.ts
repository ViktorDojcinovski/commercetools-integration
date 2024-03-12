import { UpdateAction } from '@commercetools/sdk-client-v2';

export type OrderControllerResponse = {
  statusCode: number;
  actions: UpdateAction[];
};
