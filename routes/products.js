var express = require('express');
var router = express.Router();


const Product = require('../models/product');
const Cart = require('../models/cart');


router.post('/addproduct', function (req, res, next) {

    let title = req.body.title;
    let partnumber = parseInt(req.body.partnumber);
    let img = req.body.image;
    let cat = req.body.cat;
    let price = parseInt(req.body.price);
    let desc = req.body.desc;

    const product = new Product({
        title: title,
        ptn: partnumber,
        image: cat + "/" + img, 
        cat: cat, 
        price: price, 
        desc: desc 
    })

    product.save().then(result => { 
        console.log(result)
    }).catch((err) => {
        console.log(err.errmsg)
    })

    res.redirect("/admin/adminHome")

});

router.post('/updateproduct', function (req, res, next) {
    try {
        const query = Product.find({
            ptn: new RegExp(req.query.ajax)
        });
        query.then((result) => {
                
            }).catch((err) => {
                res.redirect("/products")
            })
    } catch (err) {
        res.redirect("/products")
    }
    product.updateOne(myquery, newvalues ).then(result => {
        console.log(result +'1 document updated');
    }).catch((err) => {
        console.log(err.errmsg)
    })
    res.redirect("/admin/adminHome")
});

router.get('/', function (req, res, next) {
   var cart = new Cart(req.session.cart ? req.session.cart : {
       items: {}
   });
    let category = req.query.cat;

    if (req.query.ajax)
        return next();

    const query = Product.find({
        cat: category
    });

    query.then((result) => {
        let successMsg = req.flash('success')[0];
        res.render("products/productlisting_front", {
            productlist: result,
            title: category,
            successMsg: successMsg,
            noMessages: !successMsg,
            totalQty: cart.totalQty
        })
    }).catch((err) => {
        res.redirect("/products")
    })

});

// lets do a search mechanism using AJAX
router.get('/search', function (req, res, next) {
        var cart = new Cart(req.session.cart ? req.session.cart : {
            items: {}
        });
    try {
        const query = Product.find({
            title: new RegExp(req.query.ajax)
        });
        query
            .then((result) => {
                res.render("products/listing", {
                    productlist: result,
                    title: category,
                    totalQty: cart.totalQty
                })
            }).catch((err) => {
                res.redirect("/products")
            })
    } catch (err) {
        res.redirect("/products")
    }
});

router.get('/dam', function (req, res, next) {

    var cart = new Cart(req.session.cart ? req.session.cart : {
        items: {}
    });
    let category = req.query.cat;

    if (req.query.ajax)
        return next();

    const query = Product.find({
        cat: category
    });

    query.then((result) => {
        res.render("products/productlisting_front", {
            productlist: result,
            title: 'DAM',
            content: category,
            totalQty: cart.totalQty
        })
    }).catch((err) => {
        res.redirect("/products/dam")
    })
});

router.get('/herr', function (req, res, next) {
 var cart = new Cart(req.session.cart ? req.session.cart : {
     items: {}
 });
    let category = req.query.cat;

    if (req.query.ajax)
        return next();

    const query = Product.find({
        cat: category
    });

    query.then((result) => {
        res.render("products/productlistingherr", {
            productlist: result,
            title: 'HERR',
            content: category,
            totalQty: cart.totalQty
        })
    }).catch((err) => {
        res.redirect("/products/herr")
    })
});

router.get('/barn', function (req, res, next) {
  var cart = new Cart(req.session.cart ? req.session.cart : {
      items: {}
  });
    let category = req.query.cat;

    if (req.query.ajax)
        return next();

    const query = Product.find({
        cat: category
    });

    query.then((result) => {
        res.render("products/productlisting_front", {
            productlist: result,
            title: 'BARN',
            content: category,
            totalQty: cart.totalQty
            
        })
    }).catch((err) => {
        res.redirect("/products/barn")
    })
});


module.exports = router;