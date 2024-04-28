import CustomError from '../errors/custom.error';
import envValidators from '../validators/env.validators';
import { getValidateMessages } from '../validators/helpers.validators';
import { Config } from '../interfaces/config.interface';

/**
 * Read the configuration env vars
 * (Add yours accordingly)
 *
 * @returns The configuration with the correct env vars
 */
export const readConfiguration = () => {
  const envVars: Config = {
    clientId: process.env.CTP_CLIENT_ID as string,
    clientSecret: process.env.CTP_CLIENT_SECRET as string,
    projectKey: process.env.CTP_PROJECT_KEY as string,
    scope: process.env.CTP_SCOPE || '',
    region: process.env.CTP_REGION as string,
    vsPassword: process.env.CTP_VS_PASSWORD as string,
    vsUsername: process.env.CTP_VS_USERNAME as string,
    vsApi_v4: process.env.CTP_VIRTUALSTOCK_API_V4 as string,
    edgeApi_v4: process.env.CTP_EDGE_API_V4 as string,
  };

  const validationErrors = getValidateMessages(envValidators, envVars);

  if (validationErrors.length) {
    throw new CustomError(
      'InvalidEnvironmentVariablesError',
      'Invalid Environment Variables please check your .env file',
      validationErrors
    );
  }

  return envVars;
};
