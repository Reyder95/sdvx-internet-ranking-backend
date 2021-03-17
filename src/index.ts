import express from 'express';
import { User, handleDB } from './database/models';

handleDB();

const app = express();

app.get('/', (req, res) => {
  res.json({
    message: "Hello"
  })
});

app.listen(3030, () => {
  console.log("Listening on port 3030");
})