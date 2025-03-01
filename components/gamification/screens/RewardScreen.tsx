import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
// Import the required components
import AnimatedBadge from '../Components/AnimatedBadge';
import MilestoneCard from '../Components/MilestoneCard';
import { Badge } from '../types/gamification';  // Keep this import

interface Milestone {
  id: number;
  title: string;
  description: string;
  progress: number;
  target: number;
}

const RewardsScreen = () => {
  const [rewardsData, setRewardsData] = useState<{
    streakMilestones: Milestone[];
    badges: Badge[];
  }>({
    streakMilestones: [],
    badges: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch rewards data
    setTimeout(() => {
      setRewardsData({
        streakMilestones: [
          { id: 1, title: 'First Milestone', description: 'Complete your first streak', progress: 50, target: 100 },
          { id: 2, title: 'Second Milestone', description: 'Complete your second streak', progress: 25, target: 100 },
          { id: 3, title: 'Third Milestone', description: 'Complete your third streak', progress: 75, target: 100 },
        ],
        badges: [
          { 
            id: '1', 
            name: 'First Badge', 
            description: 'Your first badge', 
            icon: 'star', 
            isUnlocked: true, 
            unlockedAt: new Date()
          },
          { 
            id: '2', 
            name: 'Second Badge', 
            description: 'Your second badge', 
            icon: 'trophy', 
            isUnlocked: false
          },
        ]
      });
      setLoading(false);
    }, 1000);
  }, []);

  // Simple rendering without any FlatList or VirtualizedList
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading rewards data...</Text>
      </View>
    );
  }
  

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header section */}
        <View style={styles.headerSection}>
          <Text style={styles.mainTitle}>Your Rewards</Text>
        </View>
        
        {/* Badges Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Badges</Text>
          <View style={styles.badgesContainer}>
            {rewardsData.badges && rewardsData.badges.length > 0 ? (
              rewardsData.badges.map(badge => (
                <View key={badge.id} style={styles.badgeItem}>
                  <AnimatedBadge badge={badge} />
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>No badges available</Text>
            )}
          </View>
        </View>
        
        {/* Streak Milestones Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Streak Milestones</Text>
          {rewardsData.streakMilestones && rewardsData.streakMilestones.length > 0 ? (
            rewardsData.streakMilestones.map(milestone => (
              <View key={milestone.id.toString()} style={styles.milestoneContainer}>
                <MilestoneCard milestone={milestone} />
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No milestones available</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerSection: {
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  badgeItem: {
    width: '48%',
    marginBottom: 16,
  },
  milestoneContainer: {
    marginBottom: 12,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 10,
  },
});

export default RewardsScreen;