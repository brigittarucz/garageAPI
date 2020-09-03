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

exports.updateArtist = (req, res, next) => {
    // TODO: check if it has been changed

    // TODO: get from file and update

    fs.readFile('artists.json', (err,data) => {
        if (err) throw err;
        let oArtists = JSON.parse(data);

        for(let i = 0; i < oArtists.artists.length; i++) {
            if(oArtists.artists[i].id === req.body.artistId) {
                oArtists.artists[i].artistName = req.body.txtArtistName;
                oArtists.artists[i].subgenre = req.body.txtSubgenre;
                oArtists.artists[i].url1 = req.body.txtUrl1;
                oArtists.artists[i].song1 = req.body.txtSong1;
                oArtists.artists[i].url2 = req.body.txtUrl2;
                oArtists.artists[i].song2 = req.body.txtSong2;
                oArtists.artists[i].url3 = req.body.txtUrl1;
                oArtists.artists[i].song3 = req.body.txtSong3;
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