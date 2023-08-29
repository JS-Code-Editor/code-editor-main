module.exports = {
  patch: {
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
        description: 'ID of a file to be updated',
        required: true,
        schema: {
          type: 'string',
        },
      },
    ],
    tags: ['User Files'],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['name', 'content'],
            description:
              "Both 'name' and 'content' fields must be provided although only one of them needs to be updated",
            properties: {
              name: {
                type: 'string',
                description: 'A new name for the file',
              },
              content: {
                type: 'string',
                description: 'A new content for the file',
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: 'File is successfully updated.',
        content: {
          'application/json': {
            schema: {
              $ref: '#components/schemas/File',
            },
          },
        },
      },
      400: {
        description: 'File name can not be empty.',
        content: {
          'application/json': {
            schema: {
              $ref: '#components/schemas/Error',
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
