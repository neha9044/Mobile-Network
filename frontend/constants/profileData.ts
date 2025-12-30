export const INITIAL_PROFILE_DATA = {
  user: {
    id: 1,
    firstName: "Sheshasai",
    lastName: "Dusa",
    email: "email@example.com",
    phoneNo: "1234567890",
    profilePhoto: "https://i.pravatar.cc/300?img=11",
    socialLinks: ["https://github.com", "https://linkedin.com"]
  },
  cv: {
    id: 1,
    profession: "SDE - II @Google",
    profileSummary: "Indie hacker mentoring the next generation of builders.", // mapped from bio
    profilePhoto: "https://i.pravatar.cc/300?img=11",
    skills: ["JavaScript", "Flutter", "NodeJS", "Design", "Marketing", "Business Development"],
    languages: ["Hindi", "English", "Marathi"],
    hobbies: ["Cricket", "Reading", "Travelling"],
    
    experiences: [
      {
        id: "1",
        type: "JOB",
        organization: "SalesForce", // mapped from company
        role: "Ui/Ux Developer",
        startDate: "Dec 2021",
        endDate: "July 2024",
        technology: "React, designing", // New field placeholder
        description: "At Beetle, we've reported 1.2k issues... Led end-to-end design...", // Now a single string
        link: "https://salesforce.com"
      }
    ],

    qualifications: [ // mapped from education
      {
        id: "1",
        institution: "SIES Graduate School Of Technology",
        board: "University of Mumbai",
        degree: "AIML Engineering",
        startYear: 2021,
        endYear: 2025,
        score: "8.2 CGPA"
      }
    ],

    projects: [
      {
        id: "1",
        name: "Github Project v01", // mapped from title
        description: "This is the description of the project...",
        links: ["https://github.com"]
      }
    ],

    certifications: [
      {
        id: "1",
        name: "Postman API Fundamentals",
        issuedBy: "HackerRank",
        description: "API fundamentals certification...",
        link: "https://hackerrank.com"
      },
      {
        id: "2",
        name: "AWS Certified Cloud Practitioner",
        issuedBy: "Amazon Web Services",
        description: "Cloud fundamentals...",
        link: "https://aws.amazon.com"
      }
    ],
    
    achievements: []
  }
};
