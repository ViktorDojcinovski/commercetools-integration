export const createApiRoot = () => {
  return {
    channels: () => {
      return {
        withId: () => ({
          get: () => {
            return {
              execute: () => {
                return {
                  body: {
                    id: 'channelId',
                    key: 'channelKey',
                  },
                };
              },
            };
          },
        }),
      };
    },
    products: () => {
      return {
        withId: () => ({
          get: () => {
            return {
              execute: () => {
                return {
                  body: {
                    id: 'id',
                    productId: 'productId',
                    masterData: {
                      current: {
                        description: { 'en-GB': 'test description' },
                      },
                    },
                  },
                };
              },
            };
          },
        }),
      };
    },
  };
};
