const User = require('../models/User');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.MAIL_API_KEY );
const {errorHandler}= require('../utils/errorHandler')



exports.userRegister = async(req, res) =>{

    
        const { name, email, password } = req.body;  
        const errors = validationResult(req);
      
        if (!errors.isEmpty()) {
          const firstError = errors.array().map(error => error.msg)[0];    
          return res.status(402).json({
            errors: firstError
          });
        } else {
          User.findOne({
            email
          }).exec((err, user) => {
            if (user) {
              return res.status(400).json({
                errors: 'Email is taken'
              });
            }
          });
      
          const token = jwt.sign(
            {
              name,
              email,
              
            },
            process.env.JWT_ACCESS_TOKEN,
            {
              expiresIn: '1h'
            }
          );
      
          const emailData = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Account activation link',
            html: `
                      <h1>Please use the following to activate your account</h1>
                      <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
                      <hr />
                      <p>This email may containe sensetive information</p>
                      <p>${process.env.CLIENT_URL}</p>
                  `
          };
      
          sgMail
            .send(emailData)
            .then(sent => {
              return res.json({
                message: `Email has been sent to ${email}`
              });
            })
            .catch(err => {
              return res.status(400).json({
                success: false,
                errors: errorHandler(err)
              });
            });
        }
      };


      exports.userRegisterEmailActivationController = (req, res) => {
        const { token } = req.body;
      
        if (token) {
          jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, decoded) => {
            if (err) {
              return res.status(401).json({
                errors: 'Expired link. Signup again'
              });
            } else {
              const { name, email, password } = jwt.decode(token);
      
              console.log(email);
              const user = new User({
                name,
                email,
                password
              });
      
              user.save((err, user) => {
                if (err) {
                  console.log('Save error', errorHandler(err));
                  return res.status(401).json({
                    errors: errorHandler(err)
                  });
                } else {
                  return res.json({
                    success: true,
                    message: user,
                    message: 'Signup success'
                  });
                }
              });
            }
          });
        } else {
          return res.json({
            message: 'error happening please try again'
          });
        }
      };
      
      exports.userLoginController = (req, res) => {
        const { email, password } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          const firstError = errors.array().map(error => error.msg)[0];
          return res.status(422).json({
            errors: firstError
          });
        } else {
          User.findOne({
            email
          }).exec((err, user) => {
            if (err || !user) {
              return res.status(400).json({
                errors: 'User with that email does not exist. Please signup'
              });
            }
            if (!user.authenticate(password)) {
              return res.status(400).json({
                errors: 'Email and password do not match'
              });
            }
            const token = jwt.sign(
              {
                _id: user._id
              },
              process.env.JWT_ACCESS_TOKEN,
              {
                expiresIn: '1d'
              }
            );
            const { _id, name, email, role } = user;
      
            return res.json({
              token,
              user: {
                _id,
                name,
                email,
                role
              }
            });
          });
        }
      };

