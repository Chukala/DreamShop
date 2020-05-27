var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
let passport = require('passport');
    LocalStrategy = require('passport-local').Strategy;
    GoogleStrategy = require('passport-google-oauth2').Strategy;

  const config = require('../config/gConfig'); 
  const Cart = require('../models/cart');
  const Order = require('../models/order');
  const print = require('@sammylundqvist/samprint');
  print.setDebug(true);


router.use((req, res, next) => {
    print.debug(req.session.id) // always run
    print.debug("SessionViews : " + req.session.views++) // always run
    print.debug(JSON.stringify(req.session));
    next();
});

router.get('/profile', isLoggedIn, function (req, res, next) {
    Order.find({
        user: req.user
    }, function (err, orders) {
        if (err) {
            return res.write('Error!');
        }
        var cart;
        orders.forEach(function (order) {
            cart = new Cart(order.cart);
            order.items = cart.generateArray();
        });
        res.render('users/profile', {
            orders: orders,
            title: '',
            totalQty:0
        });
        
    });
});

router.get('/logout', isLoggedIn, function (req, res, next) {
    req.logout();
    res.redirect('/');
});

router.use('/', notLoggedIn, function (req, res, next) {
    next();
});

router.get('/register', function (req, res, next) {
    var messages = req.flash('error');
    var cart = new Cart(req.session.cart ? req.session.cart : {
        items: {}
    });
    res.render('users/register', {
        title: 'Registration',
        messages: messages,
         totalQty: cart.totalQty
    });
});

router.post('/register', passport.authenticate('local.register', {
    failureRedirect: '/user/register',
    failureFlash: true
}), function (req, res, next) {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/');
    }
});

//login routes
router.get('/login', function (req, res, next) {
    var messages = req.flash('error');
     var cart = new Cart(req.session.cart ? req.session.cart : {
         items: {}
     });
    res.render('users/login', {
        title: 'Logga In',
        user: req.user,
        messages: messages,
        hasErrors: messages.length > 0,
        totalQty: cart.totalQty
    });
});

router.post('/login', passport.authenticate('local.login', {
    failureRedirect: '/user/login',
    failureFlash: true
}), function (req, res, next) {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/');
    }
});

router.get('/contact', function (req, res, next) {
    var messages = req.flash('error');
     var cart = new Cart(req.session.cart ? req.session.cart : {
         items: {}
     });
    res.render('users/contact', {
        title: 'Kontakt oss',
        messages: messages,
        hasErrors: messages.length > 0,
        msg: '',
        totalQty: cart.totalQty
    });
});

router.post('/contact', function (req, res, next) {
    var cart = new Cart(req.session.cart ? req.session.cart : {
        items: {}
    });
   const contactOutput = `
   <p>You have a new kundservice message</p>
   <h3>Contact details</h3>
   <ul>
      <li>Name:${req.body.username}</li>
      <li>Email:${req.body.email}</li>
      <li>Adress:${req.body.adress}</li>
      <li>PostalAdress:${req.body.postaladdress}</li>
      <li>Telefone:${req.body.telefon}</li>
      <li>OrderNumber:${req.body.ordernumber}</li>
   </ul>
   <h3>Message</h3>
  <p>${req.body.comments}</p>
   `;

   var smtpTransport = nodemailer.createTransport({
       host: "smtp.gmail.com",
       secureConnection: false,
       port: 587,
       requiresAuth: true,
       domains: ["gmail.com", "googlemail.com"],
       auth: {
           user: config.auth.user, 
           pass: config.auth.pass
       }
   });

   // send mail with defined transport object
   var mailOptions = {
       from: '"DreamShop customer "test@gmail.com',
       to: 'sileshic@gmail.com',
       subject: 'Dreamshop customer support',
       //text: req.body.content,
       html: contactOutput
   };

  smtpTransport.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log('Error while sending mail: ' + error);
      } else {
          console.log('Message sent: %s', info.messageId);
      }
      smtpTransport.close();
      res.render('users/contact', {
          title: 'email sent',
          msg: 'You have been sent your email, You will get a response in short periods of time',
          totalQty: cart.totalQty
      });
  });
});

router.get('/klart', isLoggedIn, function (req, res, next) {
    let successMsg = req.flash('success')[0];
    res.render('shop/klart', {
        title: 'Thankyou',
        successMsg: successMsg,
        noMessages: !successMsg
    });
});


module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}