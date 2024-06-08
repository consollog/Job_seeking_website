import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import validator from 'validator';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide name..!"],
        minLength: [3, "Name atlest contain 3 character"],
        maxLength: [20, "Name cananot exceed 30 character"]
    },
    email: {
        type: String,
        required: [true, "Please provide Email"],
        validate: [validator.isEmail, "Email is not validate, Try again"]
    },
    phone: {
        type: Number,
        required: [true, "Please provide Phone number"],
    },
    password: {
        type: String,
        required: [true, "Please provide Password"],
        minLength: [5, "Password atlest contain 5 character"],
        maxLength: [15, "Password cananot exceed 15 character"],
        select: false
    },
    role: {
        type: String,
        required: [true, "Please select your role"],
        enum: ["Employer", "Job seeker"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

//hashing Password
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

//Comparing Password
UserSchema.methods.comparePassword = async function (enteredpassword) {
    return await bcrypt.compare(enteredpassword, this.password)
}

//Genrating JWtT token for authrizations
UserSchema.methods.getJWTToken = function () {
    return JWT.sign({ id: this._id }, process.env.JWT_SECRET_KEY,
        process.env.JWT_EXPIRE
    )
}

export const User = mongoose.model("User", UserSchema);