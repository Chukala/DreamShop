var express = require('express');
var router = express.Router();


/* GET index(Home) Page. */

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'DreamShop'
  });
});

/* GET Admin Page. */
router.get('/adminHome', function (req, res, next) {
  res.render('admin/adminHome', {
    title: 'Admin Page'
  });
});

/* GET signIn Page. */
router.get('/signIn', function (req, res, next) {
  res.render('admin/adminindex', {
    title: 'Admin SignIn'
  });
});

/* POST Admin signIn Page. */
router.post('/signIn', function (req, res, next) {
  const admin_email = "sileshic@gmail.com";
  const admin_pass = "12345";
  var messages = req.flash('error');
  let email = req.body.email;
  let password = req.body.password;
  if((admin_email === email) && (admin_pass === password)) { 
    res.render('admin/adminHome', {
      title: 'Admin SignIn',
      messages: messages,
      hasErrors: messages.length > 0
    });
  } else {
    res.redirect("/signIn");
  }
});

 /* Admin logout Page. */
router.get('/logout', isLoggedIn, function (req, res, next) {
  req.logout();
  res.redirect('/index');
});

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.oldUrl = req.url;
  res.redirect('/');
}