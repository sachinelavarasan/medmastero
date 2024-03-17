'use server';

import nodemailer from 'nodemailer';

export async function gstVerification(gstin: string) {
  const url = `${process.env.GST_RAPID_ENDPOINT}/${gstin}/details`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_APIKEY!,
      'X-RapidAPI-Host': 'powerful-gstin-tool.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Function to send a verification email
export async function sendVerificationEmail(email?: string, token?: string) {
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

  // template_uuid: "d059c99d-1e0a-4a48-ad88-530cfd15df31",
  //   template_variables: {
  //     "user_email": "Test_User_email",
  //     "pass_reset_link": "Test_Pass_reset_link"
  //   }

  // the content of the email
  const emailData = {
    from: '"Reset password" <medmastero@test.com>',
    to: 'jananigopalsanthi@gmail.com',
    template_uuid: 'd059c99d-1e0a-4a48-ad88-530cfd15df31',
    template_variables: {
      user_email: 'Test_User_email',
      pass_reset_link: 'Test_Pass_reset_link',
    },
    subject: 'Medmastero Reset Password',
    html: `
      <p>Click the link below to verify your email:</p>
      <a href="http://localhost:3000/email/verify?email=jananigopalsanthi@gmail.com&token=12334">Verify Email</a>
    `,
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
