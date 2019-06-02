import * as mongoose from 'mongoose';
import * as bcrypt from "bcrypt";

export const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    seller: {
        type: Boolean,
        default: false
    },
    address: {
        addr1: String,
        addr2: String,
        city: String,
        country: String,
        postal: String
    },
    created: {
        type: Date,
        default: Date.now
    }
});

// mongoose middleware which is called before saving any records. Hash our passwords
UserSchema.pre('save', async function (next: mongoose.HookNextFunction) {
    try {
        // check if password is present and is modified.
        if (!this.isModified('password')) {
            return next();
        }
        // call your hashPassword method here which will return the hashed password.
        const hashed: string = await bcrypt.hash(this['password'], 10);
        this['password'] = hashed;
        return next();
    } catch (err) {
        return next(err);
    }
});