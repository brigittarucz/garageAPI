const express = require('express');
const router = express.Router();
const fs = require('fs');

exports.getDashboard = (req,res,next) => {

    fs.readFile('artists.json', (err, data) => {
        if (err) throw err;
        let oArtists = JSON.parse(data);
        res.render('main-view', {
            pageTitle: 'Dashboard',
            artists: oArtists.artists
        });
    });

   
}