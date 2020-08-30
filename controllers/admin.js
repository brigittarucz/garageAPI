const express = require('express');

exports.getAdmin = (req, res, next) => {
    res.render('admin-panel', {
        pageTitle: 'Admin Panel'
    });
}

// Return a response / http response code / end - otherwise it will timeout

exports.postAdmin = (req, res, next) => {

    // TODO: define a model

    console.log(req.body.txtArtistName);
    res.redirect('/admin');
}

