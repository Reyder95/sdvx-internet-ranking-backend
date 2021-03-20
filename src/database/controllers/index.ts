import express from 'express';
const router = express.Router();

router.use('/users', require('./Users'));
router.use('/songs', require('./Songs'));

module.exports = router;