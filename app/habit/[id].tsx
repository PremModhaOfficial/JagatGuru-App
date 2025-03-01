import { Stack } from 'expo-router';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import { ScrollView, Text } from 'react-native';

export default function page() {
    const { id } = useLocalSearchParams();

    return (
        <ScrollView className="bg-black">
            <Stack.Screen options={{ title: 'HabitDetails', headerShown: false }} />
            <Text className="text-6xl text-white">habitdetails {id}</Text>
        </ScrollView>
    );
}
