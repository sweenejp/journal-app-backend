import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import entriesRouter from './routes/entries.js';
import { connectDB } from './db/connect.js';
import { errorHandlerMiddleware } from './middleware/error-handler.js';
import { notFound } from './middleware/not-found.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.static('./public'));

// routes
app.use('/api/v1/entries', entriesRouter);
app.use(errorHandlerMiddleware);
app.use(notFound);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
