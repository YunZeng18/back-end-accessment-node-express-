const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController.js');


router.get('/ping', apiController.ping);

router.get('/posts', apiController.getPosts);



module.exports = router;