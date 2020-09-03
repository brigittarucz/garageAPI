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

// API ROUTES

router.get('/id/:id', (req, res, next) => {
    console.log(req.params.id);
    fs.readFile('artists.json', (err, data) => {
        if (err) throw err;
        let oArtists = JSON.parse(data);
        for (let i = 0; i < oArtists.artists.length; i++) {
            if (req.params.id === oArtists.artists[i].id) {
                res.status(200).json(oArtists.artists[i]);
                break;
            }
        }
        if (!res.headersSent) {
            res.send('<h1>No artist with this ID. Try again!</h1>');
        }
    });
})

router.get('/name/:artistName', (req, res, next) => {
    let artistName = req.params.artistName.charAt(0).toUpperCase() + req.params.artistName.slice(1).toLowerCase();
    console.log(artistName);
    fs.readFile('artists.json', (err, data) => {
        if (err) throw err;
        let oArtists = JSON.parse(data);
        for (let i = 0; i < oArtists.artists.length; i++) {
            if (artistName === oArtists.artists[i].artistName) {
                res.status(200).json(oArtists.artists[i]);
                break;
            }
        }
        if (!res.headersSent) {
            res.send('<h1>No artist with this name. Try again!</h1>');
        }
    });
})

router.get('/subgenre/:subgenre/:sIssues', (req, res, next) => {
    let subgenre = req.params.subgenre.charAt(0).toUpperCase() + req.params.subgenre.slice(1).toLowerCase();
    let iIssues = parseInt(req.params.sIssues);
    fs.readFile('artists.json', (err, data) => {
        if (err) throw err;
        let oArtists = JSON.parse(data);
        (function () {
            let aData = [];
            for (let i = 0; i < oArtists.artists.length; i++) {
                let sGenres = oArtists.artists[i].subgenre;
                sGenres = sGenres.replace(/\s/g, '');
                let aGenres = sGenres.split(",");
                for (let j = 0; j < aGenres.length; j++) {
                    if (subgenre === aGenres[j]) {
                        console.log(aGenres[j]);
                        aData.push(oArtists.artists[i]);
                        if(aData.length === iIssues) {
                            return res.status(200).json(aData);
                        }
                    }
                }
            }
            if (!res.headersSent) {
                return res.send('<h1>No artist with this name. Try again!</h1>');
            }
        })();
    });
})

router.get('/date/:date', (req, res, next) => {
    let date = req.params.date;
    if(date === 'today') {
        let todayDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime();
    } else {
        console.log(typeof(date));
        console.log(date);
        res.status(200);
    }
    // fs.readFile('artists.json', (err, data) => {
    //     if (err) throw err;
    //     let oArtists = JSON.parse(data);
    //     for (let i = 0; i < oArtists.artists.length; i++) {
    //         if (artistName === oArtists.artists[i].artistName) {
    //             res.status(200).json(oArtists.artists[i]);
    //             break;
    //         }
    //     }
    //     if (!res.headersSent) {
    //         res.send('<h1>No artist with this name. Try again!</h1>');
    //     }
    // });
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