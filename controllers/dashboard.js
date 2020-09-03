const express = require('express');
const router = express.Router();
const fs = require('fs');
const Artist = require('../models/artists');

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

// TODO: automatically update JSON 

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

exports.updateArtist = (req, res, next) => {
    fs.readFile('artists.json', (err,data) => {
        if (err) throw err;
        let oArtists = JSON.parse(data);

        for(let i = 0; i < oArtists.artists.length; i++) {
            if(oArtists.artists[i].id === req.body.artistId) {

                let sUrlFormat = null;

                if(req.body.txtUrl1.includes("watch")) {
                    let sUrl = req.body.txtUrl1;
                    sUrlEnd = sUrl.slice(sUrl.indexOf("?v=") + 3, sUrl.length);
                    sUrlFormat = "https://www.youtube.com/embed/" + sUrlEnd;
                }

                oArtists.artists[i] = new Artist(oArtists.artists[i].id, req.body.txtArtistName, req.body.txtSubgenre,
                sUrlFormat !== null ? sUrlFormat : req.body.txtUrl1, req.body.txtSong1, req.body.txtLyrics1, req.body.txtVibe1,
                req.body.txtUrl2, req.body.txtSong2, req.body.txtLyrics2, req.body.txtVibe2,
                req.body.txtUrl3, req.body.txtSong3, req.body.txtLyrics3, req.body.txtVibe3,
                oArtists.artists[i].dateAdded);

                break;
            }
        }

        fs.writeFileSync('artists.json', JSON.stringify(oArtists));
    })

    res.redirect('/api/dashboard');
}

exports.deleteArtist = (req, res, next) => {
    fs.readFile('artists.json', (err,data) => {
        if (err) throw err;
        let oArtists = JSON.parse(data);
    
        for(let i = 0; i < oArtists.artists.length; i++) {
            if(oArtists.artists[i].id === req.body.artistId) {
                oArtists.artists.splice(i, 1);
            }
        }

        fs.writeFileSync('artists.json', JSON.stringify(oArtists));
    })
    
    res.redirect('/api/dashboard');
}

exports.getDocumentation = (req,res,next) => {
    res.render('documentation', {
        pageTitle: 'Documentation API'
    })
}