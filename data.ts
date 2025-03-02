export const Habits = {
    streakMilestones: [
        {
            id: 1,
            title: 'First Milestone',
            description: 'Complete your first streak',
            progress: 50,
            target: 100,
        },
        {
            id: 2,
            title: 'Second Milestone',
            description: 'Complete your second streak',
            progress: 25,
            target: 100,
        },
        {
            id: 3,
            title: 'Third Milestone',
            description: 'Complete your third streak',
            progress: 75,
            target: 100,
        },
    ],
    badges: [
        {
            id: '1',
            name: 'First Badge',
            description: 'Your first badge',
            icon: 'star',
            isUnlocked: true,
            unlockedAt: new Date(),
        },
        {
            id: '2',
            name: 'Second Badge',
            description: 'Your second badge',
            icon: 'trophy',
            isUnlocked: false,
        },
    ],
};
