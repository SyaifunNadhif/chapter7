const nodemailer = require('nodemailer');
const {oauth2Client} = require('./oauth2');

const {
    GOOGLE_REFRESH_TOKEN,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_SENDER_EMAIL
} = process.env;

// set access token
oauth2Client.setCredentials({refresh_token: GOOGLE_REFRESH_TOKEN});

module.exports = {
    sendMail: async (to, subject, html) => {
        const accessToken = await oauth2Client.getAccessToken();
        console.log({GOOGLE_REFRESH_TOKEN});
        console.log({accessToken});

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: GOOGLE_SENDER_EMAIL,
                clientId: GOOGLE_CLIENT_ID,
                clientSecret: GOOGLE_CLIENT_SECRET,
                refreshToken: GOOGLE_REFRESH_TOKEN,
                accessToken: accessToken
            }
        });

        transport.sendMail({to, subject, html});
    }
          
}

