import mongoose from "mongoose";

export const det= new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    surName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, unique: true, trim: true },
    otherName: { type: String, trim: true },
    country: { type: String, trim: true, default: "" },
    region: { type: String, trim: true, default: "" },
    city: { type: String, trim: true, default: "" },
    degree: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
});

const User =  mongoose.model('details', det);
export default User