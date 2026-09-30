export interface ProjectMilestone {
  date: string;
  title: string;
  description: string;
}

export interface ProjectStats {
  mealsServed?: string;
  familiesReached?: string;
  centersActive?: string;
  volunteerHours?: string;
  studentsEnrolled?: string;
  successRate?: string;
  activeSchools?: string;
  teachersTrained?: string;
  patientsTreated?: string;
  campsOrganized?: string;
  medicinesDistributed?: string;
  doctorsEngaged?: string;
  rationKitsDistributed?: string;
  villagesCovered?: string;
  monthlyReach?: string;
  emergencyResponses?: string;
  youthMentored?: string;
  dropoutsReenrolled?: string;
  workshopsConducted?: string;
  communitiesEngaged?: string;
  studentsEducated?: string;
  currentEnrollment?: string;
  scholarshipsAwarded?: string;
  academicExcellence?: string;
}

export interface ProjectDetail {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  heroImage: string;
  gallery: string[];
  description: string;
  detailedStory: string[];
  impactStats: ProjectStats;
  objectives: string[];
  milestones: ProjectMilestone[];
  targetAmount: string;
  raisedAmount: string;
  donorsCount: number;
}
