import dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet';
import xss from 'xss-clean';
import rateLimiter from 'express-rate-limit';
import connectDB from './db/connect.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import notFoundMiddleware from './middleware/not-found.js';

import express from 'express';
const app = express();

// routers
import entriesRouter from './routes/entries.js';
import authRouter from './routes/auth.js';

import authenticateUser from './middleware/authentication.js';

// middleware
app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// routes
app.use('/api/v1/entries', authenticateUser, entriesRouter);
app.use('/api/v1/auth', authRouter);

// error handler middleware
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 5000;

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
