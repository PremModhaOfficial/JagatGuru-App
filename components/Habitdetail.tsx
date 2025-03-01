import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ActivityIndicator,
    Alert
} from 'react-native';
import * as Location from 'expo-location';
import { Feather } from '@expo/vector-icons';

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
        lastUpdated: null
    });
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [locationLoading, setLocationLoading] = useState(false);

    const userData: UserData = user || {
        username: "Prem Modha",
        motto: "Building better habits, one day at a time",
        profilePhoto: "https://www.example.com/photo.jpg",
    };

    const getLocation = async () => {
        if (locationLoading) return;
        setLocationLoading(true);
        setErrorMsg(null);

        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                Alert.alert("Location Permission Denied", "Enable location permissions to use this feature.");
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
            });

            let addressDetails = await Location.reverseGeocodeAsync({
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
            });

            if (addressDetails && addressDetails.length > 0) {
                const { city, region } = addressDetails[0];
                setLocation({
                    city: city || 'Unknown location',
                    region: region || '',
                    isLive: true,
                    lastUpdated: new Date()
                });
            } else {
                setErrorMsg("Could not determine location.");
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
        if (!date) return "Never updated";
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
        if (diffInSeconds < 60) return 'just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        return `${Math.floor(diffInSeconds / 3600)}h ago`;
    };

    return (
        <View style={styles.container}>
            {/* Card for Profile Photo */}
            <View style={styles.card}>
                <Image source={{ uri: userData.profilePhoto }} style={styles.profilePhoto} />
            </View>

            {/* Card for Name */}
            <View style={styles.card}>
                <Text style={styles.habitName}>{userData.username}</Text>
            </View>

            {/* Card for Motto */}
            <View style={styles.card}>
                <Text style={styles.motto}>{userData.motto}</Text>
            </View>

            {/* Card for Location */}
            <View style={styles.card}>
                <View style={styles.locationContainer}>
                    <Feather name="map-pin" size={14} color="#4f46e5" />
                    {locationLoading ? (
                        <ActivityIndicator size="small" color="#4f46e5" />
                    ) : (
                        <Text style={styles.locationText}>{getDisplayLocation()}</Text>
                    )}
                    {location.isLive && location.lastUpdated && (
                        <Text style={styles.updatedText}>Updated {formatTimeAgo(location.lastUpdated)}</Text>
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eef2ff',
        padding: 16,
        borderRadius: 12,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    profilePhoto: {
        width: 100,
        height: 100,
        borderRadius: 12,
    },
    habitName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#312e81',
    },
    motto: {
        fontSize: 16,
        color: '#6b7280',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationText: {
        fontSize: 16,
        color: '#4f46e5',
        marginLeft: 8,
    },
    updatedText: {
        fontSize: 12,
        color: '#6b7280',
        marginLeft: 8,
    },
});

export default HabitDetail;
