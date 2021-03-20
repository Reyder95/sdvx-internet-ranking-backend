import express from 'express';
import { GaugeType } from '../models';

const router = express.Router();

// Get all gauge types
router.get('/', (req, res, next) => {
  GaugeType.findAll()
  .then(gaugetypes => {
    res.status(200)
    .json({
      message: "Successfully found all gauge types!",
      gaugetypes
    });
  })
  .catch(err => {
    next(new Error("Getting all gauge types, error occurred: " + err));
  });
});

// Get one gauge type by ID
// Must specify a gauge type ID in endpoint
router.get('/:id', (req, res, next) => {
  GaugeType.findByPk(req.params.id)
  .then(gaugetype => {
    if (!gaugetype)
      res.status(404)
      .json({
        message: `Gauge type with ID ${req.params.id} wasn't found!`
      });

    res.status(200)
    .json({
      message: "Successfully found gauge type!",
      gaugetype
    });
  })
  .catch(err => {
    next(new Error("Getting one gauge type, error occurred: " + err));
  });
});

// Create a gauge type
// Requires: { type }, abbreviation is optional due to it being nullable
router.post('/', (req, res, next) => {
  GaugeType.create({
    type: req.body.type,
    abbreviation: req.body.abbreviation
  })
  .then(gaugetype => {
    res.status(200)
    .json({
      message: "Successfully created gauge type!",
      gaugetype
    });
  })
  .catch(err => {
    next(new Error("Creating a gauge type, error occurred: " + err));
  });
});

// Update a gauge type.
// Takes in: { type, abbreviation }, none are required though
// Also takes in a gauge ID in endpoint
router.put('/:id', (req, res, next) => {
  GaugeType.findByPk(req.params.id)
  .then(gaugetype => {
    if (!gaugetype)
      res.status(404)
      .json({
        message: `Gauge type with ID ${req.params.id} wasn't found!`
      });

    // Check whether or not any property doesn't exist. If it doesn't exist, make its "new" version the same as it is in the database.
    // This prevents any property from being required.
    const newType : string = req.body.type ? req.body.type : gaugetype?.type;
    const newAbbreviation : string = req.body.abbreviation !== undefined ? req.body.abbreviation : gaugetype?.abbreviation;

    // We use !== undefined in cases where values can be null, because we want the action of
    // setting a value null to be different from not having a value in the body at all
    // When a value is set null we are actively setting that value null, whereas when a value is not
    // in the body, we do not want to update that value at all

    gaugetype?.update({
      type: newType,
      abbreviation: newAbbreviation
    });

    gaugetype?.save();

    res.status(200)
    .json({
      message: "Successfully updated gauge type!",
      gaugetype
    });
  })
  .catch(err => {
    next(new Error("Updating a gauge type, error occurred: " + err));
  });
});

// Deleting a gauge type
// Requires an ID in the endpoint
router.delete('/:id', (req, res, next) => {
  GaugeType.findByPk(req.params.id)
  .then(gaugetype => {
    if (!gaugetype)
      res.status(404)
      .json({
        message: `Gauge type with ID ${req.params.id} wasn't found!`
      });

    gaugetype?.destroy();

    res.status(200)
    .json({
      message: "Successfully deleted gauge type!",
      gaugetype
    });
  })
  .catch(err => {
    next(new Error("Deleting a gauge type, error occurred: " + err));
  });
});

module.exports = router;