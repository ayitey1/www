import { create } from "zustand";


const useCompanyStore = create((set) => ({
  company: {
    companyLogo: "",
    companyName: "",
    companyWebsite: "",
    companyLocation: "",
    companyDescription: "",

    // Internship Details
    positionTitle: "",
    internshipType: "",
    duration: "",
    workMode: "",
    department: "",
    numberOfPositions: 0,
    description: "",
    stipendSalary: "",
    applicationDeadline: "",
    type: "",
    requiredSkills: [],
    benefits: [],

    // Requirements
    minimumQualifications: "",

    // Application Process
    applicationURL: "",
    applicationInstructions: "",
  },

  // Correctly update only the `company` object
  setCompany: (newData) => set((state) => ({
    company: { ...state.company, ...newData }
  })),
}));

export default useCompanyStore;


