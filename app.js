require('dotenv').config();
require('express-async-errors');
const cors = require('cors');
const connectDB = require('./db/connect');
const errorHandlerMiddleware = require('./middleware/error-handler.js');
const notFoundMiddleware = require('./middleware/not-found.js');

const express = require('express');
const app = express();

// routers
const entriesRouter = require('./routes/entries');
const authRouter = require('./routes/auth');

// middleware
app.use(cors());
app.use(express.json());
app.use(express.static('./public'));

// routes
app.use('/api/v1/entries', entriesRouter);
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
