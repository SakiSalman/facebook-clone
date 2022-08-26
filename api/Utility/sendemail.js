import nodemailer from 'nodemailer'



export const sendEMail = async (to, subject, text) => {


    try {

        let transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            auth: {
              user: "smithsamantha19484@gmail.com",
              pass: "vthseclslqsgsgbv"
            }
          });
        
         // send mail with defined transport object
            await transport.sendMail({
                from: 'saki47@gmail.com',
                to: to,
                subject: subject,
                text: text
              });
        
    } catch (error) {
        console.log(error);
    }
}