import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import axios from 'axios';
import { motion } from "framer-motion";
import React, { useState } from "react";
import { toast } from "sonner";
import useCompanyStore from '../store/store';

interface InternshipData {
  companyName: string;
  companyWebsite: string;
  companyLocation: string;
  companyLogo: string;
  companyDescription: string;
  position: string;
  type: string;
  duration: string;
  description: string;
  stipend: string;
  applicationDeadline: string;
  skills: string;
  qualifications: string;
  applicationUrl: string;
  applicationInstructions: string;
  workMode: string;
  department: string;
  benefits: string;
  numberOfPositions: string;
}

const PostInternship = () => {
  const {company,setCompany}= useCompanyStore()

  const [formData, setFormData] = useState<InternshipData>({
    companyName: "",
    companyWebsite: "",
    companyLocation: "",
    companyLogo: "",
    companyDescription: "",
    position: "",
    type: "",
    duration: "",
    description: "",
    stipend: "",
    applicationDeadline: "",
    skills: "",
    qualifications: "",
    applicationUrl: "",
    applicationInstructions: "",
    workMode: "",
    department: "",
    benefits: "",
    numberOfPositions: "",
  });
  
  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string, field: keyof InternshipData) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real application, you would upload to a server/CDN
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, companyLogo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8081/api/company", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      console.log(response)
      console.log(response.data)
      setCompany(response.data);
       // Delay the log to check if Zustand state has updated
     console.log(company)
      if (response.status === 201 || response.status === 200) {
        toast.success("Internship posted successfully!");
        
        setFormData({
          companyName: "",
          companyWebsite: "",
          companyLocation: "",
          companyLogo: "",
          companyDescription: "",
          position: "",
          type: "",
          duration: "",
          description: "",
          stipend: "",
          applicationDeadline: "",
          skills: "",
          qualifications: "",
          applicationUrl: "",
          applicationInstructions: "",
          workMode: "",
          department: "",
          benefits: "",
          numberOfPositions: "",
        });
      } else {
        toast.error("Failed to post internship. Please try again.");
      }
    } catch (error) {
      console.error("Error posting internship:", error);
      toast.error("Something went wrong! Please try again.");
    }
  };

  const handleSaveDraft = () => {
    // In a real application, you would save to localStorage or backend
    localStorage.setItem("internshipDraft", JSON.stringify(formData));
    toast.success("Draft saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-center mb-8">Post an Internship</h1>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Company Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Company Information</h2>
                <div className="flex items-center gap-4">
                  {formData.companyLogo && (
                    <img
                      src={formData.companyLogo}
                      alt="Company logo"
                      className="w-20 h-20 object-contain"
                    />
                  )}
                  <div className="flex-1">
                    <Label htmlFor="logo">Company Logo</Label>
                    <Input
                      id="logo"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Enter your company name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="companyWebsite">Company Website</Label>
                  <Input
                    id="companyWebsite"
                    value={formData.companyWebsite}
                    onChange={handleInputChange}
                    type="url"
                    placeholder="https://example.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="companyLocation">Company Location</Label>
                  <Input
                    id="companyLocation"
                    value={formData.companyLocation}
                    onChange={handleInputChange}
                    placeholder="City, Country"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="companyDescription">Company Description</Label>
                  <Textarea
                    id="companyDescription"
                    value={formData.companyDescription}
                    onChange={handleInputChange}
                    placeholder="Brief description of your company"
                    className="h-24"
                    required
                  />
                </div>
              </div>

              {/* Internship Details */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Internship Details</h2>
                <div>
                  <Label htmlFor="position">Position Title</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    placeholder="e.g., Software Engineering Intern"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Internship Type</Label>
                    <Select onValueChange={(value) => handleSelectChange(value, "type")}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fullTime">Full-time</SelectItem>
                        <SelectItem value="partTime">Part-time</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Select onValueChange={(value) => handleSelectChange(value, "duration")}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3months">3 months</SelectItem>
                        <SelectItem value="6months">6 months</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="workMode">Work Mode</Label>
                  <Select onValueChange={(value) => handleSelectChange(value, "workMode")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select work mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="onsite">On-site</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    placeholder="e.g., Engineering, Marketing, Design"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="numberOfPositions">Number of Positions</Label>
                  <Input
                    id="numberOfPositions"
                    value={formData.numberOfPositions}
                    onChange={handleInputChange}
                    type="number"
                    min="1"
                    placeholder="Number of interns needed"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe the internship role, responsibilities, and requirements"
                    className="h-32"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="stipend">Stipend/Salary</Label>
                    <Input
                      id="stipend"
                      value={formData.stipend}
                      onChange={handleInputChange}
                      placeholder="e.g., $1000/month"
                    />
                  </div>
                  <div>
                    <Label htmlFor="applicationDeadline">Application Deadline</Label>
                    <Input
                      id="applicationDeadline"
                      value={formData.applicationDeadline}
                      onChange={handleInputChange}
                      type="date"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="benefits">Benefits</Label>
                  <Textarea
                    id="benefits"
                    value={formData.benefits}
                    onChange={handleInputChange}
                    placeholder="List the benefits (e.g., Health insurance, Learning budget)"
                    className="h-24"
                  />
                </div>
              </div>

              {/* Requirements */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Requirements</h2>
                <div>
                  <Label htmlFor="skills">Required Skills</Label>
                  <Textarea
                    id="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    placeholder="List the required skills (e.g., JavaScript, React, Node.js)"
                    className="h-24"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="qualifications">Minimum Qualifications</Label>
                  <Textarea
                    id="qualifications"
                    value={formData.qualifications}
                    onChange={handleInputChange}
                    placeholder="Educational requirements, experience level, etc."
                    className="h-24"
                    required
                  />
                </div>
              </div>

              {/* Application Process */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Application Process</h2>
                <div>
                  <Label htmlFor="applicationUrl">Application URL</Label>
                  <Input
                    id="applicationUrl"
                    value={formData.applicationUrl}
                    onChange={handleInputChange}
                    type="url"
                    placeholder="https://example.com/apply"
                  />
                </div>
                <div>
                  <Label htmlFor="applicationInstructions">Application Instructions</Label>
                  <Textarea
                    id="applicationInstructions"
                    value={formData.applicationInstructions}
                    onChange={handleInputChange}
                    placeholder="Additional instructions for applicants"
                    className="h-24"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={handleSaveDraft}>
                  Save as Draft
                </Button>
                <Dialog open={showPreview} onOpenChange={setShowPreview}>
                  <DialogTrigger asChild>
                    <Button type="button" variant="outline">
                      Preview
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Preview Internship Listing</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        {formData.companyLogo && (
                          <img
                            src={formData.companyLogo}
                            alt="Company logo"
                            className="w-20 h-20 object-contain"
                          />
                        )}
                        <div>
                          <h2 className="text-2xl font-bold">{formData.position}</h2>
                          <p className="text-gray-600">{company.companyName}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-semibold">Location</h3>
                          <p>{company.companyLocation}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Type</h3>
                          <p>{company.type}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Duration</h3>
                          <p>{company.duration}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Work Mode</h3>
                          <p>{company.workMode}</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold">Description</h3>
                        <p className="whitespace-pre-wrap">{company.description}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold">Required Skills</h3>
                        <p className="whitespace-pre-wrap">{company.skills}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold">Benefits</h3>
                        <p className="whitespace-pre-wrap">{company.benefits}</p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button type="submit">Post Internship</Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PostInternship; 