### Commercetools integration with VirtualStock Order API

This application is built as an extension to the starter template, provided by commercetools.

Please find more info on this [link](https://marketplace.commercetools.com/) and in the Instructions section below.

Please adhere to the recommendations from the Architecture principles for building a connect application section below.

## Instructions

Use `create-connect-app` cli with `starter-typescript` as `template` value to download this template repository to build the integration application , folder structure needs to be followed to ensure certification & deployment from commercetools connect team as stated [here](https://github.com/commercetools/connect-application-kit#readme)

## Architecture principles for building an connect application

- Connector solution should be lightweight in nature
- Connector solutions should follow test driven development. Unit , Integration (& E2E) tests should be included and successfully passed to be used
- No hardcoding of customer related config. If needed, values in an environment file which should not be maintained in repository
- Connector solution should be supported with detailed documentation
- Connectors should be point to point in nature, currently doesnt support any persistence capabilities apart from in memory persistence
- Connector solution should use open source technologies, although connector itself can be private for specific customer(s)
- Code should not contain console.log statements, use [the included logger](https://github.com/commercetools/merchant-center-application-kit/tree/main/packages-backend/loggers#readme) instead.
