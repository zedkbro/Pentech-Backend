import nodemailer from 'nodemailer';
import { OAuth2Client } from 'google-auth-library';

const sendPasswordResetEmail = async (email, resetLink) => {
  try {
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID, 
      process.env.CLIENT_SECRET, 
      process.env.REDIRECT_URI 
    );
    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: 'https://www.googleapis.com/auth/gmail.send',
    });
    oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: process.env.USER,
      to: email,
      subject: 'Pentech Password Reset Request',
      html: `Click <a href="${resetLink}">here</a> to reset your password.`,
    };
      await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error(`Failed to send password reset email: ${error}`);
  }
};

export default sendPasswordResetEmail;
