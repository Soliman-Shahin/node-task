const express = require('express');

const noteTypeRouter = require('./noteType.route');
const userRouter = require('./user.route');
const noteRouter = require('./note.route');


const router = express.Router();

router.use('/noteTypes', noteTypeRouter);
router.use('/users', userRouter);
router.use('/notes', noteRouter);


module.exports = router;