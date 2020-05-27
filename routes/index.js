var express = require('express');
var router = express.Router();

const Cart = require('../models/cart');
const Product = require('../models/product');
const Order = require('../models/order');
const print = require('@sammylundqvist/samprint');
print.setDebug(true);

 router.use((req, res, next) => {
   print.debug(req.session.id) // always run
   print.debug("SessionViews : " + req.session.views++) // always run
   print.debug(JSON.stringify(req.session));
   next();
 });
/* GET home page. */
router.get('/', function(req, res, next) {
  let successMsg = req.flash('success')[0];
  var cart = new Cart(req.session.cart ? req.session.cart : {
    items: {}
  });
    Product.find(function(err, docs){
      /*let productChunks = [];
      let chunkSize = 3;
      for (let i = 0; i < docs.length; i += chunkSize) {
        productChunks.push(docs.slice(i, i + chunkSize)); 
      }*/
     
    res.render('index', {
      title: 'Our Popular Products',
      //products: productChunks,
      products: docs,
      successMsg: successMsg,
      noMessages: !successMsg,
      totalQty: cart.totalQty          
    });
    }); 
});

/* GET signIn for Admin Page. */
router.get('/adminHome', function (req, res, next) {
  res.render('admin/adminHome', {
    title: 'Admin Page'
  });
});

router.get('/create', function (req, res, next) {
  res.render('admin/create', {
    title: 'Insert new Product'
  });
});

router.get('/update', function (req, res, next) {
  res.render('admin/partials/update', {
    title: 'Update Product'
  });
});

router.get('/admin/create/products/addproduct', function (req, res, next) {
  res.redirect('products/addproduct', {
    title: 'redirect to product page'
  });
});

router.get('/reduce/:id', function (req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.reduceByOne(productId);
  req.session.cart = cart;
  res.redirect('/kassa');
});

router.get('/remove/:id', function (req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.removeItem(productId);
  req.session.cart = cart;
  res.redirect('/kassa');
});

router.get('/kassa', function (req, res, next) {
  
  if (!req.session.cart) {
    return res.render('shop/emptykassa', {
      products: null,
      title: 'Din varukorg är tom',
      totalQty: 0
    });
  }
  let cart = new Cart(req.session.cart);
  res.render('shop/kassa', {
    title: 'Varukorg',
    products: cart.generateArray(),
    totalPrice: cart.totalPrice,
    totalQty: cart.totalQty
  });

});

router.get('/addToCart/:id', function (req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {
    items: {}
  });
  Product.findById(productId, function (err, product) {
    if (err) {
      return res.redirect('/');
    }
    cart.add(product, product.id);
    req.session.cart = cart;

    res.redirect('/');
  });

});

router.get('/checkout', isLoggedIn, function (req, res, next) {

  if (!req.session.cart) {
    return res.redirect('/kassa', {
      title: 'Varukorg'
    });
  }
  let cart = new Cart(req.session.cart);
  let errMsg = req.flash('error')[0];
  res.render('shop/checkout', {
    title: 'Checkout',
    total: cart.totalPrice,
    totalQty:cart.totalQty,
    errMsg: errMsg,
    noError: !errMsg
  });

});

router.post('/checkout', isLoggedIn, function (req, res, next) {
  if (!req.session.cart) {
    return res.redirect('/kassa', {
      products: null,
      totalQty: 0
    });
  }
  let cart = new Cart(req.session.cart);
  const stripe = require("stripe")(
    "sk_test_YDkRs1E6ar4lENIn2Pim8X4P00GvzmdkXv");
  stripe.charges.create({
    amount: cart.totalPrice * 100,
    currency: "sek",
    source: req.body.stripeToken, 
    description: "Test Charge"
  }, function (err, charge) {
    if (err) {
      req.flash('error', err.message);
      return res.redirect('/checkout');
    }
    let order = new Order({
      user: req.user,
      cart: cart,
      name: req.body.name,
      paymentId: charge.id
    });
    order.save(function (err, result) {
      req.flash('success', 'Succesesfully bought product!');
      req.session.cart = null;
      res.redirect('/user/profile');
    });
  });
});
 
module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.oldUrl = req.url;
  res.redirect('/user/login');
}







  