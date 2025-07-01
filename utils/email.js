const nodemailer = require('nodemailer');
require('dotenv').config();
const pug = require('pug');
const htmlToText = require('html-to-text');
module.exports = class Email {
  constructor(user, url) {
    (this.to = user.email),
      (this.firstName = user.name.split(' ')[0]),
      (this.url = url),
      (this.from = `Anastasia <${process.env.MAILGUN_USER}>`);
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      //console.log('MAILGUN_USER:', process.env.MAILGUN_USER);
      //console.log('MAILGUN_PASS:', process.env.MAILGUN_KEY);
      return nodemailer.createTransport({
        host: 'smtp.mailgun.org',
        port: 587,
        auth: {
          user: process.env.MAILGUN_USER,
          pass: process.env.MAILGUN_KEY
        }
      });
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  async send(template, subject) {
    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      {
        firstName: this.firstName,
        url: this.url,
        subject
      }
    );

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.convert(html)
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Natours Family');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token(valid for only 10 minutes)'
    );
  }
};
