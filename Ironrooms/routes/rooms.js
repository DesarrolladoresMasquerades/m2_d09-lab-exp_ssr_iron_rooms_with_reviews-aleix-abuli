const router = require("express").Router();

// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// How many rounds should bcrypt run the salt (default [10 - 12 rounds])
const saltRounds = 5;

// Require the User model in order to interact with the database
const User = require("../models/User.model");
const Room = require('../models/Room.model');

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const { findById } = require("../models/User.model");


router.route('/create')
.get(isLoggedIn, (req,res)=>{
    res.render('rooms/create');
})
.post(isLoggedIn, (req,res)=>{
    const {name, description, imgUrl} = req.body;
    const owner = req.session.userId;

    Room.create({name, description, imgUrl, owner})
    .then(()=>res.redirect('/rooms'))
    .catch(error => console.log(error));
});


router.route('/:id/edit')
.get(isLoggedIn, (req, res) => {
    const id = req.params.id;

    Room.findById(id)
    .populate('owner')
    .then((room) => {
        if(req.session.userId === room.owner.id){
            res.render('rooms/edit', room);
        } else {
            res.render('rooms/room-details', {room: room, errorMessage: 'You need to be the owner of the room to edit it'})
        }
        })
    .catch(error => console.log(error))
})
.post(isLoggedIn, (res, req) => {
    const id = req.params.id;

    const {}

    Room.findByIdAndUpdate(id)
    .populate('owner')
    then((room) => {

    })
});


router.get('/:id', (req, res) => {
    const id = req.params.id;
    
    Room.findById(id)
    .populate('owner')
    .then((room)=>{res.render('rooms/room-details', room)})
});


router.get('/', (req,res) => {
    Room.find()
    .populate('owner')
    .then((rooms) => res.render('rooms/roomList', {rooms}))
})

module.exports = router;