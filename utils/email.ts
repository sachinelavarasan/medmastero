import nodemailer from 'nodemailer';
import { resetEmailData, templatesInterface } from './email_types';
import { MailtrapClient } from 'mailtrap';

const TOKEN = 'a209721073d6b950c6601d47e41c8a4f';
const ENDPOINT = 'https://send.api.mailtrap.io/';

const client = new MailtrapClient({ token: TOKEN });

let templates: templatesInterface = {
  reset_password: 'd059c99d-1e0a-4a48-ad88-530cfd15df31',
};

// Function to send a verification email
// export async function sendResetPasswordEmail(data: resetEmailData) {
//   // nodemailer configuration. make sure to replace this with your native email provider in production.
//   // we will use mailtrap in this tutorial, so make sure you have the correct configuration in your .env
//   const transporter: nodemailer.Transporter = nodemailer.createTransport({
//     host: process.env.MAIL_HOST,
//     port: Number(process.env.MAIL_PORT) || 587,
//     auth: {
//       user: process.env.MAIL_USERNAME,
//       pass: process.env.MAIL_PASSWORD,
//     },
//   });

//   // the content of the email
//   const emailData = {
//     from: '"Reset password" <mailtrap@demomailtrap.com>',
//     to: data.email,
//     template_uuid: 'd059c99d-1e0a-4a48-ad88-530cfd15df31',
//     template_variables: {
//       user_name: data.name,
//       user_email: data.email,
//       pass_reset_link: data.reset_link,
//     },
//     subject: 'Medmastero Reset Password',
//   };

//   try {
//     // send the email
//     await transporter.sendMail(emailData);
//     console.log('Reset email sended');
//   } catch (error) {
//     console.error('Failed to send email:', error);
//     throw error;
//   }
// }
export async function sendResetPasswordEmail(data: resetEmailData) {
  // nodemailer configuration. make sure to replace this with your native email provider in production.
  // we will use mailtrap in this tutorial, so make sure you have the correct configuration in your .env

  try {
    const sender = {
      email: 'mailtrap@demomailtrap.com',
      name: 'Mailtrap Test',
    };
    const recipients = [
      {
        email: data.email,
      },
    ];

    await client.send({
      from: sender,
      to: recipients,
      template_uuid: templates.reset_password,
      template_variables: {
        user_name: data.name,
        user_email: data.email,
        pass_reset_link: data.reset_link,
      },
    });
    console.log('Reset email sended');
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}
