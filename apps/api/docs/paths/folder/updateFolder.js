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
        name: 'folderId',
        in: 'path',
        description: 'ID of a folder to be updated',
        required: true,
        schema: {
          type: 'string',
        },
      },
    ],
    tags: ['User Folders'],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['name'],
            properties: {
              name: {
                type: 'string',
                description: 'A new name for the folder',
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Folder is successfully updated.',
        content: {
          'application/json': {
            description: 'Folder with an updated name',
            schema: {
              $ref: '#components/schemas/Folder',
            },
          },
        },
      },
      400: {
        description: 'Folder name can not be empty.',
        content: {
          'application/json': {
            schema: {
              $ref: '#components/schemas/Error',
            },
          },
        },
      },
      404: {
        description: 'Folder is not found.',
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
