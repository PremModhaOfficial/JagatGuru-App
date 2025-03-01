import { Stack } from 'expo-router/build/layouts/Stack';
import React from 'react';
import { View } from 'react-native';

import AppText from '../Individual/AppText';
import RoundedRect from '../Individual/RoundedRect';

export type PlayerCardProps = {
    name: string;
    moto: string;
    level: number;
};

export default function PlayerCard({ name, moto, level }: PlayerCardProps) {
    return (
        <View className="h-full bg-black">
            <Stack.Screen options={{ headerShown: false }} />
            <RoundedRect className="m-5 bg-white p-3">
                <RoundedRect className="z-10 bg-primary shadow shadow-purple-950 drop-shadow-2xl  backdrop-blur-3xl">
                    <AppText className="pl-3 pt-3 text-9xl text-black">{name}</AppText>
                    <AppText className="pl-3 text-3xl text-black">{moto}</AppText>
                    <View className="flex w-full flex-row justify-end">
                        <AppText className="m-3">{level}</AppText>
                    </View>
                </RoundedRect>
            </RoundedRect>
        </View>
    );
}
