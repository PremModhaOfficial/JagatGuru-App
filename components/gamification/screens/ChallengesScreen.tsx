import LottieView from 'lottie-react-native';
import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Animated,
    Easing,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useRewards } from '../contexts/RewardContext';
import { fetchChallenges } from '../services/ChallangesService';
import { Challenge } from '../types/gamification';

const { width } = Dimensions.get('window');

// Add a type property to the Challenge interface or extend it here
interface ExtendedChallenge extends Challenge {
    type: 'daily' | 'weekly' | 'monthly';
}

const ChallengesScreen = () => {
    const { userRewards, joinChallenge } = useRewards();
    const [availableChallenges, setAvailableChallenges] = useState<ExtendedChallenge[]>([]);
    const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('daily');
    const [loading, setLoading] = useState(true);
    const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);

    // Animation refs
    const tabIndicatorAnim = useRef(new Animated.Value(0)).current;
    const listItemAnims = useRef<Animated.Value[]>([]);
    const loadingAnim = useRef(new Animated.Value(1)).current;
    const contentAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const loadChallenges = async () => {
            setLoading(true);
            try {
                // This would fetch from your API or local data
                const challenges = await fetchChallenges();
                // Add type property if it doesn't exist in your data
                const extendedChallenges = challenges.map((challenge) => ({
                    ...challenge,
                    type: challenge.type || 'daily', // Default to daily if not specified
                })) as ExtendedChallenge[];

                setAvailableChallenges(extendedChallenges);

                // Initialize animation values for each challenge
                listItemAnims.current = extendedChallenges.map(() => new Animated.Value(0));
            } catch (error) {
                console.error('Failed to load challenges:', error);
            } finally {
                // Animate loading to content transition
                Animated.sequence([
                    Animated.timing(loadingAnim, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.timing(contentAnim, {
                        toValue: 1,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                ]).start(() => {
                    setLoading(false);
                    // Animate list items sequentially
                    animateListItems();
                });
            }
        };

        loadChallenges();
    }, []);

    // Animate tab indicator
    useEffect(() => {
        let tabPosition = 0;
        switch (activeTab) {
            case 'daily':
                tabPosition = 0;
                break;
            case 'weekly':
                tabPosition = 1;
                break;
            case 'monthly':
                tabPosition = 2;
                break;
        }

        Animated.spring(tabIndicatorAnim, {
            toValue: tabPosition,
            friction: 8,
            tension: 50,
            useNativeDriver: true,
        }).start();

        // Animate list items when tab changes
        animateListItems();
    }, [activeTab]);

    const animateListItems = () => {
        // Reset animations
        listItemAnims.current.forEach((anim) => anim.setValue(0));

        // Animate each item with a staggered delay
        listItemAnims.current.forEach((anim, index) => {
            Animated.timing(anim, {
                toValue: 1,
                duration: 400,
                delay: index * 100,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }).start();
        });
    };

    const filteredChallenges = availableChallenges.filter(
        (challenge) => challenge.type === activeTab
    );

    const handleJoinChallenge = (challenge: ExtendedChallenge) => {
        setSelectedChallenge(challenge.id);

        // Simulate a delay for the animation
        setTimeout(() => {
            // Convert back to regular Challenge type when joining
            const { type, ...regularChallenge } = challenge;
            joinChallenge(regularChallenge as Challenge);
            setSelectedChallenge(null);
        }, 1500);
    };

    const renderChallengeItem = ({ item, index }: { item: ExtendedChallenge; index: number }) => {
        const isJoined = userRewards.currentChallenges.some((c) => c.id === item.id);
        const isCompleted = userRewards.completedChallenges.includes(item.id);
        const isSelected = selectedChallenge === item.id;

        // Get the animation value for this item
        const animValue = listItemAnims.current[index] || new Animated.Value(1);

        return (
            <Animated.View
                style={[
                    styles.challengeCard,
                    {
                        opacity: animValue,
                        transform: [
                            {
                                translateY: animValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [50, 0],
                                }),
                            },
                        ],
                    },
                ]}>
                <View style={styles.challengeHeader}>
                    <View style={styles.challengeTitleContainer}>
                        <Text style={styles.challengeTitle}>{item.name}</Text>
                        <View
                            style={[
                                styles.challengeTypeBadge,
                                item.type === 'daily' && styles.dailyBadge,
                                item.type === 'weekly' && styles.weeklyBadge,
                                item.type === 'monthly' && styles.monthlyBadge,
                            ]}>
                            <Text style={styles.challengeTypeText}>{item.type}</Text>
                        </View>
                    </View>

                    {item.badgeReward && (
                        <View style={styles.badgeRewardContainer}>
                            <Icon name="medal" size={16} color="#FFC107" />
                            <Text style={styles.badgeRewardText}>Badge Reward</Text>
                        </View>
                    )}
                </View>

                <Text style={styles.challengeDescription}>{item.description}</Text>

                <View style={styles.rewardContainer}>
                    <Icon name="star" size={18} color="#FFC107" />
                    <Text style={styles.challengeReward}>{item.pointsReward} points</Text>
                </View>

                {isCompleted ? (
                    <View style={styles.completedBadge}>
                        <Icon
                            name="check-circle"
                            size={18}
                            color="white"
                            style={styles.completedIcon}
                        />
                        <Text style={styles.completedText}>Completed</Text>
                    </View>
                ) : isJoined ? (
                    <View style={styles.progressContainer}>
                        <View style={styles.progressBarContainer}>
                            <View
                                style={[
                                    styles.progressBar,
                                    {
                                        width: `${userRewards.currentChallenges.find((c) => c.id === item.id)?.progress || 0}%`,
                                    },
                                ]}
                            />
                        </View>
                        <Text style={styles.progressText}>
                            {userRewards.currentChallenges.find((c) => c.id === item.id)
                                ?.progress || 0}
                            %
                        </Text>
                    </View>
                ) : (
                    <TouchableOpacity
                        style={[styles.joinButton, isSelected && styles.joiningButton]}
                        onPress={() => handleJoinChallenge(item)}
                        disabled={isSelected}>
                        {isSelected ? (
                            <View style={styles.joiningContainer}>
                                <LottieView
                                    source={require('assets/animations/challenge_joining.json')}
                                    style={styles.loadingAnimation}
                                    autoPlay
                                    loop
                                />
                                <Text style={styles.joiningText}>Joining...</Text>
                            </View>
                        ) : (
                            <>
                                <Icon
                                    name="plus-circle"
                                    size={18}
                                    color="white"
                                    style={styles.joinIcon}
                                />
                                <Text style={styles.joinButtonText}>Join Challenge</Text>
                            </>
                        )}
                    </TouchableOpacity>
                )}
            </Animated.View>
        );
    };

    const tabIndicatorPosition = tabIndicatorAnim.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [0, width / 3, (width / 3) * 2],
    });

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Challenges</Text>

            <View style={styles.tabContainer}>
                <TouchableOpacity style={styles.tab} onPress={() => setActiveTab('daily')}>
                    <Text style={[styles.tabText, activeTab === 'daily' && styles.activeTabText]}>
                        Daily
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab} onPress={() => setActiveTab('weekly')}>
                    <Text style={[styles.tabText, activeTab === 'weekly' && styles.activeTabText]}>
                        Weekly
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab} onPress={() => setActiveTab('monthly')}>
                    <Text style={[styles.tabText, activeTab === 'monthly' && styles.activeTabText]}>
                        Monthly
                    </Text>
                </TouchableOpacity>

                <Animated.View
                    style={[
                        styles.tabIndicator,
                        { transform: [{ translateX: tabIndicatorPosition }] },
                    ]}
                />
            </View>

            {loading ? (
                <Animated.View style={[styles.loadingContainer, { opacity: loadingAnim }]}>
                    <LottieView
                        source={require('assets/animations/loading_challenges.json')}
                        style={styles.loadingAnimation}
                        autoPlay
                        loop
                    />
                    <Text style={styles.loadingText}>Loading challenges...</Text>
                </Animated.View>
            ) : filteredChallenges.length > 0 ? (
                <Animated.View style={{ opacity: contentAnim, flex: 1 }}>
                    <FlatList
                        data={filteredChallenges}
                        renderItem={renderChallengeItem}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.listContainer}
                    />
                </Animated.View>
            ) : (
                <Animated.View style={[styles.emptyContainer, { opacity: contentAnim }]}>
                    <LottieView
                        source={require('assets/animations/empty_challenges.json')}
                        style={styles.emptyAnimation}
                        autoPlay
                        loop
                    />
                    <Text style={styles.emptyText}>No {activeTab} challenges available</Text>
                    <Text style={styles.emptySubtext}>Check back later for new challenges</Text>
                </Animated.View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
    },
    tabContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        borderRadius: 8,
        backgroundColor: 'white',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        position: 'relative',
        overflow: 'hidden',
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
    },
    tabText: {
        fontWeight: '500',
        color: '#666',
    },
    activeTabText: {
        color: '#6200ee',
        fontWeight: 'bold',
    },
    tabIndicator: {
        position: 'absolute',
        bottom: 0,
        height: 3,
        width: width / 3,
        backgroundColor: '#6200ee',
        borderRadius: 3,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingAnimation: {
        width: 100,
        height: 100,
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#666',
    },
    listContainer: {
        paddingBottom: 20,
    },
    challengeCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    challengeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    challengeTitleContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    challengeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginRight: 8,
    },
    challengeTypeBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
        marginBottom: 4,
    },
    dailyBadge: {
        backgroundColor: 'rgba(33, 150, 243, 0.1)',
    },
    weeklyBadge: {
        backgroundColor: 'rgba(156, 39, 176, 0.1)',
    },
    monthlyBadge: {
        backgroundColor: 'rgba(233, 30, 99, 0.1)',
    },
    challengeTypeText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#6200ee',
        textTransform: 'uppercase',
    },
    challengeDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
        lineHeight: 20,
    },
    rewardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    challengeReward: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6200ee',
        marginLeft: 6,
    },
    badgeRewardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 193, 7, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    badgeRewardText: {
        fontSize: 12,
        color: '#FFC107',
        marginLeft: 4,
        fontWeight: '500',
    },
    joinButton: {
        backgroundColor: '#6200ee',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    joinIcon: {
        marginRight: 8,
    },
    joinButtonText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16,
    },
    joiningButton: {
        backgroundColor: '#9D46FF',
    },
    joiningContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    joiningText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16,
    },
    progressContainer: {
        marginTop: 4,
    },
    progressBarContainer: {
        height: 8,
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 4,
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#4caf50',
        borderRadius: 4,
    },
    progressText: {
        fontSize: 12,
        color: '#666',
        textAlign: 'right',
    },
    completedBadge: {
        backgroundColor: '#4caf50',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    completedIcon: {
        marginRight: 8,
    },
    completedText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 40,
    },
    emptyAnimation: {
        width: 200,
        height: 200,
    },
    emptyText: {
        marginTop: 16,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#666',
    },
    emptySubtext: {
        fontSize: 14,
        color: '#999',
        marginTop: 8,
    },
});

export default ChallengesScreen;

