const express = require('express');
const router = express.Router();
const noteController = require('../controllers/note.controller');
const multer = require("multer")

// configure multer
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/notes')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
})
var upload = multer({ storage: storage })

// note routers
router.route('/')
    // get all notes
    .get(noteController.findAll)
    // create note
    .post(upload.single('files'), noteController.create)

router.route('/:id')
    // get note by id
    .get(noteController.findById)
    // update note
    .put(upload.single('files'), noteController.update)
    // delete note
    .delete(noteController.delete)

// get notifs
router.route('/notif/:userId')
    .get(noteController.getNotif)
    // delete all user notifs
    .delete(noteController.deleteNotif)

// delete one notif
router.route('/notif/:userId/:id')
    .delete(noteController.deleteNotif)


module.exports = router;