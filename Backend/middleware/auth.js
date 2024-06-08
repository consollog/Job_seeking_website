import jwt from 'jsonwebtoken';
import { catchAsyncError } from './catchAsyncError.js';
import ErrorHandle from './error.js';
import {User} from '../models/user.js'

export const isAuthrized = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandle("User is not authrized", 400))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
   
    req.user= await User.findById(decoded.id)
    next()

});