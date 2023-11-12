import nodemailer from "nodemailer";

class Email {
  constructor(user, url) {
    this.to = user.email;
    this.user = user;
    this.url = url;
    this.from = process.env.EMAIL_FROM;
  }

  newTransport() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendPasswordReset() {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: "Password Reset",
      html: `
      <!DOCTYPE html>
      <html lang="en" style="padding: 40px; width: 100%;">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body>
          <div style="margin: 0 auto; width: 100%; max-width: 600px; background-color: #f5f5f5; padding: 40px;">
            <div style="background-color: #fff; padding: 40px; border-radius: 10px;">
              <h1 style="text-align: center; margin-bottom: 40px;">Reset your password</h1>
              <p style="margin-bottom: 40px;">Hi ${this.user.username},</p>
              <p style="margin-bottom: 40px;">We received a request to reset your password. If you didn't make the request, just ignore this email. Otherwise, you can reset your password using the following link:</p>
              <p style="text-align: center; margin-bottom: 40px; word-wrap: break-word;"><a href="${this.url}">${this.url}</a></p>
              <p style="margin-bottom: 40px;">The link will automatically expire in 10 minutes</p>
              </div>
          </div>
        </body>
      </html>
        `,
    };

    return await this.newTransport().sendMail(mailOptions);
  }
}

export default Email;
