 class ErrorHandle extends Error {
    constructor(message, statuscode) {
        super(message);
        this.statuscode = statuscode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statuscode = err.statuscode || 500;

    if (err.name === "CaseError") {
        const message = `Recorse not found. invalid ${err.path}`;
        err = new ErrorHandle(message, 400)
    }
    if (err.code === 1100) {
        const message = `Duplicate ${Object.keys(err.keyvalue)} Entered`;
        err = new ErrorHandle(message, 400)
    }
    if (err.name === "JsonWebTokenError") {
        const message = `Json Web Token is invalide,Try again :) `;
        err = new ErrorHandle(message, 400)
    }
    if (err.name === "TokenExpireError") {
        const message = `Json Web Token Expire, Try again`;
        err = new ErrorHandle(message, 400)
    }

    return res.status(err.statuscode).json({
        success: false,
        messages: err.message,
    })
}

export default ErrorHandle;