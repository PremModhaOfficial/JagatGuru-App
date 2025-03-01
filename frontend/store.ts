import create from 'zustand';
export type Habit = {
    name: string;
    interval: 'Every Day' | 'Every 2 Days' | 'Every 3 Days';
};

export const Habits: Habit[] = [
    {
        name: 'Gym',
        interval: 'Every Day',
    },
    {
        name: 'Read',
        interval: 'Every Day',
    },
];

export const HabitStore = create((set) => ({
    habits: Habits,
    addHabit: (H: Habit) => set((state) => ({ habits: [...state.habits, H] })),
    renoveAll: () => set({ habits: [] }),
}));
