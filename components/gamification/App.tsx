import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RewardsProvider } from './contexts/RewardContext';
import ChallengesScreen from './screens/ChallengesScreen';
import RewardsScreen from './screens/RewardScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import StreakCounter from './Components/StreakCounter';
import BadgeUnlockModal from './Components/BadgeUnlockModal';
import LevelUpModal from './Components/LevelUpModal';
import { useRewards } from './contexts/RewardContext';
import { Badge } from './types/gamification';

const Tab = createBottomTabNavigator();

// GamificationWrapper component to handle modals
const GamificationWrapper = ({ children }: { children: React.ReactNode }) => {
  const { userRewards, animationStates, resetAnimationState } = useRewards();
  const [badgeModalVisible, setBadgeModalVisible] = React.useState(false);
  const [levelUpModalVisible, setLevelUpModalVisible] = React.useState(false);
  const [unlockedBadge, setUnlockedBadge] = React.useState<Badge | null>(null);
  
  // Handle badge unlock animation
  React.useEffect(() => {
    if (animationStates.badgeUnlocked) {
      const badge = userRewards.badges.find(b => b.id === animationStates.badgeUnlocked);
      if (badge) {
        setUnlockedBadge(badge);
        setBadgeModalVisible(true);
      }
    }
  }, [animationStates.badgeUnlocked]);
  
  // Handle level up animation
  React.useEffect(() => {
    if (animationStates.levelUp) {
      setLevelUpModalVisible(true);
    }
  }, [animationStates.levelUp]);
  
  const handleBadgeModalClose = () => {
    setBadgeModalVisible(false);
    resetAnimationState('badgeUnlocked');
  };
  
  const handleLevelUpModalClose = () => {
    setLevelUpModalVisible(false);
    resetAnimationState('levelUp');
  };
  
  return (
    <View style={styles.container}>
      {children}
      
      <BadgeUnlockModal
        visible={badgeModalVisible}
        badge={unlockedBadge}
        onClose={handleBadgeModalClose}
      />
      
      <LevelUpModal
        visible={levelUpModalVisible}
        level={userRewards.level}
        onClose={handleLevelUpModalClose}
      />
    </View>
  );
};

// Custom header component with StreakCounter
const CustomHeader = () => {
  return (
    <SafeAreaView edges={['top']} style={styles.headerContainer}>
      <StreakCounter />
    </SafeAreaView>
  );
};

// Main App component
const GamificationTabs = () => {
  return (
    <SafeAreaProvider>
      <RewardsProvider>
        
          <Tab.Navigator
            screenOptions={({ route }) => ({
              header: () => <CustomHeader />,
              tabBarIcon: ({ color, size }) => {
                let iconName;
                
                if (route.name === 'Challenges') {
                  iconName = 'trophy-outline';
                } else if (route.name === 'Rewards') {
                  iconName = 'medal-outline';
                } else if (route.name === 'Home') {
                  iconName = 'home-outline';
                } else if (route.name === 'Habits') {
                  iconName = 'checkbox-marked-circle-outline';
                }
                
                return <Icon name={iconName || 'help-circle-outline'} size={size} color={color} />;
              },
              tabBarActiveTintColor: '#6200EE',
              tabBarInactiveTintColor: '#757575',
              tabBarStyle: {
                elevation: 8,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                borderTopWidth: 0,
                paddingTop: 5,
                height: 60,
              },
              tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: '500',
                marginBottom: 5,
              },
            })}
          >
            <Tab.Screen 
              name="Challenges" 
              component={ChallengesScreen}
              options={{
                tabBarBadge: 3,
                tabBarBadgeStyle: { backgroundColor: '#E91E63' }
              }}
            />
            <Tab.Screen 
              name="Rewards" 
              component={RewardsScreen}
            />
          </Tab.Navigator>
        
      </RewardsProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  }
});

export default GamificationTabs;