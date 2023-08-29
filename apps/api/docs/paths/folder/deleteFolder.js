module.exports = {
  delete: {
    tags: ['User Folders'],
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
        description: 'ID of a folder to be deleted',
        required: true,
        schema: {
          type: 'string',
        },
      },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
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
      404: {
        description: 'Folder is not found',
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
