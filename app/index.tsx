import { ScrollView, View } from 'react-native';

import HomeButton from '~/components/Composite/HomeButton';
import PlayerCard, { PlayerCardProps } from '~/components/Composite/PlayerCard';

const player: PlayerCardProps = {
    moto: 'Do The had work especialy when you dont feel like it',
    name: 'prem',
    level: 0,
};

export default function Home() {
    return (
        <View className="flex-1 bg-black">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <PlayerCard {...player} />
            </ScrollView>
            <HomeButton />
        </View>
    );
}
