module.exports = {
  post: {
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
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'Name for the folder',
              },
              parentFolder: {
                type: 'string',
                description: 'Id of the parent folder',
                required: true,
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Folder is successfully created.',
        content: {
          'application/json': {
            schema: {
              $ref: '#components/schemas/Folder',
            },
          },
        },
      },
      400: {
        description: 'Folder already exists.',
        content: {
          'application/json': {
            schema: {
              $ref: '#components/schemas/Error',
            },
          },
        },
      },
      404: {
        description: 'Parent folder is not found.',
        content: {
          'application/json': {
            schema: {
              $ref: '#components/schemas/Error',
            },
          },
        },
      },
    },
    tags: ['User Folders'],
  },
};
