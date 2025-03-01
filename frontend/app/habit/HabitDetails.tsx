import { Feather } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';

interface UserData {
    username: string;
    motto: string;
    profilePhoto: string;
}

interface HabitProfileHeaderProps {
    user?: UserData;
}

interface LocationInfo {
    city: string | null;
    region: string | null;
    isLive: boolean;
    lastUpdated: Date | null;
}

const HabitDetail: React.FC<HabitProfileHeaderProps> = ({ user }) => {
    const [location, setLocation] = useState<LocationInfo>({
        city: null,
        region: null,
        isLive: false,
        lastUpdated: null,
    });
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [locationLoading, setLocationLoading] = useState(false);

    const userData: UserData = user || {
        username: 'Prem Modha',
        motto: 'Building better habits, one day at a time',
        profilePhoto:
            'data:image/jpeg;base64,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',
    };

    const getLocation = async () => {
        if (locationLoading) return;
        setLocationLoading(true);
        setErrorMsg(null);

        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                Alert.alert(
                    'Location Permission Denied',
                    'Enable location permissions to use this feature.'
                );
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
            });

            const addressDetails = await Location.reverseGeocodeAsync({
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
            });

            if (addressDetails && addressDetails.length > 0) {
                const { city, region } = addressDetails[0];
                setLocation({
                    city: city || 'Unknown location',
                    region: region || '',
                    isLive: true,
                    lastUpdated: new Date(),
                });
            } else {
                setErrorMsg('Could not determine location.');
            }
        } catch (error: any) {
            setErrorMsg('Could not fetch location: ' + error?.message);
        } finally {
            setLocationLoading(false);
        }
    };

    useEffect(() => {
        getLocation();
    }, []);

    const getDisplayLocation = () => {
        if (errorMsg) return 'Location unavailable';
        if (locationLoading) return 'Getting location...';
        if (!location.city) return 'Unknown Location';
        return `${location.city}, ${location.region}`;
    };

    const formatTimeAgo = (date: Date | null) => {
        if (!date) return 'Never updated';
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
        if (diffInSeconds < 60) return 'just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        return `${Math.floor(diffInSeconds / 3600)}h ago`;
    };

    return (
        <>
            <Stack.Screen options={{ title: 'htest' }} />
            <ScrollView contentContainerStyle={styles.container}>
                {/* Card for Profile Photo, Name, and Motto */}
                <View style={styles.cardHorizontal}>
                    <Image source={{ uri: userData.profilePhoto }} style={styles.profilePhoto} />
                    <View style={styles.infoContainer}>
                        <Text style={styles.habitName}>{userData.username}</Text>
                        <Text style={styles.motto}>{userData.motto}</Text>
                    </View>
                </View>

                {/* Card for Location */}
                <View style={styles.card}>
                    <View style={styles.locationContainer}>
                        <Feather name="map-pin" size={20} color="#4f46e5" />
                        {locationLoading ? (
                            <ActivityIndicator size="small" color="#4f46e5" />
                        ) : (
                            <Text style={styles.locationText}>{getDisplayLocation()}</Text>
                        )}
                        {location.isLive && location.lastUpdated && (
                            <Text style={styles.updatedText}>
                                Updated {formatTimeAgo(location.lastUpdated)}
                            </Text>
                        )}
                    </View>
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f7ff',
        padding: 20,
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        width: '90%',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    cardHorizontal: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        width: '90%',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
        alignItems: 'center',
    },
    profilePhoto: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 16,
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    habitName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#4f46e5',
    },
    motto: {
        fontSize: 16,
        color: '#6b7280',
        marginTop: 4,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationText: {
        fontSize: 18,
        color: '#4f46e5',
        marginLeft: 10,
    },
    updatedText: {
        fontSize: 14,
        color: '#6b7280',
        marginLeft: 8,
    },
});

export default HabitDetail;
