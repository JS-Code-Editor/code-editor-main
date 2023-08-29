module.exports = {
  post: {
    description: 'User Registration',
    tags: ['User Auth'],
    parameters: [],
    responses: {
      200: {
        description: 'User is successfully registered',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'User is registered successfully!',
                },
              },
            },
          },
        },
      },
      400: {
        description: 'Email or Username is in use',
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
            $ref: '#components/schemas/UserRegister',
          },
        },
      },
    },
  },
};
