import express from 'express';
import { DifficultyName } from '../models';

const router = express.Router();

// Get all difficulty names
router.get('/', (req, res, next) => {
  DifficultyName.findAll()
  .then(difficultynames => {
    res.status(200)
    .json({
      message: "Successfully found all difficulty names!",
      difficultynames
    });
  })
  .catch(err => {
    next(new Error("Getting all difficulty names, error occurred: " + err));
  });
});

// Get one difficulty name by ID
// Must specify a difficulty name ID in endpoint
router.get('/:id', (req, res, next) => {
  DifficultyName.findByPk(req.params.id)
  .then(difficultyname => {
    if (!difficultyname)
      res.status(404)
      .json({
        message: `Difficulty name with ID ${req.params.id} wasn't found!`
      });
    
    res.status(200)
    .json({
      message: "Successfully found difficulty name!",
      difficultyname
    });
  })
  .catch(err => {
    next(new Error("Getting one difficulty name, error occurred: " + err));
  });
});

// Create a difficulty name
// Requires: { name, abbreviation }
router.post('/', (req, res, next) => {
  DifficultyName.create({
    name: req.body.name,
    abbreviation: req.body.abbreviation
  })
  .then(difficultyname => {
    res.status(200)
    .json({
      message: "Successfully created difficulty name!",
      difficultyname
    });
  })
  .catch(err => {
    next(new Error("Creating a difficulty name, error occurred: " + err));
  });
});

// Update a difficulty name
// Takes in: { name, abbreviation } none are required though
// Also takes in a difficulty name ID in endpoint
router.put('/:id', (req, res, next) => {
  DifficultyName.findByPk(req.params.id)
  .then(difficultyname => {
    if (!difficultyname)
      res.status(404)
      .json({
        message: `Difficulty name with ID ${req.params.id} wasn't found!`
      });

    const newName : string = req.body.type ? req.body.type : difficultyname?.name;
    const newAbbreviation : string = req.body.abbreviation !== undefined ? req.body.abbreviation : difficultyname?.abbreviation;

    difficultyname?.update({
      name: newName,
      abbreviation: newAbbreviation
    });

    difficultyname?.save();

    res.status(200)
    .json({
      message: "Successfully updated difficulty name!",
      difficultyname
    });
  })
  .catch(err => {
    next(new Error("Updating a difficulty name, error occurred: " + err));
  });
});

// Deleting a difficulty name
// Requires an ID in the endpoint
router.delete('/:id', (req, res, next) => {
  DifficultyName.findByPk(req.params.id)
  .then(difficultyname => {
    if (!difficultyname)
      res.status(404)
      .json({
        message: `Difficulty name with ID ${req.params.id} wasn't found!`
      });

    difficultyname?.destroy();

    res.status(200)
    .json({
      message: "Successfully deleted difficulty name!",
      difficultyname
    });
  })
  .catch(err => {
    next(new Error("Deleting a difficulty name, error occurred: " + err));
  });
});

module.exports = router;