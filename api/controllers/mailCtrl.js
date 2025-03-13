import multer from "multer";
import path from 'path';
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import e from "express";
import { resourceLimits } from "worker_threads";

// const storage = multer.diskStorage({
//   destination: function(req, file, cb){
//       cb(null, 'client/src/admin/uploads/');
//   },
//   filename: function(req, file, cb){
//      cb(null, Date.now() + path.extname(file.originalname))
//  }
// });

// const storage = multer.memoryStorage();

const upload = multer().single('txtfile')
  // limits: { fileSize: 2*1024*1024 },


export const mailClient = async (req,res) => {
 await upload(req, res, (err) => {
  if (err) {
    console.error(err);
    return res.status(500).json({ error: err });
  }
  let name = req.body.name;
  let email = req.body.email;
  let subject = req.body.subject;
  let temp = req.body.template;
  let message = req.body.message;

  if (!(req.file || email))
    return res.status(500).json("no recipient found");
    // both cannot be true or false
    // xor logic
    let flag = false;
  if ((req.file && !email) || (!req.file && email)) {
      flag = true;
    } 

  if (!flag) {
      return res.status(500).json("you can't use both recipient field and multiple txt field choose one")
  }
  
  
  if (message.includes("{name}") && !name)
  {
      return res.status(500).json("name used in template but name field empty");
  }
  else{
      message = message.replace("{name}", name)
  }

  if (message.includes("{email}"))
  {
      message = message.replace("{email}", email);
  }
  
   if ( email ) {
    // temp == "true" ? send_s() : send_t()
     temp == "true" ?
      send_single_email_template(email,subject,message) :
       send_single_email(email,subject,message)
     }

   if (req.file){
    const fileContent = req.file.buffer.toString();
    const emailArray = fileContent
    .split('\n')
    .map(email => email.trim())
    .filter(email => email && !email.includes(',') && !email.includes(' '));
     temp == "true" ?
      send_bulk_email_template(emailArray,subject,message) 
     : send_bulk_email(emailArray,subject,message)
 }
});

function send_single_email(e,s,m){
  const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
      user: process.env.SMTP_GMAIL,
      pass: process.env.SMTP_PASSSWORD
    }
  });
    const mailOptions = {
      from: `Admin <${process.env.SMTP_GMAIL}>`,
      to: e,
      subject: s,
      html: m
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
          console.log(error);
          return res.status(500).send("ERR from server");
        }
        res.status(200).send("Email sent successfully"); 
    });
  }

  function send_single_email_template(e,s,m){
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_GMAIL,
        pass: process.env.SMTP_PASSSWORD
      }
    });
    const handlebarOptions = {
      viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve('./client/src/admin/layouts'),
        defaultLayout: false,
      },
      viewPath: path.resolve('./client/src/admin/layouts'),
      extName: ".handlebars",
    }
    
    transporter.use('compile', hbs(handlebarOptions));
    
    var mailOptions = {
      from: `Admin <${process.env.SMTP_GMAIL}>`,
      to: e,
      subject: s,
      template: 'email',
      context: {
        text: m
      }};

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).json("Server ERR - Email not delivered");
      } else {
        console.log('Email sent: ' + info.response);
        return res.status(200).json("Email delivered Successfully");
      }
    });
    }

function send_bulk_email(e,s,m){
const transporter = nodemailer.createTransport({
      service: "gmail", 
      auth: {
        user: process.env.SMTP_GMAIL,
        pass: process.env.SMTP_PASSSWORD
      },
pool: true,
maxMessages: Infinity,
maxConnections: 20
    });
     /* const mailOptions = {
        from: process.env.GMAIL,
        to: email,
        subject: subject,
        html: req.body.message
      };*/
     const emailPromises = e.map(recipient => {
    transporter.sendMail({
        from: `Admin <${process.env.GMAIL}>`,
        to: recipient,
        subject: s,
        html: m
});
});
Promise.all(emailPromises).then(results => {
console.log("All emails sent successfully");
//results.forEach(result => { #####
// console.log(`Messages to ${result.envelop.to} from ${message.envelopId}`); // envelop return undefined
//}) #####
return res.status(200).json("All Emails delivered");
}).catch(errors => {
console.log("failed to send one or more emails", errors);
return res.status(500).json("Server ERR - Email not delivered");
})
}

function send_bulk_email_template(e,s,m){
  var transporter = nodemailer.createTransport( {
    service: 'gmail',
    auth: {
      user: process.env.SMTP_GMAIL,
      pass: process.env.SMTP_PASSSWORD
    }
  });
  const handlebarOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve('./client/src/admin/layouts'),
      defaultLayout: false,
    },
    viewPath: path.resolve('./client/src/admin/layouts'),
    extName: ".handlebars",
  }
  
  transporter.use('compile', hbs(handlebarOptions));
  
  const emailPromises = e.map(recipient => {
  transporter.sendMail({
      from: `Admin <${process.env.GMAIL}>`,
      to: recipient,
      subject: s,
      template: 'email',
      context: {
      text: m,
  }});
  });
  Promise.all(emailPromises).then(results => {
  console.log("All emails sent successfully");
  // results.forEach(result => {##################
  // console.log(`Messages to ${result.envelop.to} from ${result.messageId}`) // envelop is returned as undefined
  // })################
  return res.status(200).json("All Emails delivered");
  }).catch(errors => {
  console.log("failed to send one or more emails", errors);
  return res.status(500).json("Server ERR - Email not delivered");
  })
  }
}