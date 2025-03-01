import { goBack, navigate } from 'expo-router/build/global-state/routing';
import { ScrollView, TouchableOpacity, View } from 'react-native';

import AppText from '~/components/Individual/AppText';
import SignUp from '~/components/Composite/Signup';

export default function SignUpPage() {
    return (
        <View className="flex-1 bg-black">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <SignUp />
                {/* </> */}
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
