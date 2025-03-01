import { Badge } from '../types/gamification';

export const defaultBadges: Badge[] = [
  {
    id: 'beginner',
    name: 'Beginner',
    description: 'Started your habit tracking journey',
    icon: 'trophy-award', // Changed from imageUrl to icon with Material icon name
    isUnlocked: true,
    unlockedAt: new Date(),
  },
  {
    id: 'streak-7',
    name: '7-Day Streak',
    description: 'Maintained habits for 7 consecutive days',
    icon: 'fire', // Changed from imageUrl to icon
    isUnlocked: false,
  },
  {
    id: 'streak-30',
    name: '30-Day Streak',
    description: 'Maintained habits for 30 consecutive days',
    icon: 'fire-alert', // Changed from imageUrl to icon
    isUnlocked: false,
  },
  {
    id: 'morning-master',
    name: 'Morning Master',
    description: 'Completed the Morning Routine Master challenge',
    icon: 'weather-sunny', // Changed from imageUrl to icon
    isUnlocked: false,
  },
  {
    id: 'habit-master',
    name: 'Habit Master',
    description: 'Completed the Habit Master challenge',
    icon: 'star-circle', // Changed from imageUrl to icon
    isUnlocked: false,
  },
  {
    id: 'first-challenge',
    name: 'Challenger',
    description: 'Completed your first challenge',
    icon: 'flag-checkered', // Changed from imageUrl to icon
    isUnlocked: false,
  },
];