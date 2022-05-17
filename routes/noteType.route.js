const express = require('express');
const router = express.Router();
const noteTypeController = require('../controllers/noteType.controller');

// noteType routers
router.route('/')
    // get all noteTypes
    .get(noteTypeController.findAll)
    // create noteType
    .post(noteTypeController.create)

router.route('/:id')
    // get noteType by id
    .get(noteTypeController.findById)
    // update noteType
    .put(noteTypeController.update)
    // delete noteType
    .delete(noteTypeController.delete)

module.exports = router;