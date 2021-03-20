import express from 'express';
import { User, handleDB } from './database/models';

// Before anything, handle DB relationships and syncing the DB
handleDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
  res.json({
    message: "Hello"
  })
});

// When using /api route, move to controllers folder
app.use('/api', require('./database/controllers'));

app.listen(port, () => {
  console.log("Listening on port 3030");
})