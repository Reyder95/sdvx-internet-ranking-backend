import express from 'express';
import { User } from '../models';

const router = express.Router();

// TODO: Get routes should not show password.

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
    next(new Error("Getting all users, error occurred: " + err));
  });
});

// Get one user by ID
// Must specify a user ID in endpoint
router.get('/:id', (req, res, next) => {
  User.findByPk(req.params.id)
  .then(user => {
    if (!user) {
      res.status(404)
      .json({
        message: `User with ID ${req.params.id} wasn't found!`
      })
    }
      
    res.status(200)
    .json({
      message: "Successfully found user!",
      user
    });
  })
  .catch(err => {
    next(new Error("Getting one user, error occurred: " + err));
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
      message: "Successfully created user!",
      user
    });
  })
  .catch(err => {
    next(new Error("Creating a user, error occurred: " + err));
  });
});

// TODO: Create login route once passport is set up

// TODO: Only allow a user to update their own information. Will be handled with passport auth.
// Update a user.
// Takes in: { username, password, email, display_name } none are required though
// Also takes in a user ID in endpoint
router.put('/:id', (req, res, next) => {
  User.findByPk(req.params.id)
  .then(user => {
    
    if (!user) {
      res.status(404)
      .json({
        message: `User with ID ${req.params.id} wasn't found!`
      });
    }

    // Check whether or not any property doesn't exist. If it doesn't exist, make its "new" version the same as it is in the database.
    // This prevents any property from being required.
    const newUsername : string =  req.body.username ? req.body.username : user?.username;
    const newPassword : string =  req.body.password ? req.body.password : user?.password;
    const newEmail : string    =  req.body.email ? req.body.email : user?.email;
    const newDisplay : string  =  req.body.display_name ? req.body.display_name : user?.display_name;

    user?.update({
      username: newUsername,
      password: newPassword,
      email: newEmail,
      display_name: newDisplay
    });

    user?.save();

    res.status(200)
    .json({
      message: "Successfully updated user!",
      user
    })
  })
  .catch(err => {
    next(new Error("Updating a user, error occurred: " + err));
  });
});

// Deleting a user
// Requires an ID in the endpoint
router.delete('/:id', (req, res, next) => {
  User.findByPk(req.params.id)
  .then(user => {
    if (!user) {
      res.status(404)
      .json({
        message: `User with ID ${req.params.id} wasn't found!`
      });
    }

    user?.destroy();
  
    res.status(200)
    .json({
      message: "Successfully deleted user!",
      user
    });
  })
  .catch(err => {
    next(new Error("Deleting a user, error occurred: " + err));
  });
});

module.exports = router;