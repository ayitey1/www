import Mailgen from 'mailgen';
import nodemailer from 'nodemailer';

import ENV from '../router/config.js';

// https://ethereal.email/create
let nodeConfig = {
    service :"Gmail", // true for 465, false for other ports
    auth: {
        user: ENV.email, // generated GMAIL user
        pass: ENV.password, // generated GMAIL password
    }
}

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
    theme: "default",
    product : {
        name: "WorkHive",
        link: 'https://mailgen.js/',
        copyright: '' 
    }
})

/** POST: http://localhost:8080/api/registerMail 
 * @param: {
  "username" : "example123",
  "userEmail" : "admin123",
  "text" : "",
  "subject" : "",
}
*/
export const registerMail = async (req, res) => {
    const {  firstName ,
        surName ,
        otherName ,
        Email ,
        phone ,
        degree ,
        country ,
        region ,
        city} = req.body;

    // body of the email
    var email = {
        body : {
            name: firstName ,
            intro :  'WorkHive' ,
            outro: 'Welcome to WORK HIVE!🎉Your account has been successfully created. You can now log in and start exploring our platform.If you have any questions, feel free to reach out to our support team at [support@workHive.com].Happy exploring!Best regards,The WORK HIVE Team',
            signature: false  // Disables default Mailgen signature/footer
        }
    }

    var emailBody = MailGenerator.generate(email);

    let message = {
        from : ENV.email,
        to: Email,
        subject :  degree || "Signup Successful",
        html : emailBody
    }

    // send mail
    transporter.sendMail(message)
        .then(() => {
            return res.status(200).send({ msg: "You should receive an email from us."})
        })
        .catch(error => res.status(500).send({ error }))

}