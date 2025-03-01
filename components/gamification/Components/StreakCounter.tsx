import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing, TouchableOpacity, Dimensions } from 'react-native';
import { useRewards } from '../contexts/RewardContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LottieView from 'lottie-react-native';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');
const MILESTONE_COLORS = ['#FF9800', '#FF5722', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5'];

const StreakCounter = () => {
  const { 
    userRewards, 
    animationStates, 
    resetAnimationState,
    getNextMilestone,
    getProgressToNextMilestone
  } = useRewards();
  
  const fireScale = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const milestoneAnims = useRef([5, 10, 15, 20, 25, 30].map(() => new Animated.Value(0))).current;
  const streakTextAnim = useRef(new Animated.Value(1)).current;
  const milestoneTextOpacity = useRef(new Animated.Value(0)).current;
  const milestoneTextScale = useRef(new Animated.Value(0.5)).current;
  const [playConfetti, setPlayConfetti] = useState(false);
  
  // Enhanced animations
  const fireRotation = useRef(new Animated.Value(0)).current;
  const milestonePopAnimation = useRef(new Animated.Value(0)).current;
  const progressBarColor = useRef(new Animated.Value(0)).current;
  
  // Enhanced fire icon animation with rotation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fireScale, {
          toValue: 1.2,
          duration: 800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(fireScale, {
          toValue: 1,
          duration: 800,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
    
    // Add subtle rotation to fire icon
    Animated.loop(
  Animated.sequence([
    Animated.timing(fireRotation, {
      toValue: 0.05,
      duration: 1000,
      easing: Easing.sin, // Changed from Easing.inOut(Easing.sine) to Easing.sin
      useNativeDriver: true,
    }),
    Animated.timing(fireRotation, {
      toValue: -0.05,
      duration: 1000,
      easing: Easing.sin, // Changed from Easing.inOut(Easing.sine) to Easing.sin
      useNativeDriver: true,
    }),
  ])
).start();
  }, []);
  
  // Enhanced progress bar animation with color transition
  useEffect(() => {
    Animated.parallel([
      Animated.timing(progressAnim, {
        toValue: getProgressToNextMilestone(),
        duration: 1000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
      Animated.timing(progressBarColor, {
        toValue: Math.min(Math.floor(userRewards.streakCount / 10), MILESTONE_COLORS.length - 1),
        duration: 1000,
        useNativeDriver: false,
      })
    ]).start();
  }, [userRewards.streakCount]);
  
  // Milestone animations
  useEffect(() => {
    [5, 10, 15, 20, 25, 30].forEach((milestone, index) => {
      if (userRewards.streakCount >= milestone) {
        Animated.spring(milestoneAnims[index], {
          toValue: 1,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }).start();
      } else {
        milestoneAnims[index].setValue(0);
      }
    });
  }, [userRewards.streakCount]);
  
  // Enhanced streak milestone celebration animation
  useEffect(() => {
    if (animationStates.streakMilestone) {
      setPlayConfetti(true);
      
      // Trigger haptic feedback for milestone achievement
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      
      // Animate milestone pop
      Animated.spring(milestonePopAnimation, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }).start();
      
      // Animate streak text with spring physics
      Animated.sequence([
        Animated.spring(streakTextAnim, {
          toValue: 1.5,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.spring(streakTextAnim, {
          toValue: 1,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        })
      ]).start();
      
      // Animate milestone text
      Animated.sequence([
        Animated.timing(milestoneTextOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(milestoneTextScale, {
          toValue: 1.2,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(milestoneTextScale, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(2000),
        Animated.timing(milestoneTextOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        })
      ]).start(() => {
        resetAnimationState('streakMilestone');
      });
    }
  }, [animationStates.streakMilestone]);
  
  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });
  
  const progressColorInterpolation = progressBarColor.interpolate({
    inputRange: [...Array(MILESTONE_COLORS.length).keys()],
    outputRange: MILESTONE_COLORS,
  });
  
  const fireIconRotation = fireRotation.interpolate({
    inputRange: [-0.05, 0.05],
    outputRange: ['-5deg', '5deg'],
  });
  
  const nextMilestone = getNextMilestone();
  
  return (
    <View style={styles.container}>
      {/* Confetti animation overlay */}
      <View style={styles.confettiContainer}>
        <LottieView
          source={require('assets/animations/Confetti.json')}
          style={styles.confetti}
          autoPlay={playConfetti}
          loop={false}
          onAnimationFinish={() => setPlayConfetti(false)}
        />
      </View>
      
      {/* Milestone achievement text */}
      <Animated.View 
        style={[
          styles.milestoneAchievement,
          {
            opacity: milestoneTextOpacity,
            transform: [{ scale: milestoneTextScale }]
          }
        ]}
      >
        <Text style={styles.milestoneAchievementText}>
          {userRewards.streakCount} Day Streak Achieved!
        </Text>
        <Text style={styles.milestoneAchievementSubtext}>
          Keep up the great work!
        </Text>
      </Animated.View>
      
      <View style={styles.streakContainer}>
        <Animated.View style={{ 
          transform: [
            { scale: fireScale },
            { rotate: fireIconRotation }
          ] 
        }}>
          <Icon name="fire" size={28} color="#ff9800" />
        </Animated.View>
        <Animated.Text 
          style={[
            styles.streakText,
            { transform: [{ scale: streakTextAnim }] }
          ]}
        >
          {userRewards.streakCount} Day Streak
        </Animated.Text>
        
        {userRewards.streakFreeze > 0 && (
          <View style={styles.freezeContainer}>
            <Icon name="snowflake" size={16} color="#2196F3" />
            <Text style={styles.freezeText}>×{userRewards.streakFreeze}</Text>
          </View>
        )}
      </View>
      
      {/* Enhanced progress bar with color transition */}
      <View style={styles.progressContainer}>
        <Animated.View 
          style={[
            styles.progressBar, 
            { 
              width: progressWidth,
              backgroundColor: progressColorInterpolation
            }
          ]} 
        />
      </View>
      
      <View style={styles.milestoneContainer}>
        {[5, 10, 15, 20, 25, 30].map((milestone, index) => {
          const isAchieved = userRewards.streakCount >= milestone;
          const isCurrent = userRewards.streakCount < milestone && 
                           (index === 0 || userRewards.streakCount >= [5, 10, 15, 20, 25, 30][index-1]);
          
          return (
            <Animated.View 
              key={milestone}
              style={[
                styles.milestone, 
                isAchieved && styles.achievedMilestone,
                isCurrent && styles.currentMilestone,
                {
                  transform: [
                    { scale: milestoneAnims[index].interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [1, 1.3, 1]
                    }) }
                  ],
                  backgroundColor: isAchieved 
                    ? MILESTONE_COLORS[Math.min(index, MILESTONE_COLORS.length - 1)]
                    : '#f0f0f0'
                }
              ]}
            >
              <Text 
                style={[
                  styles.milestoneText, 
                  isAchieved && styles.achievedMilestoneText,
                  isCurrent && styles.currentMilestoneText
                ]}
              >
                {milestone}
              </Text>
              {isAchieved && (
                <Animated.View 
                  style={[
                    styles.checkmarkContainer,
                    { transform: [{ scale: isAchieved ? 1 : 0 }] }
                  ]}
                >
                  <Icon name="check" size={12} color="white" />
                </Animated.View>
              )}
            </Animated.View>
          );
        })}
      </View>
      
      {userRewards.streakCount > 0 && (
        <Animated.Text 
          style={[
            styles.streakMessage,
            { opacity: progressAnim }
          ]}
        >
          {userRewards.streakCount >= 30 
            ? "Amazing! You've reached a 30-day streak!" 
            : `Keep going! Next milestone: ${nextMilestone} days`
          }
        </Animated.Text>
      )}
      
      {/* Longest streak display */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Longest Streak</Text>
          <Text style={styles.statValue}>{userRewards.longestStreak} days</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Current Level</Text>
          <Text style={styles.statValue}>{userRewards.level}</Text>
        </View>
      </View>
      
      {/* Streak freeze explanation */}
      {userRewards.streakFreeze > 0 && (
        <TouchableOpacity style={styles.freezeInfoContainer}>
          <Icon name="information-outline" size={16} color="#2196F3" />
          <Text style={styles.freezeInfoText}>
            Streak Freeze protects your streak if you miss a day
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginVertical: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    overflow: 'hidden',
  },
  confettiContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    pointerEvents: 'none',
  },
  confetti: {
    width: '100%',
    height: '100%',
  },
  milestoneAchievement: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  milestoneAchievementText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF9800',
    textAlign: 'center',
    marginBottom: 8,
  },
  milestoneAchievementSubtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  streakText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333',
  },
  freezeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 'auto',
  },
  freezeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2196F3',
    marginLeft: 4,
  },
  progressContainer: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginBottom: 16,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  milestoneContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  milestone: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    overflow: 'visible',
  },
  achievedMilestone: {
    backgroundColor: '#ff9800',
    borderColor: '#e67e00',
    shadowColor: '#ff9800',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  currentMilestone: {
    borderColor: '#ff9800',
    borderWidth: 2,
  },
  milestoneText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  achievedMilestoneText: {
    color: 'white',
  },
  currentMilestoneText: {
    color: '#ff9800',
  },
  checkmarkContainer: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  streakMessage: {
    fontSize: 15,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
    marginTop: 4,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  freezeInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    padding: 8,
    borderRadius: 8,
    marginTop: 12,
  },
  freezeInfoText: {
    fontSize: 12,
    color: '#2196F3',
    marginLeft: 6,
    flex: 1,
  },
});

export default StreakCounter;