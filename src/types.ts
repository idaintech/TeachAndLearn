export type UserRole = 'parent' | 'mentor' | 'teacher' | 'guest';

export type LearningLevel = 'Foundation' | 'Beginner' | 'Intermediate' | 'Advanced' | 'Pro';

export type SubjectName = 'Mathematics' | 'English' | 'Programming' | 'Science';

export interface SubjectGap {
  skill: string;
  status: 'Strong' | 'Developing' | 'Needs practice';
  notes?: string;
}

export interface ChildSubject {
  subject: SubjectName;
  level: LearningLevel;
  progressPercent: number;
  gaps: SubjectGap[];
  lastActivity?: string;
}

export interface Child {
  id: string;
  name: string;
  age: number;
  grade: string;
  avatar: string;
  overallProgress: number;
  subjects: ChildSubject[];
  recommendedPath?: any;
}

export interface DiagnosticQuestion {
  id: number;
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  skillFocus: string;
  hint: string;
}

export interface DiagnosticResult {
  childId: string;
  childName: string;
  subject: SubjectName;
  date: string;
  skills: {
    skillName: string;
    status: 'Strong' | 'Developing' | 'Needs practice';
    description: string;
  }[];
  recommendedPath: {
    title: string;
    level: LearningLevel;
    duration: string;
    sessionsPerWeek: string;
    supportType: 'Peer Mentor' | 'Verified Teacher';
    description: string;
    actionLabel: string;
  };
}

export interface Tutor {
  id: string;
  name: string;
  avatar: string;
  role: 'mentor' | 'teacher';
  badgeTitle: string;
  verificationList: string[];
  subjects: SubjectName[];
  levels: string;
  grades: string;
  rating: number;
  reviewsCount: number;
  studentsHelped: number;
  volunteerHours?: number;
  price: number | 'FREE';
  priceLabel: string;
  availability: string[];
  bio: string;
  whyIMentor?: string;
  languages: string[];
  experience: string;
  qualifications?: string[];
  verifiedSafeguardDate: string;
  featured?: boolean;
}

export interface VolunteerSession {
  id: string;
  date: string;
  studentName: string;
  studentGrade?: string;
  subject: SubjectName | string;
  topic: string;
  duration?: string;
  durationHours?: number;
  parentFeedback?: string;
  rating?: number;
  verifiedStatus?: 'Verified by Parent' | 'Verified by Platform' | string;
}

export interface RewardTier {
  tier: number;
  hoursRequired: number;
  title: string;
  description: string;
  status: 'unlocked' | 'locked';
}

export interface VolunteerRecord {
  mentorId: string;
  mentorName: string;
  mentorAvatar?: string;
  grade?: string;
  schoolGrade?: string;
  memberSince?: string;
  role: 'Verified Peer Mentor';
  subject: SubjectName | string;
  totalHours: number;
  totalVerifiedHours?: number;
  studentsHelped: number;
  completedSessions: number;
  sessionsCompleted?: number;
  rating: number;
  averageFeedback?: number;
  certificateId: string;
  currentLevel?: 'Bronze Mentor' | 'Silver Mentor' | 'Gold Mentor' | 'Diamond Mentor';
  rewards: RewardTier[];
  upcomingSessions: {
    id: string;
    studentName: string;
    studentGrade: string;
    subject: string;
    date: string;
    duration: string;
    topic: string;
  }[];
  nextReward?: {
    targetHours: number;
    title: string;
    discountPercent?: number;
  };
  sessions?: VolunteerSession[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'ai';
  text: string;
  timestamp: string;
  source?: string;
  structured?: {
    simpleExplanation?: string;
    activity?: string;
    whatToSay?: string;
    nextStep?: string;
  };
}

export interface Enrollment {
  id: string;
  childId: string;
  childName: string;
  tutorId: string;
  tutorName: string;
  tutorRole: 'mentor' | 'teacher';
  subject: SubjectName;
  price: string;
  status: 'Active' | 'Completed' | 'Upcoming';
  schedule: string;
  nextSession?: string;
  enrolledDate?: string;
  parentConsentConfirmed?: boolean;
  parentApproved?: boolean;
}
