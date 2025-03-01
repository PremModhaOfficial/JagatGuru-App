import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  Animated, 
  Dimensions 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LottieView from 'lottie-react-native';
import { Badge } from '../types/gamification';
import * as Haptics from 'expo-haptics';

interface BadgeUnlockModalProps {
  visible: boolean;
  badge: Badge | null;
  onClose: () => void;
}

const { width, height } = Dimensions.get('window');

const BadgeUnlockModal = ({ visible, badge, onClose }: BadgeUnlockModalProps) => {
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const textSlideAnim = useRef(new Animated.Value(50)).current;
  const textOpacityAnim = useRef(new Animated.Value(0)).current;
  const buttonSlideAnim = useRef(new Animated.Value(50)).current;
  const buttonOpacityAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    if (visible && badge) {
      // Trigger haptic feedback
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      
      // Reset animations
      scaleAnim.setValue(0.5);
      opacityAnim.setValue(0);
      rotateAnim.setValue(0);
      textSlideAnim.setValue(50);
      textOpacityAnim.setValue(0);
      buttonSlideAnim.setValue(50);
      buttonOpacityAnim.setValue(0);
      
      // Start animations
      Animated.sequence([
        // Fade in modal
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        
        // Badge entrance animation
        Animated.parallel([
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 5,
            tension: 40,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
        
        // Text entrance animation
        Animated.parallel([
          Animated.timing(textSlideAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(textOpacityAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
        
        // Button entrance animation
        Animated.parallel([
          Animated.timing(buttonSlideAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(buttonOpacityAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    }
  }, [visible, badge]);
  
  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  
  if (!badge) return null;
  
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <Animated.View 
          style={[
            styles.modalContainer,
            { opacity: opacityAnim }
          ]}
        >
          <View style={styles.confettiContainer}>
            <LottieView
              source={require('assets/animations/badge_unlock.json')}
              style={styles.confetti}
              autoPlay
              loop={false}
            />
          </View>
          
          <Text style={styles.congratsText}>Congratulations!</Text>
          <Text style={styles.unlockText}>You've unlocked a new badge</Text>
          
          <Animated.View 
            style={[
              styles.badgeContainer,
              {
                transform: [
                  { scale: scaleAnim },
                  { rotate: rotate }
                ]
              }
            ]}
          >
            <View style={styles.badgeIconContainer}>
              <Icon name={badge.icon} size={80} color="#FFC107" />
            </View>
          </Animated.View>
          
          <Animated.View
            style={{
              transform: [{ translateY: textSlideAnim }],
              opacity: textOpacityAnim,
            }}
          >
            <Text style={styles.badgeName}>{badge.name}</Text>
            <Text style={styles.badgeDescription}>{badge.description}</Text>
          </Animated.View>
          
          <Animated.View
            style={{
              transform: [{ translateY: buttonSlideAnim }],
              opacity: buttonOpacityAnim,
              width: '100%',
            }}
          >
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={onClose}
            >
              <Text style={styles.closeButtonText}>Awesome!</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.85,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  confettiContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    pointerEvents: 'none',
  },
  confetti: {
    width: '100%',
    height: '100%',
  },
  congratsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  unlockText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  badgeContainer: {
    marginBottom: 24,
  },
  badgeIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 193, 7, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFC107',
  },
  badgeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  badgeDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BadgeUnlockModal;