module.exports = {
  post: {
    tags: ['User Workspace'],
    parameters: [
      {
        name: 'x-access-token',
        in: 'header',
        description:
          'Access token. It is usually generated when an user signs in. It is used to access protected recources',
        required: true,
        schema: {
          $ref: '#components/parameters/Token',
        },
      },
    ],
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                rootFolderId: {
                  type: 'string',
                  description: 'ID of the root folder',
                },
              },
            },
          },
        },
      },
      400: {
        description: 'This indicated that user already has a workspace',
        content: {
          'application/json': {
            schema: {
              $ref: '#components/schemas/Error',
            },
          },
        },
      },
    },
  },
};
