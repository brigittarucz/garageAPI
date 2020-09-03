const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.js');
const dashboardController = require('../controllers/dashboard.js');
const fs = require('fs');

router.get('/', (req, res, next) => {

    fs.readFile('artists.json', (err, data) => {
        if (err) throw err;
        let oArtists = JSON.parse(data);
        res.status(200).json(oArtists);
    });

})

// API ROUTES

router.get('/id/:id', (req, res, next) => {
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
    fs.readFile('artists.json', (err, data) => {
        if (err) throw err;
        let oArtists = JSON.parse(data);
        for (let i = 0; i < oArtists.artists.length; i++) {
            if (artistName === oArtists.artists[i].artistName || oArtists.artists[i].artistName.includes(artistName) ) {
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
    if(iIssues !== 0 ) {
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
                        aData.push(oArtists.artists[i]);
                        if(aData.length === iIssues) {
                            return res.status(200).json(aData);
                        }
                    }
                }
            }
            if(aData[0] !== undefined) {
                return res.status(200).json(aData);
            } else if (!res.headersSent) {
                return res.send('<h1>No artist with this name. Try again!</h1>');
            }
        })();
    });
    } else {
        return res.send('<h1>Add a value higher than 0.</h1>');
    }
})

router.get('/date/:date', (req, res, next) => {
    let date = req.params.date;

    let dateInput;

    if(date === 'today') {
        dateInput = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime();
    } else {
        let aDates = date.split("-");
        for(let i = 0; i < aDates.length; i++) {
            aDates[i] = parseInt(aDates[i]);
        }
        dateInput = new Date(aDates[0], aDates[1] -= 1, aDates[2]);
        dateInput = dateInput.getTime();
    }

    fs.readFile('artists.json', (err, data) => {
        if (err) throw err;
        let oArtists = JSON.parse(data);
        let aData = [];
        for (let i = 0; i < oArtists.artists.length; i++) {
            if (dateInput < oArtists.artists[i].dateAdded) {
                aData.push(oArtists.artists[i]);
            }
        }
        if (aData[0] !== undefined) {
           res.status(200).json(aData);
        } else if (!res.headersSent) {
           res.send('<h1>No artist(s) on this date. Try again!</h1>');
        }
    });
})

// TODO: month

// TODO: year

router.get('/song/:songTitle', (req, res, next) => {
    let song = req.params.songTitle.toLowerCase();

    if(song.length > 2) {
    fs.readFile('artists.json', (err, data) => {
        if (err) throw err;
        let oArtists = JSON.parse(data);
        let aData = [];

        for (let i = 0; i < oArtists.artists.length; i++) {
            if (oArtists.artists[i].song1.toLowerCase().includes(song)) {
                let queryModel = {};
                queryModel.artist = oArtists.artists[i].artistName;
                queryModel.url = oArtists.artists[i].url1;
                queryModel.song = oArtists.artists[i].song1; 
                aData.push(queryModel);
            }
            if (oArtists.artists[i].song2.toLowerCase().includes(song)) {
                let queryModel = {};
                queryModel.artist = oArtists.artists[i].artistName;
                queryModel.url = oArtists.artists[i].url2;
                queryModel.song = oArtists.artists[i].song2; 
                aData.push(queryModel);
            }
            if (oArtists.artists[i].song3.toLowerCase().includes(song)) {
                let queryModel = {};
                queryModel.artist = oArtists.artists[i].artistName;
                queryModel.url = oArtists.artists[i].url3;
                queryModel.song = oArtists.artists[i].song3; 
                aData.push(queryModel);
            }
        }
        if (aData[0] !== undefined) {
            res.status(200).json(aData);
         } else if (!res.headersSent) {
            res.send('<h1>No artist with this name. Try again!</h1>');
        }
    })
    } else {
        res.send('<h1>Minimum 3 letters in the search query. Try again!</h1>');
    };
})

router.get('/lyrics/:boolean', (req,res,next) => {
    let booleanVal = parseInt(req.params.boolean) === 1 ? 'Yes' : 'No';

    fs.readFile('artists.json', (err, data) => {
        if (err) throw err;
        let oArtists = JSON.parse(data);
        let aData = [];

        for (let i = 0; i < oArtists.artists.length; i++) {
            if(oArtists.artists[i].lyrics1 === booleanVal) {
                let queryModel = {};
                queryModel.artist = oArtists.artists[i].artistName;
                queryModel.url = oArtists.artists[i].url1;
                queryModel.song = oArtists.artists[i].song1;
                aData.push(queryModel);
            }
            if(oArtists.artists[i].lyrics2 === booleanVal) {
                let queryModel = {};
                queryModel.artist = oArtists.artists[i].artistName;
                queryModel.url = oArtists.artists[i].url2;
                queryModel.song = oArtists.artists[i].song2;
                aData.push(queryModel);
            }
            if(oArtists.artists[i].lyrics3 === booleanVal) {
                let queryModel = {};
                queryModel.artist = oArtists.artists[i].artistName;
                queryModel.url = oArtists.artists[i].url3;
                queryModel.song = oArtists.artists[i].song3;
                aData.push(queryModel);
            }
        }
        if (aData[0] !== undefined) {
            res.status(200).json(aData);
         } else if (!res.headersSent) {
            res.send('<h1> If database is not empty - Invalid URL query search parameter. Try again!</h1>');
        }
    })

})

router.get('/vibe/:vibe', (req,res,next) => {
    let sVibeQuery = req.params.vibe.charAt(0).toUpperCase() + req.params.vibe.slice(1).toLowerCase();
    sVibeQuery = sVibeQuery.replace(/\s/g, '');
  
    fs.readFile('artists.json', (err, data) => {
        if (err) throw err;
        let oArtists = JSON.parse(data);
        let aData = [];

        for(let i = 0; i < oArtists.artists.length; i++) {
            if(oArtists.artists[i].vibe1 === sVibeQuery || oArtists.artists[i].vibe1.includes(sVibeQuery)) {
                let queryModel = {};
                queryModel.artist = oArtists.artists[i].artistName;
                queryModel.url = oArtists.artists[i].url1;
                queryModel.song = oArtists.artists[i].song1;
                aData.push(queryModel);
            }
            if(oArtists.artists[i].vibe2 === sVibeQuery || oArtists.artists[i].vibe2.includes(sVibeQuery)) {
                let queryModel = {};
                queryModel.artist = oArtists.artists[i].artistName;
                queryModel.url = oArtists.artists[i].url2;
                queryModel.song = oArtists.artists[i].song2;
                aData.push(queryModel);
            }
            if(oArtists.artists[i].vibe3 === sVibeQuery || oArtists.artists[i].vibe3.includes(sVibeQuery)) {
                let queryModel = {};
                queryModel.artist = oArtists.artists[i].artistName;
                queryModel.url = oArtists.artists[i].url3;
                queryModel.song = oArtists.artists[i].song3;
                aData.push(queryModel);
            }
        }
        if (aData[0] !== undefined) {
            res.status(200).json(aData);
         } else if (!res.headersSent) {
            res.send('<h1> No returned query. Try again!</h1>');
        }
    })
   
})


// ADMIN/DASHBOARD ROUTES

router.get('/admin', adminController.getAdmin);

router.post('/admin', adminController.postAdmin);

router.get('/dashboard', dashboardController.getDashboard);

router.post('/dashboard/edit-artist', dashboardController.editArtist);

router.post('/dashboard', dashboardController.updateArtist);

router.post('/dashboard/delete-artist', dashboardController.deleteArtist);

router.get('/documentation', dashboardController.getDocumentation);

module.exports = router;