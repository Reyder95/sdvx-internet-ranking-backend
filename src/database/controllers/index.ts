import express from 'express';
const router = express.Router();

router.use('/users', require('./UsersController'));
router.use('/songs', require('./SongsController'));

module.exports = router;