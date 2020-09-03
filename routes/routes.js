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
const dashboardController = require('../controllers/dashboard.js');
const fs = require('fs');
// router.get('/admin', (req,res,next) => {
//     res.render()
// })

// MAIN ROUTES

router.get('/', (req, res, next) => {

    fs.readFile('artists.json', (err, data) => {
        if (err) throw err;
        let oArtists = JSON.parse(data);
        res.status(200).json(oArtists);
    });

})

// ADMIN ROUTES

router.get('/admin', adminController.getAdmin);

router.post('/admin', adminController.postAdmin);

router.get('/dashboard', dashboardController.getDashboard);

router.post('/dashboard/edit-artist', dashboardController.editArtist);

router.post('/dashboard', dashboardController.updateArtist);

router.post('/dashboard/delete-artist', dashboardController.deleteArtist);

router.get('/documentation', dashboardController.getDocumentation);

module.exports = router;