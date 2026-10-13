export const navigation = ['Home', 'About', 'Projects', 'Skills', 'Achievements', 'Contact'];
export const projects = [
  { id: '01', name: 'QuizQuest', category: 'FULL-STACK WEB DEVELOPMENT', summary: 'Making learning a little more interactive.', description: 'A full-stack quiz platform designed to make learning interactive through category-based quizzes, authentication, and performance tracking.', tags: ['MongoDB', 'Express.js', 'React', 'Node.js', 'REST APIs'], kind: 'quiz', highlights: ['Developed a MERN-based quiz platform with authentication and category-based quizzes.', 'Designed RESTful APIs for question management and user progress storage.', 'Built dynamic React interfaces with real-time result evaluation.', 'Implemented structured result tracking and dynamic quiz flows.'] },
  { id: '02', name: 'Eco-Mate', category: 'WEB APPLICATION · CLIMATE AWARENESS', summary: 'A space for conversations that matter.', description: 'A social platform focused on climate awareness, designed to encourage meaningful discussions, expert-led forums, and community engagement.', tags: ['Web Technologies', 'Community', 'Climate Awareness'], kind: 'eco', highlights: ['Developed a platform centered on climate awareness.', 'Supported discussion and community engagement through expert-led forums.'] },
  { id: '03', name: 'Smart Water Monitor', category: 'IOT · CONNECTED SYSTEMS', summary: 'Connected systems. More thoughtful water use.', description: 'An IoT-enabled irrigation monitoring system designed to track soil moisture in real time and support automated water management.', tags: ['ESP8266', 'Blynk', 'IoT'], kind: 'water', highlights: ['Designed and implemented an irrigation monitoring system using ESP8266 and Blynk.', 'Enabled real-time soil moisture tracking.', 'Supported automated water management to improve efficiency and reduce water wastage.'] },
] as const;
export const skillGroups = [
  { title: 'Programming', skills: ['Java', 'Python'] },
  { title: 'Frontend', skills: ['HTML', 'CSS', 'JavaScript', 'React'] },
  { title: 'Backend & APIs', skills: ['MERN development', 'REST APIs', 'API integration'] },
  { title: 'Databases', skills: ['MySQL', 'MongoDB'] },
  { title: 'Developer tools', skills: ['Git', 'GitHub'] },
  { title: 'Computer science', skills: ['Object-Oriented Programming', 'Data Structures & Algorithms'] },
  { title: 'Software engineering', skills: ['SDLC', 'Agile / Scrum', 'Manual Testing', 'Functional Testing', 'API Testing', 'Debugging', 'Defect Tracking', 'Application Validation'] },
];
export const certifications = [
 ['Java Full Stack with React JS & AI', 'Brain O Vision'],
 ['Google AI-ML Virtual Internship', 'Eduskills Academy'],
 ['National-Level Workshop on AI Application Development', 'AICTE'],
 ['MERN Stack Internship', 'Brain O Vision'],
 ['TASK i4TS 2.0 Ideathon Participant', 'TASK'],
];
// Add only verified URLs. Import the original PDF asset pointer when supplied.
export const personalLinks = {
  resume: "/resume.pdf",
  github: null,
  linkedin: null,
};