import mongoose, { Schema } from "mongoose"

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "please provide job title"],
        minLength: [3, "title must contain 3 character"],
        maxLength: [20, "title cannot exceed 20 character"]
    },
    description: {
        type: String,
        required: [true, "please provide job descriptions"],
        minLength: [10, "descriptions must contain 10 character"],
        maxLength: [50, "descriptions cannot exceed 20 character"]
    },
    category: {
        type: String,
        required: [true, "give category"]
    },
    country: {
        type: String,
        required: [true, "please provide contry name"]
    },
    city: {
        type: String,
        required: [true, "please provide city name"]
    },
    location: {
        type: String,
        required: [true, "please provide locations"],
        minLength: [7, "20 character must be in locations"]
    },
    fixedSalary: {
        type: Number,
        required: [true, "provide salary"],
        minLength: [4, "salary minimum length is 4 digit"],
        maxLength: [9, "max length of salary is 9 digit"]
    },
    salaryFrom: {
        type: Number,
        minLength: [4, "salary minimum length is 4 digit"],
        maxLength: [9, "max length of salary is 9 digit"]
    },
    salaryTo: {
        type: Number,
        minLength: [4, "salary minimum length is 4 digit"],
        maxLength: [9, "max length of salary is 9 digit"]
    },
    expire: {
        type: Boolean,
        default: false
    },
    jobpostedOn: {
        type: Date,
        default: Date.now
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: "name",
        required: true
    }
})

export const Job = mongoose.model("Job", JobSchema)