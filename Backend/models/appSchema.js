import mongoose from "mongoose";
import validator from "validator";

const applicationsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide name"]
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        validator: [validator.isEmail, "Please provide valide Email"]
    },
    coverletter: {
        type: String,
        required: [true, "provide coverLetter"]
    },
    phone: {
        type: Number,
        required: [true, "Please provide number"]
    },
    adderess: {
        type: String,
        required: [true, "Please provide address"]
    },
    resume: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    applicationId: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        role: {
            type: String,
            enum: ["Job seeker"],
            required: true
        }
    },
    employerId: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        role: {
            type: String,
            enum: ["Employer"],
            required: true
        }
    }
})

export const Application = mongoose.model("Application", applicationsSchema)