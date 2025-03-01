import { Link } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

import ProggressBar from './ProggressBar';

export default function HabitProgress() {
    return (
        <View>
            <Link
                href={{
                    pathname: '/habit/[id]',
                    params: { id: 1 },
                }}>
                <Text className="m-1 text-white">Habit Name</Text>
                <View>
                    <ProggressBar progress={100} />
                </View>
            </Link>
        </View>
    );
}
