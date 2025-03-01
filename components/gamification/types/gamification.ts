export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  unlockedAt?: Date;
}

export interface Challenge {
  id: string;
  name: string;
  description: string;
  pointsReward: number;
  badgeReward?: string;
  progress: number;
  isCompleted: boolean;
  deadline?: Date;
}

export interface Milestone {
  value: number;
  achievedAt: Date;
}

export interface Milestones {
  streakMilestones: Milestone[];
  pointMilestones: Milestone[];
}

export interface UserRewards {
  points: number;
  streakCount: number;
  longestStreak: number;
  level: number;
  badges: Badge[];
  completedChallenges: string[];
  currentChallenges: Challenge[];
  streakFreeze: number;
  lastStreakUpdate: string | null;
  milestones: Milestones;
}