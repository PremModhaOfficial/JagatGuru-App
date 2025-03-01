import { useRewards } from '../contexts/RewardContext';

// Define an extended challenge type that includes habitIds
interface ChallengeWithHabits {
  id: string;
  habitIds?: string[];
  progress: number;
}

export const useHabitRewards = () => {
  const { 
    addPoints, 
    incrementStreak, 
    resetStreak, 
    updateChallengeProgress,
    userRewards 
  } = useRewards();

  const handleHabitCompletion = (habitId: string) => {
    // Award points for completing a habit
    addPoints(10);
    
    // Update progress for any challenges that include this habit
    userRewards.currentChallenges.forEach(challenge => {
      // Safely check if challenge has habitIds and if it includes the completed habit
      const habitIds = (challenge as any).habitIds;
      
      if (habitIds && Array.isArray(habitIds) && habitIds.includes(habitId)) {
        // Calculate new progress
        const totalHabits = habitIds.length;
        const completedHabits = challenge.progress / 100 * totalHabits + 1;
        const newProgress = Math.min((completedHabits / totalHabits) * 100, 100);
        
        updateChallengeProgress(challenge.id, newProgress);
      }
    });
  };

  const handleDailyStreak = (allHabitsCompleted: boolean) => {
    if (allHabitsCompleted) {
      incrementStreak();
      
      // Award bonus points for streak milestones
      const { streakCount } = userRewards;
      if (streakCount % 5 === 0) {
        // Bonus points for every 5 days
        addPoints(50);
      }
      if (streakCount % 30 === 0) {
        // Extra bonus for monthly streaks
        addPoints(200);
      }
    } else {
      resetStreak();
    }
  };

  // Helper function to check if all habits for a challenge are completed
  const checkChallengeCompletion = (
    completedHabitIds: string[], 
    challengeId: string
  ): boolean => {
    const challenge = userRewards.currentChallenges.find(c => c.id === challengeId);
    if (!challenge) return false;
    
    const habitIds = (challenge as any).habitIds;
    if (!habitIds || !Array.isArray(habitIds)) return false;
    
    // Check if all habits in the challenge are completed
    return habitIds.every(id => completedHabitIds.includes(id));
  };

  return {
    handleHabitCompletion,
    handleDailyStreak,
    checkChallengeCompletion,
  };
};