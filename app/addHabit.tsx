import Checkbox from 'expo-checkbox';
import * as Location from 'expo-location';
import { Stack } from 'expo-router';
import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

import RoundedRect from '~/components/Individual/RoundedRect';
import { RewardsProvider } from '~/components/gamification/contexts/RewardContext';

export default function AddHabit() {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [isLocationChecked, setIsLocationChecked] = useState(false);

    const rewards = useContext(RewardsProvider);

    const handleLocationCheckbox = async (checked: boolean) => {
        setIsLocationChecked(checked);
        if (checked) {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert(
                    'Permission Denied',
                    'Location permission is required to fetch coordinates.'
                );
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = currentLocation.coords;
            console.log('Coordinates:', latitude, longitude);
            setLocation(`Lat: ${latitude}, Lon: ${longitude}`);
        } else {
            setLocation('');
        }
    };

    const handleSubmit = () => {
        const data = {
            name,
            ...(location && { coordinates: location }),
            user: 5,
        };

        console.log(data);

        fetch('http://localhost:8000/api/auth/habit/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((error) => console.error('Error:', error));
    };

    return (
        <View className="flex-1 bg-[#f5f5f5] p-5">
            <Stack.Screen options={{ headerShown: false }} />
            <RoundedRect className="rounded-2xl bg-white p-5 shadow-md">
                <Text className="mb-2 text-lg font-bold text-[#333]">Name:</Text>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter your habit name"
                    className="mb-4 rounded-md bg-gray-100 p-3"
                />
                <View className="mb-4 flex-row items-center">
                    <Checkbox
                        value={isLocationChecked}
                        onValueChange={handleLocationCheckbox}
                        color={isLocationChecked ? '#4f46e5' : undefined}
                    />
                    <Text className="ml-2 text-lg text-[#333]">Use Current Location</Text>
                </View>
                <Text className="mb-2 text-lg font-bold text-[#333]">Location (optional):</Text>
                <TextInput
                    value={location}
                    onChangeText={setLocation}
                    placeholder="Enter your location"
                    className="mb-4 rounded-md bg-gray-100 p-3"
                />
                <Button title="Submit" onPress={handleSubmit} color="#4f46e5" />
            </RoundedRect>
        </View>
    );
}
