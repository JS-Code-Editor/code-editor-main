module.exports = {
  post: {
    description: 'User Login',
    tags: ['User Auth'],
    parameters: [],
    responses: {
      200: {
        description: 'User is successfully signed in',
        content: {
          'application/json': {
            schema: {
              $ref: '#components/schemas/UserToken',
            },
          },
        },
      },
      404: {
        description: 'User is not found in Database',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
            },
          },
        },
      },
      401: {
        description: 'Provided password in invalid',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
            },
          },
        },
      },
    },
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#components/schemas/UserLogin',
          },
        },
      },
    },
  },
};
