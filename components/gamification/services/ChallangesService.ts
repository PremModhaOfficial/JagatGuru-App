import { Challenge } from '../types/gamification';

// Extended challenge type for internal use in the service
interface ExtendedChallenge extends Challenge {
    type: 'daily' | 'weekly' | 'monthly';
    title?: string;
    startDate?: Date;
    endDate?: Date;
    habitIds?: string[];
}

// This would typically come from an API or database
const sampleChallenges: ExtendedChallenge[] = [
    {
        id: 'daily-1',
        name: 'Morning Routine Master', // Changed from title to name
        description: 'Complete all your morning habits for 3 consecutive days',
        type: 'daily',
        pointsReward: 50,
        badgeReward: 'morning-master',
        startDate: new Date(),
        endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        progress: 0,
        isCompleted: false,
        habitIds: ['morning-exercise', 'meditation', 'breakfast'],
    },
    {
        id: 'weekly-1',
        name: 'Fitness Week', // Changed from title to name
        description: 'Complete all your fitness habits for a full week',
        type: 'weekly',
        pointsReward: 150,
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        progress: 0,
        isCompleted: false,
        habitIds: ['workout', 'running', 'stretching'],
    },
    {
        id: 'monthly-1',
        name: 'Habit Master', // Changed from title to name
        description: 'Maintain a 30-day streak of completing all daily habits',
        type: 'monthly',
        pointsReward: 500,
        badgeReward: 'habit-master',
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        progress: 0,
        isCompleted: false,
        habitIds: [], // This applies to all habits
    },
];

// Function to convert ExtendedChallenge to Challenge
const convertToChallenge = (extendedChallenge: ExtendedChallenge): Challenge => {
    const { type, title, startDate, endDate, habitIds, ...challenge } = extendedChallenge;
    return challenge;
};

export const fetchChallenges = async (): Promise<ExtendedChallenge[]> => {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(sampleChallenges);
        }, 500);
    });
};

// If you need to get challenges without the extended properties
export const fetchStandardChallenges = async (): Promise<Challenge[]> => {
    const extendedChallenges = await fetchChallenges();
    return extendedChallenges.map(convertToChallenge);
};

