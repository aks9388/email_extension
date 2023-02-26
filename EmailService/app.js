const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;
app.use(express.json());

app.get('/sendEmail', (req, res) => {
  res.send('Mail Sent')
});
app.post('/sendEmail', (req, res) => {
  let mailTransporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: "test130793@gmail.com",
      pass: "password",
    },
  });
 
let mailDetails = {
    from: 'test130793@gmail.com',
    to: 'harshit0542@gmail.com',
    subject: 'Test mail',
    text: 'Mail'
};
 
mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
        console.log('Error Occurs');
    } else {
        console.log('Email sent successfully');
    }
});
    console.log(req.body); 
    var responseJson = {"success":true};
    res.send(responseJson);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})