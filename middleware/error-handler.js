import CustomAPIError from '../errors/custom-api.js';
import { StatusCodes } from 'http-status-codes';
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    console.log(err);
    return res.status(err.statusCode).json({ msg: err.message });
  }
  console.log(err);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
};

export default errorHandlerMiddleware;
