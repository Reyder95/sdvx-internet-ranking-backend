import express from 'express';
const router = express.Router();

router.use('/users', require('./Users'));
router.use('/songs', require('./Songs'));
router.use('/scores', require('./Scores'));
router.use('/cleartypes', require('./ClearType'));
router.use('/gaugetypes', require('./GaugeType'));

module.exports = router;