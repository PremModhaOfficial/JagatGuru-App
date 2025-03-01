import { Link } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

import ProggressBar from './ProggressBar';

export default function HabitProgress({ id }: { id: string }) {
    const habit = {
        id,
        name: 'Meditae At the Park',
    };
    return (
        <View>
            <Link
                href={{
                    pathname: '/habit/[id]',
                    params: { id },
                }}>
                <Text className="m-1 text-white">{habit.name}</Text>
                <View>
                    <ProggressBar progress={10} />
                </View>
            </Link>
        </View>
    );
}
