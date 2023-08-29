module.exports = {
  get: {
    tags: ['User Workspace'],
    description: "Retrieves user's workspace",
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
              $ref: '#components/schemas/Workspace',
            },
          },
        },
      },
      404: {
        description: "User's workspace is not found",
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
