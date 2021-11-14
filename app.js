import dotenv from 'dotenv';
import express from 'express';
import entriesRouter from './routes/entries.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());

// routes
app.use('/api/v1/entries', entriesRouter);

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
