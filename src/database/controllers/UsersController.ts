import express from 'express';
import { User } from '../models';

const router = express.Router();

// Get all userss
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

// TODO: Requires actual authentication via passport
// Create a user
// Requires: { username, password, and email }
router.post('/', (req, res, next) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    display_name: null
  })
  .then(user => {
    res.status(200)
    .json({
      message: "Successfully created user",
      user
    });
  })
  .catch(err => {
    next(new Error("Creating a user, error occurred: " + err));
  });
});

module.exports = router;