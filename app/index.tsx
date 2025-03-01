import { goBack, navigate } from 'expo-router/build/global-state/routing';
import { ScrollView, TouchableOpacity, View } from 'react-native';

import PlayerCard, { PlayerCardProps } from '~/components/Composite/PlayerCard';
import AppText from '~/components/Individual/AppText';
import SignUp from '~/components/Composite/Signup';
import LoginPage from '~/components/Composite/Login';
// import HabitTracker from '~/components/Composite/user_habit_traking'

const player: PlayerCardProps = {
    moto: 'Do The had work especialy when you dont feel like it',
    name: 'prem',
    level: 0,
};

export default function Home() {
    return (
        <View className="flex-1 bg-black">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {/* <PlayerCard {...player} /> */}
                <SignUp/>
                {/* <LoginPage/> */}
                {/* <HabitTracker/> */}
            </ScrollView>
            {/* my component call */}
            {/* <HomeButton /> */}
            {/*  */}
        </View>
    );
}

function HomeButton() {
    return (
        <View className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 transform">
            <TouchableOpacity className="rounded-full  bg-primary p-3">
                <View className="rounded-full bg-black p-2">
                    <View className="rounded-full bg-primary p-2">
                        <View className="rounded-full bg-black p-2">
                            <View className="rounded-full bg-primary p-2">
                                <View className="rounded-full bg-black p-2">
                                    <View className="rounded-full bg-primary p-2" />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}
