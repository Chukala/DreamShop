/*let Product = require('../models/product');

let products = [
    new Product({
        title: 'Addidas',
        ptn: '1234',
        image: '../images/shoes/shoe01.jpg',
        cat: 'shoes',
        price: '1000',
        desc: 'Comfortable'
    }),
     new Product({
         title: 'Nike',
         ptn: '1235',
         image: '../images/shoes/shoe02.jpg',
         cat: 'shoes',
         price: '1500',
         desc: 'Comfortable'
     }),
      new Product({
          title: 'Addidas Shirts',
          ptn: '1236',
          image: '../images/shirts/shirt01.jpg',
          cat: 'shirts',
          price: '1000',
          desc: 'Comfortable'
      }),
       new Product({
           title: 'Nice',
           ptn: '1237',
           image: '../images/dresses/dress01.jpg',
           cat: 'dresses',
           price: '1000',
           desc: 'Comfortable'
       })
   ];
    
   var done = 0;
   for (let i = 0; i < products.length; i++) {
        products[i].save(function(err,result) { 
        done++;
        if (done === products.length) {
            exit();  
        } 
    }); 
   }
   function exit() {
       mongoose.disconnect();
   }*/
   