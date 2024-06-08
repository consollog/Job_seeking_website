import { catchAsyncError } from "../middleware/catchAsyncError.js"
import ErrorHandle from "../middleware/error.js"
import { Job } from "../models/job.schema.js"

export const GetallJob = catchAsyncError(async (req, res, next) => {
    const AllJob = await Job.find({ expire: false });
    res.status(200).json({
        success: true,
        AllJob
    })
})

export const postJob = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role == "Job seeker") {
        return next(new ErrorHandle("Job Seeker is not allowed for this field", 400))
    }

    const { title, description, category, country, city, location, fixedSalary, salaryFrom, salaryTo } = req.body
    if (!title || !description || !category || !country || !city || !location) {
        return next(new ErrorHandle("please provide full job detail", 400))
    }
    // console.log(req.body)
    if ((!salaryFrom || !salaryTo) && !fixedSalary) {
        return next(new ErrorHandle("please provide Fixed salary or Ranged salary", 400))
    }
    if (salaryFrom && salaryTo && fixedSalary) {
        return next(new ErrorHandle("please provide Either Fixed salary or Ranged salary", 400))
    }

    const postedBy = req.user._id;
    const job = await Job.create({
        title,
        description,
        category,
        country,
        city,
        location,
        fixedSalary,
        salaryFrom,
        salaryTo,
        postedBy
    })

    res.status(200).json({
        success: true,
        message: "Job Posted successfully :)",
        job
    })
})

export const getmyjobs = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role == "Job seeker") {
        return next(ErrorHandle("Job seeker is not allowed for this field", 400))
    }

    const Myjobs = await Job.find({ postedBy: req.user._id })
    res.status(200)
        .json({
            success: true,
            Myjobs
        })

})

export const updatejob = catchAsyncError(async (req, res, next) => {
    const { role } = req.cookies;
    if (role == "Job seeker") {
        return next(new ErrorHandle("Job seeker is not allowed for this field", 400))
    }

    const { id } = req.params;
    console.log(req.params);
    let job = Job.findById(id);
    if (!job) {
        return next(new ErrorHandle("job not found", 400))
    }

    job = await Job.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        job,
        message: "Job updated successfully"
    })

})

export const deletejob = catchAsyncError(async (req, res, next) => {
    const { role } = req.cookies;
    if (role == "Job seeker") {
        return next(new ErrorHandle("Job seeker is not allowed for this field", 400))
    }

    const { id } = req.params;
    console.log(req.params)
    let job = await Job.findById(id);
    if (!job) {
        return next(new ErrorHandle("Job not found", 400))
    }

    await Job.deleteOne();
    res.status(200).json({
        success: true,
        message: "job deleted successfully"
    })


})

export const getsingleJob = catchAsyncError(async (req, res, next) => {
    try {
        const { id } = req.params;
        // console.log(req.params)
        let job = await Job.findById(id);
        console.log(job)
        if (!job) {
            return next(new ErrorHandle("Job Not Found", 404))
        }

        res.status(200).json({
            success: true,
            job
        })
    } catch (error) {
        return next(new ErrorHandle("Invalide id", 400))
    }
})