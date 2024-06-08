import { catchAsyncError } from "../middleware/catchAsyncError.js"
import ErrorHandle from "../middleware/error.js"
import { Application } from "../models/appSchema.js"
import { v2 as cloudinary } from "cloudinary";
import { Job } from "../models/job.schema.js";

export const employerGetApplication = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job seeker") {
        return next(new ErrorHandle("Job seeker cannot use this field"))
    }

    const { _id } = req.user;
    const application = await Application.find({ 'employerId.user': _id })

    // console.log("applications:",application)
    res.status(200).json({
        success: true,
        application
    })

})

export const JobseekerGetApplication = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
        return next(new ErrorHandle("Employer cannot use this field"))
    }

    const { _id } = req.user;
    const application = await Application.find({ 'applicationId.user': _id })

    res.status(200).json({
        success: true,
        application
    })

})

export const JobseekerDeleteApplications = catchAsyncError(async (req, res, next) => {
    const { role } = req.user
    if (role === "Employer") {
        return next(new ErrorHandle("Job seeker cannot access this field", 400))
    }

    const { id } = req.params;
    const applications = await Application.findById(id)
    if (!applications) {
        return next(new ErrorHandle("Your applications not found", 400))
    }

    await Application.deleteOne();
    res.status(200).json({
        success: true,
        message: "Applications delete successfully..!"
    })
})

export const postApplications = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
        return next(new ErrorHandle("Employer cannot use this field", 400))
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandle("Resume file Required", 400))
    }

    const resume = req.files.resume;
    if (!resume) {
        return next(new ErrorHandle("You need to upload Resume ok", 400))
    }
    const resumepath = req.files?.resume?.tempFilePath;
    if (!resumepath) {
        return next(new ErrorHandle("You need to upload Resume", 400))

    }
    const allowedForment = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedForment.includes(resume.mimetype)) {
        return next(new ErrorHandle("Your Resume formate must be in png,jpg and webp", 400))
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(resumepath);
    // console.log(cloudinaryResponse, "ok")
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
            "Cloudinary Error:",
            cloudinaryResponse.error || "Cloudinary error"
        )
        return next(new ErrorHandle("Failed to upload Resume", 500))
    }

    const { name, email, coverletter, phone, adderess, jobId } = req.body;
    const applicationId = {
        user: req.user._id,
        role: "Job seeker"
    };
    // console.log(req.user)
    if (!jobId) {
        return next(new ErrorHandle("Job not found", 404))
    }
    const jobdDetail = await Job.findById(jobId)
    if (!jobdDetail) {
        return next(new ErrorHandle("Job not found", 404))
    }

    const employerId = {
        user: jobdDetail.postedBy,
        role: "Employer"
    }

    if (!name || !email || !phone || !coverletter || !adderess || !resume) {
        return next(new ErrorHandle("Fill all Details", 400))
    }

    const applications = await Application.create({
        name,
        email,
        phone,
        coverletter,
        adderess,
        applicationId,
        employerId,
        resume: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        }
    })
    res.status(200).json({
        success: true,
        message: "Applications submitted successfully",
        applications
    })
})