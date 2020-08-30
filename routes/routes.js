// const requestHandler = ((req,res,next) => {
//     const url = req.url;
//     if(url === '/hello') {
//         res.write('<html><h1>Hello from hello.js</h1></html>');
//         return res.end();
//         }
//     if(url === '/') {
//     res.write('<html><h1>Hello from app.js</h1></html>');
//     return res.end();
//     }
   
// })

// exports.requestHandler = requestHandler;

const express = require('express');
const router = express.Router(); 
const adminController = require('../controllers/admin.js');

// router.get('/admin', (req,res,next) => {
//     res.render()
// })

// MAIN ROUTES

router.get('/', (req,res,next) => {
   res.render('main-view', {
       pageTitle: 'DnB Garage'
   });
})

// ADMIN ROUTES

router.get('/admin', adminController.getAdmin );

router.post('/admin', adminController.postAdmin );

module.exports = router;