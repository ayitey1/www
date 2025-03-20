import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Check, Upload } from 'lucide-react';
import React, { useState } from 'react';
const Application = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    firstName: '',
    surName: '',
    otherName: '',
    email: '',
    phone: '',
    degree: '',
    country: '',
    region: '',
    city: '',
    resume: null,
    transcript: null,
    internshipLetter: null
  });
  
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [transcriptUploaded, setTranscriptUploaded] = useState(false);
  const [letterUploaded, setLetterUploaded] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: string) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 30 * 1024 * 1024) { // 30MB in bytes
        toast({
          title: "File too large",
          description: "Maximum file size is 30MB",
          variant: "destructive"
        });
        return;
      }
      
      setFormState(prev => ({ ...prev, [fileType]: file }));
      
      switch (fileType) {
        case 'resume':
          setResumeUploaded(true);
          break;
        case 'transcript':
          setTranscriptUploaded(true);
          break;
        case 'internshipLetter':
          setLetterUploaded(true);
          break;
      }
      
      toast({
        title: "File uploaded",
        description: "Your file has been successfully uploaded",
        variant: "default"
      });
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    /*if (
      !formState.firstName || 
      !formState.surName || 
      !formState.email || 
      !formState.phone ||
      !formState.country ||
      !formState.region ||
      !formState.city ||
      !resumeUploaded
    ) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
  }*/
    
    // Here you would typically send the form data to your backend
    
    try {
      // First API Request to /api/details
      const response1 = await axios.post('http://localhost:8081/api/details', {
        firstName: formState.firstName,
        surName: formState.surName,
        otherName: formState.otherName,
        email: formState.email,
        phone: formState.phone,
        degree: formState.degree,
        country: formState.country,
        region: formState.region,
        city: formState.city,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    
      console.log("First API Response:", response1.data);
    
      // Second API Request to /api/extraDetails
      const response2 = await axios.post('http://localhost:8081/api/registerMail', {
        firstName: formState.firstName,
        surName: formState.surName,
        otherName: formState.otherName,
        Email: formState.email,
        phone: formState.phone,
        degree: formState.degree,
        country: formState.country,
        region: formState.region,
        city: formState.city,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    
      console.log("Second API Response:", response2.data);
    
      // Success message
      toast({
        title: "Application submitted",
        description: "Your application and extra details have been successfully submitted",
        variant: "default"
      });
    
    } catch (error) {
      console.error("Error submitting application:", error);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your application",
        variant: "destructive"
      });
    }
    
    
  
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-12 max-w-5xl"
    >
      <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl font-bold mb-8 text-center text-gray-800"
        >
          Internship Application
        </motion.h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl font-semibold mb-4 border-b pb-2"
            >
              Personal Information
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  value={formState.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="surName" className="block text-sm font-medium text-gray-700 mb-1">
                  Surname *
                </label>
                <Input
                  type="text"
                  id="surName"
                  name="surName"
                  placeholder="Surname"
                  value={formState.surName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="otherName" className="block text-sm font-medium text-gray-700 mb-1">
                  Other Name
                </label>
                <Input
                  type="text"
                  id="otherName"
                  name="otherName"
                  placeholder="Other Name (Optional)"
                  value={formState.otherName}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          
          {/* Contact Information */}
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl font-semibold mb-4 border-b pb-2"
            >
              Contact Information
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email Address"
                  value={formState.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <Input
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="Phone Number"
                  value={formState.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="degree" className="block text-sm font-medium text-gray-700 mb-1">
                  Degree *
                </label>
                <Input
                  type="text"
                  id="degree"
                  name="degree"
                  placeholder="Degree"
                  value={formState.degree}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          
          {/* File Uploads */}
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xl font-semibold mb-4 border-b pb-2"
            >
              Documents
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Resume Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resume/CV *
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileChange(e, 'resume')}
                    className="hidden"
                  />
                  <label
                    htmlFor="resume"
                    className={`flex items-center justify-center w-full p-4 border-2 border-dashed rounded-lg cursor-pointer transition-colors
                      ${resumeUploaded ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400'}`}
                  >
                    {resumeUploaded ? (
                      <Check className="w-6 h-6 text-green-500" />
                    ) : (
                      <Upload className="w-6 h-6 text-gray-400" />
                    )}
                    <span className="ml-2 text-sm text-gray-600">
                      {resumeUploaded ? 'Resume Uploaded' : 'Upload Resume'}
                    </span>
                  </label>
                </div>
              </div>

              {/* Transcript Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Academic Transcript
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="transcript"
                    name="transcript"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileChange(e, 'transcript')}
                    className="hidden"
                  />
                  <label
                    htmlFor="transcript"
                    className={`flex items-center justify-center w-full p-4 border-2 border-dashed rounded-lg cursor-pointer transition-colors
                      ${transcriptUploaded ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400'}`}
                  >
                    {transcriptUploaded ? (
                      <Check className="w-6 h-6 text-green-500" />
                    ) : (
                      <Upload className="w-6 h-6 text-gray-400" />
                    )}
                    <span className="ml-2 text-sm text-gray-600">
                      {transcriptUploaded ? 'Transcript Uploaded' : 'Upload Transcript'}
                    </span>
                  </label>
                </div>
              </div>

              {/* Internship Letter Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Internship Letter
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="internshipLetter"
                    name="internshipLetter"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileChange(e, 'internshipLetter')}
                    className="hidden"
                  />
                  <label
                    htmlFor="internshipLetter"
                    className={`flex items-center justify-center w-full p-4 border-2 border-dashed rounded-lg cursor-pointer transition-colors
                      ${letterUploaded ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400'}`}
                  >
                    {letterUploaded ? (
                      <Check className="w-6 h-6 text-green-500" />
                    ) : (
                      <Upload className="w-6 h-6 text-gray-400" />
                    )}
                    <span className="ml-2 text-sm text-gray-600">
                      {letterUploaded ? 'Letter Uploaded' : 'Upload Letter'}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <Button type="submit" className="px-8">
              Submit Application
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Application;
