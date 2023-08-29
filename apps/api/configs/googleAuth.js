const { google } = require('googleapis');

// Callback url is to be determined
const callbackUri = 'http://localhost:3001/oauth2callback';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  callbackUri
);

const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
];

const googleAuthUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
});

module.exports = { oauth2Client, googleAuthUrl };
