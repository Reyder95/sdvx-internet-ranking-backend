import express from 'express';
import { Score } from '../models';

const router = express.Router();

// Get all scores
router.get('/', (req, res, next) => {
  Score.findAll()
  .then(scores => {
    res.status(200)
    .json({
      message: "Successfully found all scores!",
      scores
    });
  })
  .catch(err => {
    next(new Error("Getting all scores, error occurred: " + err));
  });
});

module.exports = router;