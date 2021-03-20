import express from 'express';
import { ClearType} from '../models';

const router = express.Router();

// Get all clear types
router.get('/', (req, res, next) => {
  ClearType.findAll()
  .then(cleartypes => {
    res.status(200)
    .json({
      message: "Successfully found all clear types!",
      cleartypes
    });
  })
  .catch(err => {
    next(new Error("Getting all clear types, error occurred: " + err));
  });
});

// Get one clear type by ID
// Must specify a clear type ID in endpoint
router.get('/:id', (req, res, next) => {
  ClearType.findByPk(req.params.id)
  .then(cleartype => {
    if (!cleartype)
      res.status(404)
      .json({
        message: `Clear type with ID ${req.params.id} wasn't found!`
      });
    
    res.status(200)
    .json({
      message: "Successfully found clear type!",
      cleartype
    });
  })
  .catch(err => {
    next(new Error("Getting one clear type, error occurred: " + err));
  });
});

// Create a clear type
// Requires: { type }. abbreviation is optional due to it being nullable
router.post('/', (req, res, next) => {
  ClearType.create({
    type: req.body.type,
    abbreviation: req.body.abbreviation
  })
  .then(cleartype => {
    res.status(200)
    .json({
      message: "Successfully created clear type!",
      cleartype
    });
  })
  .catch(err => {
    next(new Error("Creating a clear type, error occurred: " + err));
  });
});

// Update a clear type
// Takes in: { type, abbreviation } none are required though
// Also takes in a clear type ID in endpoint
router.put('/:id', (req, res, next) => {
  ClearType.findByPk(req.params.id)
  .then(cleartype => {
    if (!cleartype)
      res.status(404)
      .json({
        message: `Clear type with ID ${req.params.id} wasn't found!`
      });

    const newType : string = req.body.type ? req.body.type : cleartype?.type;
    const newAbbreviation : string = req.body.abbreviation !== undefined ? req.body.abbreviation : cleartype?.abbreviation;

    cleartype?.update({
      type: newType,
      abbreviation: newAbbreviation
    });

    cleartype?.save();

    res.status(200)
    .json({
      message: "Successfully updated clear type!",
      cleartype
    });
  })
  .catch(err => {
    next(new Error("Updating a clear type, error occurred: " + err));
  });
});

// Deleting a clear type
// Requires an ID in the endpoint
router.delete('/:id', (req, res, next) => {
  ClearType.findByPk(req.params.id)
  .then(cleartype => {
    if (!cleartype)
      res.status(404)
      .json({
        message: `Clear type with ID ${req.params.id} wasn't found!`
      });

    cleartype?.destroy();

    res.status(200)
    .json({
      message: "Successfully deleted clear type!",
      cleartype
    });
  })
  .catch(err => {
    next(new Error("Deleting a clear type, error occurred: " + err));
  });
});

module.exports = router;