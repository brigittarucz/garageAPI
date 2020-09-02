const express = require('express');
const router = express.Router();
const fs = require('fs');

exports.getDashboard = (req,res,next) => {
    fs.readFile('artists.json', (err, data) => {
        if (err) throw err;
        let oArtists = JSON.parse(data);
        res.render('dashboard', {
            pageTitle: 'Dashboard',
            artists: oArtists.artists
        });
    });
}

exports.editArtist = (req,res,next) => {
    let artist;

    fs.readFile('artists.json', (err, data) => {
        if (err) throw err;
        let oArtists = JSON.parse(data);

        for(let i = 0; i < oArtists.artists.length; i++) {
            if(oArtists.artists[i].id === req.body.artistId) {
                artist = oArtists.artists[i];
            }
        }

        res.render('edit-artist', {
            pageTitle: 'Edit Issue',
            artist: artist
        })
    
    })

}

exports.getDocumentation = (req,res,next) => {
    res.render('documentation', {
        pageTitle: 'Documentation API'
    })
}