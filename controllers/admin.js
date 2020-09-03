const express = require('express');
const fs = require('fs');
const uuid = require('uuid');
const Artist = require('../models/artists');

exports.getAdmin = (req, res, next) => {
    res.render('admin-panel', {
        pageTitle: 'Admin Panel'
    });

}

exports.postAdmin = (req, res, next) => {

    fs.readFile('artists.json', (err, data) => {
        if (err) throw err;
        let oArtists = JSON.parse(data);
        let checkDuplicate = 0;

        for(let i = 0; i < oArtists.artists.length; i++ ) {
            if(oArtists.artists[i].artistName === req.body.txtArtistName) {
                checkDuplicate = 1;
                break;
            }
        }

        if(checkDuplicate === 0) {

            let sUrlFormat = null;

            if(req.body.txtUrl1.includes("watch")) {
                let sUrl = req.body.txtUrl1;
                sUrlEnd = sUrl.slice(sUrl.indexOf("?v=") + 3, sUrl.length);
                sUrlFormat = "https://www.youtube.com/embed/" + sUrlEnd;
            }

            const newArtist = new Artist(uuid.v4(), req.body.txtArtistName, req.body.txtSubgenre,
            sUrlFormat !== null ? sUrlFormat : req.body.txtUrl1, req.body.txtSong1, req.body.txtLyrics1, req.body.txtVibe1,
            req.body.txtUrl2, req.body.txtSong2, req.body.txtLyrics2, req.body.txtVibe2,
            req.body.txtUrl3, req.body.txtSong3, req.body.txtLyrics3, req.body.txtVibe3,
            Date.now());
            
            oArtists.artists.push(newArtist);
    
            fs.writeFileSync('artists.json', JSON.stringify(oArtists));
        }
    })

    res.redirect('/api/admin');
}
