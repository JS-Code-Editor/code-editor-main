module.exports = {
  get: {
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
      {
        name: 'fileId',
        in: 'path',
        description: 'ID of a file to be fetched',
        required: true,
        schema: {
          type: 'string',
        },
      },
    ],
    tags: ['User Files'],
    responses: {
      200: {
        description: 'File with its content',
        content: {
          'application/json': {
            schema: {
              $ref: '#components/schemas/File',
            },
          },
        },
      },
      404: {
        description: 'File is not found.',
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
