import { Stack } from 'expo-router';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import { ScrollView, Text, View } from 'react-native';

import RoundedRect from '~/components/Individual/RoundedRect';

export default function page() {
    const { id } = useLocalSearchParams();

    return (
        <ScrollView className="bg-black">
            <Stack.Screen options={{ title: 'HabitDetails', headerShown: false }} />
            <Text className="text-6xl text-white">habitdetails {id}</Text>
            <RoundedRect className="m-5 bg-white">
                <RoundedRect className="m-5 rounded-lg bg-primary">
                    <View className="flex flex-row items-center justify-center p-2">
                        <View className="w-1/2">
                            <RoundedRect className=" h-5/6 rounded-lg border border-white bg-white p-5" />
                        </View>
                        <View className="w-1/2">
                            <Text className="m-2 from-black text-3xl">Why Do This Habit?</Text>
                            <Text className="m-2 from-black text-3xl">
                                maiores optio reprehenderit rerum error.
                            </Text>
                        </View>
                    </View>
                </RoundedRect>
            </RoundedRect>
        </ScrollView>
    );
}
