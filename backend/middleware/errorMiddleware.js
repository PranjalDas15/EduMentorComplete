export class ErrorHandler extends Error{
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    // Handling duplicate key error from MongoDB
    if(err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
    }

    // Handling invalid JWT
    if(err.name === "JsonWebTokenError") {
        const message = "Json web token is invalid, Try Again";
        err = new ErrorHandler(message, 400);
    }

    // Handling expired JWT
    if(err.name === "TokenExpiredError") {
        const message = "Json web token is expired, Try Again";
        err = new ErrorHandler(message, 400);
    }

    // Handling CastError (MongoDB invalid ObjectId)
    if(err.name === "CasrError") {
        const message = `Invalid ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    const errorMessage = err.errors ? Object.values(err.errors).map(error=>error.message).join(" & "): err.message

    return res.status(err.statusCode).json ({
        success: false,
        message: errorMessage,
    })
}

export default ErrorHandler
