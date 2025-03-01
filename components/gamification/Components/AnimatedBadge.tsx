import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Badge } from '../types/gamification';
import LottieView from 'lottie-react-native';

interface AnimatedBadgeProps {
  badge: Badge;
  isNew?: boolean;
  onPress?: () => void;
}

const AnimatedBadge = ({ badge, isNew = false, onPress }: AnimatedBadgeProps) => {
  const scaleAnim = useRef(new Animated.Value(isNew ? 0.5 : 1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const lottieRef = useRef<LottieView>(null);
  
  useEffect(() => {
    if (isNew) {
      // Entrance animation for new badges
      Animated.sequence([
        Animated.spring(scaleAnim, {
          toValue: 1.2,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        })
      ]).start();
      
      // Rotation animation for new badges
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
      
      // Play the lottie animation
      if (lottieRef.current) {
        lottieRef.current.play();
      }
    }
    
    // Glow animation for unlocked badges
    if (badge.isUnlocked) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 1500,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: false,
          }),
          Animated.timing(glowAnim, {
            
            toValue: 0,
            duration: 1500,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: false,
          })
        ])
      ).start();
    }
  }, [isNew, badge.isUnlocked]);
  
  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  
  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5],
  });
  
  const glowSize = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.15],
  });
  
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Glow effect for unlocked badges */}
      {badge.isUnlocked && (
        <Animated.View 
          style={[
            styles.glow,
            {
              opacity: glowOpacity,
              transform: [{ scale: glowSize }]
            }
          ]}
        />
      )}
      
      {/* Badge icon with animations */}
      <Animated.View 
        style={[
          styles.iconContainer,
          badge.isUnlocked ? styles.unlockedIcon : styles.lockedIcon,
          {
            transform: [
              { scale: scaleAnim },
              { rotate: rotate }
            ]
          }
        ]}
      >
        <Icon 
          name={badge.isUnlocked ? badge.icon : 'lock'} 
          size={36} 
          color={badge.isUnlocked ? '#FFC107' : '#BDBDBD'} 
        />
      </Animated.View>
      
      {/* Badge details */}
      <View style={styles.detailsContainer}>
        <Text style={[
          styles.name,
          !badge.isUnlocked && styles.lockedText
        ]}>
          {badge.isUnlocked ? badge.name : 'Locked Badge'}
        </Text>
        
        <Text style={[
          styles.description,
          !badge.isUnlocked && styles.lockedText
        ]}>
          {badge.isUnlocked ? badge.description : 'Keep going to unlock this badge!'}
        </Text>
        
        {badge.unlockedAt && (
          <Text style={styles.date}>
            Unlocked on {new Date(badge.unlockedAt).toLocaleDateString()}
          </Text>
        )}
      </View>
      
      {/* Celebration animation for new badges */}
      {isNew && (
        <View style={styles.lottieContainer}>
          <LottieView
            ref={lottieRef}
            source={require('assets/animations/badge_unlock.json')}
            style={styles.lottie}
            loop={false}
            autoPlay={false}
          />
        </View>
      )}
      
      {/* New badge indicator */}
      {isNew && (
        <View style={styles.newBadge}>
          <Text style={styles.newBadgeText}>NEW</Text>
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
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    position: 'relative',
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFC107',
    borderRadius: 12,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  unlockedIcon: {
    backgroundColor: 'rgba(255, 193, 7, 0.2)',
    borderWidth: 2,
    borderColor: '#FFC107',
  },
  lockedIcon: {
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  lockedText: {
    color: '#BDBDBD',
  },
  lottieContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  lottie: {
    width: 200,
    height: 200,
  },
  newBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderBottomLeftRadius: 8,
  },
  newBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default AnimatedBadge;