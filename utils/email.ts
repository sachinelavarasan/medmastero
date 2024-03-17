import nodemailer from 'nodemailer';

// Function to send a verification email
export async function sendResetPasswordEmail(email: string, token: string) {
  // nodemailer configuration. make sure to replace this with your native email provider in production.
  // we will use mailtrap in this tutorial, so make sure you have the correct configuration in your .env
  const transporter: nodemailer.Transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT) || 587,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  // the content of the email
  const emailData = {
    from: '"Reset password" <medmastero@test.com>',
    to: email,
    template_uuid: 'd059c99d-1e0a-4a48-ad88-530cfd15df31',
    template_variables: {
      user_name: 'Test_User_name',
      user_email: 'Test_User_email',
      pass_reset_link: 'Test_Pass_reset_link',
    },
    subject: 'Medmastero Reset Password',
  };

  try {
    // send the email
    await transporter.sendMail(emailData);
  } catch (error) {
    console.log('ssss');
    console.error('Failed to send email:', error);
    throw error;
  }
}
