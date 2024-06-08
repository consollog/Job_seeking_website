import { catchAsyncError } from "../middleware/catchAsyncError.js"
import ErrorHandle from '../middleware/error.js'
import { User } from "../models/user.js"
import { sendToken } from "../utils/jwtToken.js"

export const Register = catchAsyncError(async (req, res, next) => {
    const { name, email, phone, password, role } = req.body;
    if (!name || !email || !phone || !password || !role) {
        return next(new ErrorHandle("please fill the details ;)"))
    }


    const isEmail = await User.findOne({ email })
    if (isEmail) {
        return next(new ErrorHandle("User is alredy exites..!"))
    }
    const user = await User.create({
        name,
        email,
        phone,
        password,
        role,
    });
    sendToken(user, 200, res, "User register successfully")
})

export const Login = catchAsyncError(async (req, res, next) => {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
        return next(new ErrorHandle("Please provide details..!"))
    }

    const user = await User.findOne({ email }).select("password role")

    if (!user) {
        return next(new ErrorHandle("user not found, check your email ans password", 400))
    }

    const isPasswordmatch = await user.comparePassword(password);
    if (!isPasswordmatch) {
        return next(new ErrorHandle("user not found, check your email ans password", 400))
    }


    if (user.role !== role) {
        console.log(role)
        console.log(user.role)
        return next(new ErrorHandle("User with this role not found", 400))

    }
    sendToken(user, 200, res, { message: "Login successful" })

});

export const Logout = catchAsyncError(async (req, res, next) => {
    res.status(201).cookie("token", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
        secure: true,
        sameSite: "None"
    }).json({
        success: true,
        message: "Logged out successfully..!"
    })
});

export const getuser = catchAsyncError((req, res, next) => {
    const user = req.user;
    res.status(200)
        .json({
            success: true,
            user,
            message: "User get"
        })
})

export const getJobseeker = catchAsyncError(async (req, res, next) => {
    // const user = req.user;
    const jobseeker = await User.find({ role: "Job seeker" })
    res.status(200)
        .json({
            success: true,
            jobseeker,
        })
})

export const getEmployer = catchAsyncError(async (req, res, next) => {
    // const user = req.user;
    const employer = await User.find({ role: "Employer" })
    res.status(200)
        .json({
            success: true,
            employer,
        })
})