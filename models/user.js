const { Schema, model } = require('mongoose');
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Set password for user'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: String,
    avatarURL: String,
    
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
    },
}, { versionKey: false, timestamps: true });

userSchema.post("save", handleMongooseError);

const authSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
});

const emailSchema = Joi.object({
    email: Joi.string().required(),
});

const schemas = {
    authSchema,
    emailSchema,
}

const User = model("user", userSchema);

module.exports = {
    schemas, 
    User,
}
