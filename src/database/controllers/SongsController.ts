import express from 'express';
import { Song, User } from '../models';

const router = express.Router();

// Get all songs
router.get('/', (req, res, next) => {
  Song.findAll()
  .then(songs => {
    res.status(200)
    .json({
      message: "Successfully found all songs!",
      songs
    });
  })
  .catch(err => {
    next(new Error("Getting all songs, error occurred: " + err));
  });
});

// Get one song by ID
// Must specify a song ID in endpoint
router.get('/:id', (req, res, next) => {
  Song.findByPk(req.params.id)
  .then(song => {
    if (!song)
      res.status(404)
      .json({
        message: `User with ID ${req.params.id} wasn't found!`
      });

    res.status(200)
    .json({
      message: "Successfully found song!",
      song
    });
  })
  .catch(err => {
    next(new Error("Getting one song, error occurred: " + err));
  });
});

// Create a user
// Requires: { title, artist, length, bpm_low}, bpm_high is optional
router.post('/', (req, res, next) => {
  Song.create({
    title: req.body.title,
    artist: req.body.artist,
    length: req.body.length,
    bpm_low: req.body.bpm_low,
    bpm_high: req.body.bpm_high ? req.body.bpm_high : null
  })
  .then(song => {
    res.status(201)
    .json({
      message: "Successfully created song!",
      song
    });
  })
  .catch(err => {
    next(new Error("Creating a song, error occurred: " + err));
  });
});

// Update a song
// Takes in: { title, artist, length, bpm_low, bpm_high } none are required though
// Also takes in a song ID in endpoint
router.put('/:id', (req, res, next) => {
  Song.findByPk(req.params.id)
  .then(song => {
    if (!song)
      res.status(404)
      .json({
        message: `Song with ID ${req.params.id} wasn't found!`
      });
    
    // Check whether or not any property doesn't exist. If it doesn't exist, make its "new" version the same as it is in the database.
    // This prevents any property from being required
    const newTitle : string = req.body.title ? req.body.title : song?.title;
    const newArtist : string = req.body.artist ? req.body.artist : song?.artist;
    const newLength : string = req.body.length ? req.body.length : song?.length;
    const newBpmLow : string = req.body.bpm_low ? req.body.bpm_low : song?.bpm_low;
    const newBpmHigh : string = req.body.bpm_high ? req.body.bpm_high : song?.bpm_high;

    song?.update({
      title: newTitle,
      artist: newArtist,
      length: newLength,
      bpm_low: newBpmLow,
      bpm_high: newBpmHigh
    });

    song?.save();

    res.status(200)
    .json({
      message: "Successfully updated song!",
      song
    });
  })
  .catch(err => {
    next(new Error("Updating a song, error occurred: " + err));
  });
});

// Deleting a user
// Requires an ID in the endpoint
router.delete('/:id', (req, res, next) => {
  Song.findByPk(req.params.id)
  .then(song => {
    if (!song)
      res.status(404)
      .json({
        message: `Song with ID ${req.params.id} wasn't found!`
      });

    song?.destroy();

    res.status(200)
    .json({
      message: "Successfully deleted song!",
      song
    });
  })
  .catch(err => {
    next(new Error("Deleting a song, error occurred: " + err));
  });
});

module.exports = router;