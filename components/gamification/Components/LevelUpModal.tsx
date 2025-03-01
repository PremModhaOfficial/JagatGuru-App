import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  Animated, 
  Easing,
  Dimensions 
} from 'react-native';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Haptics from 'expo-haptics';

interface LevelUpModalProps {
  visible: boolean;
  level: number;
  onClose: () => void;
}

const { width, height } = Dimensions.get('window');

const LevelUpModal = ({ visible, level, onClose }: LevelUpModalProps) => {
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const levelNumberAnim = useRef(new Animated.Value(0)).current;
  const textSlideAnim = useRef(new Animated.Value(50)).current;
  const textOpacityAnim = useRef(new Animated.Value(0)).current;
  const buttonSlideAnim = useRef(new Animated.Value(50)).current;
  const buttonOpacityAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    if (visible) {
      // Trigger haptic feedback
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      
      // Reset animations
      scaleAnim.setValue(0.5);
      rotateAnim.setValue(0);
      levelNumberAnim.setValue(0);
      textSlideAnim.setValue(50);
      textOpacityAnim.setValue(0);
      buttonSlideAnim.setValue(50);
      buttonOpacityAnim.setValue(0);
      
      // Start animations
      Animated.sequence([
        // Level badge entrance animation
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
        
        // Level number animation
        Animated.timing(levelNumberAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        
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
  }, [visible, level]);
  
  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  
  const levelNumberScale = levelNumberAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1.5, 1],
  });
  
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.confettiContainer}>
            <LottieView
              source={require('assets/animations/level_up_modal.json')}
              style={styles.confetti}
              autoPlay
              loop={false}
            />
          </View>
          
          <Text style={styles.congratsText}>Level Up!</Text>
          
          <Animated.View 
            style={[
              styles.levelBadgeContainer,
              {
                transform: [
                  { scale: scaleAnim },
                  { rotate: rotate }
                ]
              }
            ]}
          >
            <View style={styles.levelBadge}>
              <Animated.Text 
                style={[
                  styles.levelNumber,
                  { transform: [{ scale: levelNumberScale }] }
                ]}
              >
                {level}
              </Animated.Text>
            </View>
          </Animated.View>
          
          <Animated.View
            style={{
              transform: [{ translateY: textSlideAnim }],
              opacity: textOpacityAnim,
            }}
          >
            <Text style={styles.levelUpText}>
              You've reached level {level}!
            </Text>
            <Text style={styles.rewardText}>
              You've unlocked new challenges and rewards!
            </Text>
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
              <Text style={styles.closeButtonText}>Continue</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6200EE',
    marginBottom: 24,
    textAlign: 'center',
  },
  levelBadgeContainer: {
    marginBottom: 24,
  },
  levelBadge: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#6200EE',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#9D46FF',
    elevation: 8,
    shadowColor: '#6200EE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  levelNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
  },
  levelUpText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  rewardText: {
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

export default LevelUpModal;