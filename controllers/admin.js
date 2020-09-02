const express = require('express');
const fs = require('fs');
const uuid = require('uuid');

exports.getAdmin = (req, res, next) => {
    res.render('admin-panel', {
        pageTitle: 'Admin Panel'
    });

}

// Return a response / http response code / end - otherwise it will timeout

exports.postAdmin = (req, res, next) => {

    // TODO: define a model

    console.log(req.body.txtArtistName);

    // TODO: store in file

    fs.readFile('artists.json', (err, data) => {
        if (err) throw err;
        let oArtists = JSON.parse(data);

        // TODO: check if the same artist exists already 

        let checkDuplicate = 0;

        for(let i = 0; i < oArtists.artists.length; i++ ) {
            if(oArtists.artists[i].artistName === req.body.txtArtistName) {
                checkDuplicate = 1;
                break;
            }
        }

        if(checkDuplicate === 0) {

            let sUrlFormat = null;

            // TODO: sanitize string URL1 format
            if(req.body.txtUrl1.includes("watch")) {
                let sUrl = req.body.txtUrl1;
                sUrlEnd = sUrl.slice(sUrl.indexOf("?v=") + 3, sUrl.length);
                sUrlFormat = "https://www.youtube.com/embed/" + sUrlEnd;
            }

            let oNewEntry = {
                id: uuid.v4(),
                artistName: req.body.txtArtistName,
                subgenre: req.body.txtSubgenre,
                url1: sUrlFormat !== null ? sUrlFormat : req.body.txtUrl1,
                song1: req.body.txtSong1,
                url2: req.body.txtUrl2,
                song2: req.body.txtSong2,
                url3: req.body.txtUrl3,
                song3: req.body.txtSong3
            }    
            
            oArtists.artists.push(oNewEntry);
    
            fs.writeFileSync('artists.json', JSON.stringify(oArtists));
        }
    })

    // fs.writeFileSync('artists.json', req.body.txtArtistName);

    res.redirect('/api/admin');
}
