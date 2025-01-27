// const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, try again later.",
  }
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }

  if (err.name  === 'ValidationError'){
     customError.msg = Object.values(err.errors).map((item)=>{
      return item.message
     }).join(', ')
     console.log(customError.msg);
     customError.statusCode = StatusCodes.BAD_REQUEST
  }
  if (err.code && err.code === 11000){
    customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`
    customError.statusCode = StatusCodes.BAD_REQUEST
  }
  if (err.name = "CastError"){
    customError.msg = `Invalid item id, ${err.value} doesn't exist`
    customError.statusCode = StatusCodes.NOT_FOUND
  }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  return res.status(customError.statusCode).json({msg: customError.msg})
}

module.exports = errorHandlerMiddleware
