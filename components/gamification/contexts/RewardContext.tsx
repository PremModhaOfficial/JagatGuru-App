import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

import { Badge, Challenge, UserRewards, Milestone } from '../types/gamification';

interface RewardsContextType {
    userRewards: UserRewards;
    addPoints: (points: number) => void;
    incrementStreak: () => void;
    resetStreak: () => void;
    unlockBadge: (badgeId: string) => void;
    completeChallenge: (challengeId: string) => void;
    joinChallenge: (challenge: Challenge) => void;
    updateChallengeProgress: (challengeId: string, progress: number) => void;
    useStreakFreeze: () => void;
    // Animation states
    animationStates: {
        levelUp: boolean;
        streakMilestone: boolean;
        badgeUnlocked: string | null;
        challengeCompleted: string | null;
    };
    resetAnimationState: (
        type: 'levelUp' | 'streakMilestone' | 'badgeUnlocked' | 'challengeCompleted'
    ) => void;
    getNextMilestone: () => number;
    getProgressToNextMilestone: () => number;
}

const STREAK_MILESTONES = [5, 10, 15, 20, 25, 30, 50, 75, 100, 150, 200, 365];

const defaultRewards: UserRewards = {
    points: 0,
    streakCount: 0,
    longestStreak: 0,
    level: 1,
    badges: [],
    completedChallenges: [],
    currentChallenges: [],
    streakFreeze: 0,
    lastStreakUpdate: null,
    milestones: {
        streakMilestones: [],
        pointMilestones: [],
    },
};

const RewardsContext = createContext<RewardsContextType | undefined>(undefined);

export const RewardsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userRewards, setUserRewards] = useState<UserRewards>(defaultRewards);
    const [animationStates, setAnimationStates] = useState({
        levelUp: false,
        streakMilestone: false,
        badgeUnlocked: null as string | null,
        challengeCompleted: null as string | null,
    });

    const previousLevel = useRef(1);
    const previousStreak = useRef(0);

    // Load rewards from storage on mount
    useEffect(() => {
        const loadRewards = async () => {
            try {
                const storedRewards = await AsyncStorage.getItem('userRewards');
                if (storedRewards) {
                    const parsedRewards = JSON.parse(storedRewards);
                    setUserRewards(parsedRewards);
                    previousLevel.current = parsedRewards.level;
                    previousStreak.current = parsedRewards.streakCount;
                }
            } catch (error) {
                console.error('Failed to load rewards:', error);
            }
        };

        loadRewards();
    }, []);

    // Save rewards to storage whenever they change
    useEffect(() => {
        const saveRewards = async () => {
            try {
                await AsyncStorage.setItem('userRewards', JSON.stringify(userRewards));
            } catch (error) {
                console.error('Failed to save rewards:', error);
            }
        };

        saveRewards();
    }, [userRewards]);

    // Check for level up animation
    useEffect(() => {
        if (userRewards.level > previousLevel.current) {
            setAnimationStates((prev) => ({ ...prev, levelUp: true }));
            previousLevel.current = userRewards.level;
        }
    }, [userRewards.level]);

    // Check for streak milestone animation
    useEffect(() => {
        if (userRewards.streakCount > previousStreak.current) {
            // Check if we've hit a milestone
            if (STREAK_MILESTONES.includes(userRewards.streakCount)) {
                setAnimationStates((prev) => ({ ...prev, streakMilestone: true }));

                // Add to milestone history if not already there
                setUserRewards((prev) => {
                    const alreadyRecorded = prev.milestones.streakMilestones.some(
                        (m) => m.value === userRewards.streakCount
                    );

                    if (!alreadyRecorded) {
                        return {
                            ...prev,
                            milestones: {
                                ...prev.milestones,
                                streakMilestones: [
                                    ...prev.milestones.streakMilestones,
                                    { value: userRewards.streakCount, achievedAt: new Date() },
                                ],
                            },
                        };
                    }
                    return prev;
                });
            }
            previousStreak.current = userRewards.streakCount;
        }
    }, [userRewards.streakCount]);

    const resetAnimationState = (
        type: 'levelUp' | 'streakMilestone' | 'badgeUnlocked' | 'challengeCompleted'
    ) => {
        setAnimationStates((prev) => {
            if (type === 'badgeUnlocked') {
                return { ...prev, badgeUnlocked: null };
            } else if (type === 'challengeCompleted') {
                return { ...prev, challengeCompleted: null };
            } else {
                return { ...prev, [type]: false };
            }
        });
    };

    const addPoints = (points: number) => {
        setUserRewards((prev) => {
            const newPoints = prev.points + points;
            // Calculate level based on points (example formula)
            const newLevel = Math.floor(newPoints / 100) + 1;

            // Check for point milestones (every 500 points)
            const pointMilestone = Math.floor(newPoints / 500) * 500;
            const prevPointMilestone = Math.floor(prev.points / 500) * 500;

            let updatedMilestones = prev.milestones;

            if (pointMilestone > prevPointMilestone) {
                const alreadyRecorded = prev.milestones.pointMilestones.some(
                    (m) => m.value === pointMilestone
                );

                if (!alreadyRecorded) {
                    updatedMilestones = {
                        ...prev.milestones,
                        pointMilestones: [
                            ...prev.milestones.pointMilestones,
                            { value: pointMilestone, achievedAt: new Date() },
                        ],
                    };
                }
            }

            return {
                ...prev,
                points: newPoints,
                level: newLevel,
                milestones: updatedMilestones,
            };
        });
    };

    const incrementStreak = () => {
        const today = new Date().toDateString();

        setUserRewards((prev) => {
            // Check if already updated today
            if (prev.lastStreakUpdate === today) {
                return prev;
            }

            const newStreakCount = prev.streakCount + 1;
            const newLongestStreak = Math.max(newStreakCount, prev.longestStreak);

            return {
                ...prev,
                streakCount: newStreakCount,
                longestStreak: newLongestStreak,
                lastStreakUpdate: today,
            };
        });
    };

    const resetStreak = () => {
        setUserRewards((prev) => {
            // If user has streak freeze, use it instead of resetting
            if (prev.streakFreeze > 0) {
                return {
                    ...prev,
                    streakFreeze: prev.streakFreeze - 1,
                };
            }

            return {
                ...prev,
                streakCount: 0,
            };
        });
    };

    const useStreakFreeze = () => {
        setUserRewards((prev) => ({
            ...prev,
            streakFreeze: prev.streakFreeze > 0 ? prev.streakFreeze - 1 : 0,
        }));
    };

    const unlockBadge = (badgeId: string) => {
        setUserRewards((prev) => {
            // Check if badge is already unlocked
            const badgeAlreadyUnlocked = prev.badges.some(
                (badge) => badge.id === badgeId && badge.isUnlocked
            );

            if (!badgeAlreadyUnlocked) {
                setAnimationStates((prevState) => ({
                    ...prevState,
                    badgeUnlocked: badgeId,
                }));
            }

            const updatedBadges = prev.badges.map((badge) =>
                badge.id === badgeId
                    ? { ...badge, isUnlocked: true, unlockedAt: new Date() }
                    : badge
            );

            return {
                ...prev,
                badges: updatedBadges,
            };
        });
    };

    const completeChallenge = (challengeId: string) => {
        setUserRewards((prev) => {
            // Find the challenge
            const challenge = prev.currentChallenges.find((c) => c.id === challengeId);

            if (!challenge) return prev;

            // Set animation state
            setAnimationStates((prevState) => ({
                ...prevState,
                challengeCompleted: challengeId,
            }));

            // Add points reward
            const newPoints = prev.points + challenge.pointsReward;

            // Unlock badge if there's a badge reward
            if (challenge.badgeReward) {
                unlockBadge(challenge.badgeReward);
            }

            // Update completed challenges
            const completedChallenges = [...prev.completedChallenges, challengeId];

            // Remove from current challenges
            const currentChallenges = prev.currentChallenges.filter((c) => c.id !== challengeId);

            return {
                ...prev,
                points: newPoints,
                completedChallenges,
                currentChallenges,
            };
        });
    };

    const joinChallenge = (challenge: Challenge) => {
        setUserRewards((prev) => ({
            ...prev,
            currentChallenges: [...prev.currentChallenges, challenge],
        }));
    };

    const updateChallengeProgress = (challengeId: string, progress: number) => {
        setUserRewards((prev) => {
            const updatedChallenges = prev.currentChallenges.map((challenge) =>
                challenge.id === challengeId
                    ? {
                          ...challenge,
                          progress,
                          isCompleted: progress >= 100,
                      }
                    : challenge
            );

            // If challenge is completed, handle completion
            const completedChallenge = updatedChallenges.find(
                (c) => c.id === challengeId && c.isCompleted
            );

            if (completedChallenge && !prev.completedChallenges.includes(challengeId)) {
                // Set animation state
                setAnimationStates((prevState) => ({
                    ...prevState,
                    challengeCompleted: challengeId,
                }));

                return {
                    ...prev,
                    currentChallenges: updatedChallenges.filter((c) => c.id !== challengeId),
                    completedChallenges: [...prev.completedChallenges, challengeId],
                    points: prev.points + (completedChallenge.pointsReward || 0),
                };
            }

            return {
                ...prev,
                currentChallenges: updatedChallenges,
            };
        });
    };

    const getNextMilestone = () => {
        return (
            STREAK_MILESTONES.find((m) => m > userRewards.streakCount) ||
            STREAK_MILESTONES[STREAK_MILESTONES.length - 1]
        );
    };

    const getProgressToNextMilestone = () => {
        const nextMilestone = getNextMilestone();
        const prevMilestone =
            STREAK_MILESTONES.filter((m) => m < userRewards.streakCount).pop() || 0;

        if (userRewards.streakCount >= STREAK_MILESTONES[STREAK_MILESTONES.length - 1]) {
            return 1; // 100% if we've reached the highest milestone
        }

        return (userRewards.streakCount - prevMilestone) / (nextMilestone - prevMilestone);
    };

    return (
        <RewardsContext.Provider
            value={{
                userRewards,
                addPoints,
                incrementStreak,
                resetStreak,
                unlockBadge,
                completeChallenge,
                joinChallenge,
                updateChallengeProgress,
                useStreakFreeze,
                animationStates,
                resetAnimationState,
                getNextMilestone,
                getProgressToNextMilestone,
            }}>
            {children}
        </RewardsContext.Provider>
    );
};

export const useRewards = () => {
    const context = useContext(RewardsContext);
    if (context === undefined) {
        throw new Error('useRewards must be used within a RewardsProvider');
    }
    return context;
};

