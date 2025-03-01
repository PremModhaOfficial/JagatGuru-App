import { ScrollView, View } from 'react-native';

import HabitProgress from '~/components/Composite/HabitProgress';
import HomeButton from '~/components/Composite/HomeButton';
import PlayerCard, { PlayerCardProps } from '~/components/Composite/PlayerCard';
import ProggressBar from '~/components/Composite/ProggressBar';

const player: PlayerCardProps = {
    moto: 'Do The had work especialy when you dont feel like it',
    name: 'prem',
    level: 0,
};

export default function Home() {
    return (
        <View className="flex-1 bg-black">
            <View className="border border-dashed border-fuchsia-600 p-5">
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <PlayerCard {...player} />
                </ScrollView>
            </View>
            <View className="border border-dashed  p-5">
                <ProggressBar progress={20} />
            </View>
            <View className="border border-dashed border-fuchsia-600 p-5">
                <HabitProgress />
            </View>
            <View className="border border-dashed border-fuchsia-600 p-5">
                <HabitProgress />
            </View>
            <HomeButton />
        </View>
    );
}
