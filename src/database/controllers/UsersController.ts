import express from 'express';
import { User } from '../models';

const router = express.Router();

router.get('/', (req, res, next) => {
  User.findAll()
  .then(users => {
    res.status(200)
    .json({
      message: "Successfully found all users!",
      users
    });
  })
  .catch(err => {
    next(new Error("Getting all users, error occured: " + err));
  });
});

module.exports = router;