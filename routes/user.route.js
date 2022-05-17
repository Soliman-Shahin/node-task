const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const multer = require("multer")

// configure multer
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/users')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
})
var upload = multer({ storage: storage })

// user routers
router.route('/')
    // find all users
    .get(userController.findAll)

router.route('/signup')
    // signup
    .post(upload.single('profile'), userController.signup)

router.route('/login')
    // login
    .post(userController.login)

module.exports = router;