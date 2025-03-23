import mongoose from "mongoose";

const InternshipSchema = new mongoose.Schema({
  companyLogo: String,
  companyName: String,
  companyWebsite: String,
  companyLocation: String,
  companyDescription: String,
  
  // Internship Details
  positionTitle: String,
  internshipType: String,
  duration: String,
  workMode: String,
  department: String,
  numberOfPositions: Number,
  description: String,
  stipendSalary: String,
  applicationDeadline: String,
  companyLocation: { type: String, required: true }, 
  type:  String,  
  workMode:String, 
  requiredSkills: [{ type: String, required: true }],
  benefits: [String],

  // Requirements
  requiredSkills: [String],
  minimumQualifications: String,

  // Application Process
  applicationURL: String,
  applicationInstructions: String

}, { timestamps: true });

export default mongoose.model("Company", InternshipSchema);
