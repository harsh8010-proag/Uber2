const express = require('express');
const router = express.Router();
const contactcontroller = require('../controllers/contact.controller');


router.post('/contact',contactcontroller.contact);

module.exports= router;