
var nodemailer = require('nodemailer')

const senderEmail = 'gnom2024@gnom-pomoshnik.com';
const senderPassword = 'Gnompomoshnik2024';
const recipientEmail = 'priz.a47@gmail.com';
const subject = 'OTP Verification';
class Mailer{
    async sendMessage(mail:string,otp:string){
        const transporter = nodemailer.createTransport({
            service:"yandex",
            // host: 'smtp.yandex.ru',
            // port: 465,
            // secure: false, // true for TLS, false for SSL
            auth: {
              user: 'GnomHelper2024@yandex.com',
              pass: 'wjkygxstsjyxguaa',
            }
          });
          const message = {
            from: 'GnomHelper2024@yandex.com',
            to: mail,
            subject: 'OTP Code',
            text: otp,
          };
          await transporter.sendMail(message,(err: any)=>{
            console.log(err);
            
          });
    }
}

export default new Mailer()