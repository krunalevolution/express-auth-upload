import nodemailer from "nodemailer";
import Handlebars from "handlebars";
import fs from "fs";

const PORT = process.env.PORT;

const sendMail = async (email: string, uniqueString: string) => {
  let testAccount = await nodemailer.createTestAccount();

  let transport = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // template view
  const template = Handlebars.compile(
    fs.readFileSync("./views/email-template.handlebars", "utf-8")
  );
  const html = template({ token: uniqueString });

  let info = await transport.sendMail({
    from: '"Demo Express 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Verify Account ✔", // Subject line
    // html: `Please click <a href=http://localhost:4000/api/user/verify/${uniqueString}> here </a> to verify your email. Link will expire in 15 minutes Thanks.`, // html body
    html: html,
  });

  console.log("Message sent: %s", info.messageId);

  // Preview URL
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

export default sendMail;
