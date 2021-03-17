import express from 'express';
const router = express.Router();

router.use('/users', require('./UsersController'));

module.exports = router;