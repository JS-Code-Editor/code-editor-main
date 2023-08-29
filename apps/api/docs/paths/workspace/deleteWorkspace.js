module.exports = {
  delete: {
    tags: ['User Workspace'],
    description:
      "Deletes user's workspace including all the fodlers and files which belong to an user",
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
        description: 'Workspace is successfully deleted.',
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
