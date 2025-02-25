import React from 'react';
import { TouchableOpacity, View } from 'react-native';

export default function HomeButton() {
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
