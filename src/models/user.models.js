import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,

    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String, //cloudinary url
        required: true,
    },
    coverImage: {
        type: String, // cloudinaryu url
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    refreshToken: {
        type: String,
        required: [true, 'Password is required']
    },
    {
        timestamps: true
    }


})
userSchema.pre("save", async function (next) {
    if (!this.ismodified("password")) return next();

    this.password = bcrypt.hash(this.password, 10)
    next()

})

userSchema.methods.ispasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname

        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiryIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    ) 
}

userSchema.methods.ispasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
          

        },
        process.env.REFRESS_TOKEN_SECRET,
        {
            expiryIn: process.env.REFRESS_TOKEN_EXPIRY
        }
    ) 
}

useSchema.methods.generateRefreshToken = function () { }

export const User = mongoose.modal("User", userSchema)