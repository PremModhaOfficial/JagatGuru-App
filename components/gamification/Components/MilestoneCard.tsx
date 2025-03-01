import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Progress from 'react-native-progress';

interface MilestoneProps {
  milestone: {
    id: number;
    title: string;
    description: string;
    progress: number;
    target: number;
    isCompleted?: boolean;
    reward?: string;
  };
  onPress?: () => void;
}

const MilestoneCard = ({ milestone, onPress }: MilestoneProps) => {
  const progressPercentage = milestone.progress / milestone.target;
  const isCompleted = milestone.isCompleted || progressPercentage >= 1;
  
  return (
    <TouchableOpacity 
      style={[
        styles.container,
        isCompleted && styles.completedContainer
      ]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Status icon */}
      <View style={[
        styles.iconContainer,
        isCompleted ? styles.completedIcon : styles.pendingIcon
      ]}>
        <Icon 
          name={isCompleted ? 'check-circle' : 'timer-sand'} 
          size={24} 
          color={isCompleted ? '#4CAF50' : '#FFC107'} 
        />
      </View>
      
      {/* Milestone details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{milestone.title}</Text>
        <Text style={styles.description}>{milestone.description}</Text>
        
        {/* Progress bar */}
        <View style={styles.progressContainer}>
          <Progress.Bar 
            progress={progressPercentage} 
            width={null} 
            height={8}
            color={isCompleted ? '#4CAF50' : '#2196F3'}
            unfilledColor="#E0E0E0"
            borderWidth={0}
            borderRadius={4}
          />
          <Text style={styles.progressText}>
            {milestone.progress} / {milestone.target}
          </Text>
        </View>
        
        {/* Reward info if available */}
        {milestone.reward && (
          <View style={styles.rewardContainer}>
            <Icon name="gift" size={16} color="#9C27B0" />
            <Text style={styles.rewardText}>Reward: {milestone.reward}</Text>
          </View>
        )}
      </View>
      
      {/* Completed badge */}
      {isCompleted && (
        <View style={styles.completedBadge}>
          <Text style={styles.completedText}>COMPLETED</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    position: 'relative',
    overflow: 'hidden',
  },
  completedContainer: {
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  completedIcon: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  pendingIcon: {
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  progressContainer: {
    marginBottom: 8,
  },
  progressText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    textAlign: 'right',
  },
  rewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardText: {
    fontSize: 12,
    color: '#9C27B0',
    marginLeft: 4,
  },
  completedBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderBottomLeftRadius: 8,
  },
  completedText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default MilestoneCard; 