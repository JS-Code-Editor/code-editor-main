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
        name: 'folderId',
        in: 'path',
        description: 'ID of a folder to be fetched',
        required: true,
        schema: {
          type: 'string',
        },
      },
    ],
    tags: ['User Folders'],
    responses: {
      200: {
        description: 'Folder with all the files and children folders',
        content: {
          'application/json': {
            schema: {
              $ref: '#components/schemas/Folder',
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
