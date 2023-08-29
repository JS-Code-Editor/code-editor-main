module.exports = {
  components: {
    schemas: {
      UserRegister: {
        type: 'object',
        description: 'Used to sign the user up',
        required: ['username', 'email', 'password'],
        properties: {
          username: {
            type: 'string',
            example: 'jhon',
            minLength: 3,
            maxLength: 15,
          },
          email: {
            type: 'string',
            example: 'example@gmail.com',
          },
          password: {
            type: 'string',
            minLength: 8,
          },
        },
      },
      UserLogin: {
        type: 'object',
        description: 'Used to sign the user in',
        required: ['username', 'password'],
        properties: {
          username: {
            type: 'string',
            description: 'Either username or email is accepted.',
          },
          password: {
            type: 'string',
          },
        },
      },
      UserToken: {
        type: 'object',
        description:
          'User information which is sent as a response when user successfully logins',
        required: ['username', 'email', 'password'],
        properties: {
          username: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
          _id: {
            type: 'string',
          },
          createdAt: {
            type: 'string',
            format: 'date',
          },
          updatedAt: {
            type: 'string',
            format: 'date',
          },
          accessToken: {
            type: 'string',
            description:
              'Generated token that can be sent in a request header: Expires in 1 day',
          },
        },
      },
      Error: {
        type: 'object',
        properties: {
          error: {
            type: 'object',
            properties: {
              status: {
                type: 'integer',
              },
              message: {
                type: 'string',
              },
            },
          },
        },
      },
      Workspace: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
          },
          theme: {
            type: 'string',
            description: 'The theme of a code editor user is working with',
            example: 'dark',
            default: 'dark',
          },
          rootFolder: {
            type: 'string',
            description: 'ID of the root folder',
          },
          createdBy: {
            type: 'string',
            description: 'ID of an user who created this workspace',
          },
          ceratedAt: {
            type: 'string',
            format: 'date',
          },
          updatedAt: {
            type: 'string',
            format: 'date',
          },
        },
      },
      Folder: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
          },
          name: {
            type: 'string',
            default: 'new_folder',
          },
          isRoot: {
            type: 'boolean',
            default: false,
            description:
              "This indicated wether the folder is topmost folder. Root folder's name is always 'null'",
          },
          files: {
            type: 'array',
            items: {
              $ref: '#components/schemas/File',
            },
          },
          childrenFolders: {
            type: 'array',
            items: {
              type: 'object',
            },
            description: 'Array of folders.',
          },
          createdBy: {
            type: 'string',
            description: 'ID of an user who created this workspace.',
          },
          ceratedAt: {
            type: 'string',
            format: 'date',
          },
          updatedAt: {
            type: 'string',
            format: 'date',
          },
        },
      },
      File: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
          },
          name: {
            type: 'string',
            default: 'new_file',
          },
          content: {
            type: 'string',
            description: 'Defines what is inside of the file',
          },
          parentFolder: {
            type: 'string',
            description: 'Parent folder ID',
          },
          createdBy: {
            type: 'string',
            description: 'ID of an user who created this workspace',
          },
          ceratedAt: {
            type: 'string',
            format: 'date',
          },
          updatedAt: {
            type: 'string',
            format: 'date',
          },
        },
      },
    },
    parameters: {
      Token: {
        type: 'string',
      },
    },
  },
};
