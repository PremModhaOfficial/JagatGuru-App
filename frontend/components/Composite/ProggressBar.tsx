import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function ProggressBar({ progress }: { progress: number }) {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#000000', '#11ce00']} // Define your gradient colors here
                start={{ x: 0.0, y: 1 }}
                style={[styles.gradient, { width: `${progress}%` }]}>
                <View style={styles.overlay} className="border border-l-black border-r-rose-500">
                    <View className="p-52" />
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 20,
        borderRadius: 10,
        overflow: 'hidden',
    },
    gradient: {
        flex: 1,
        borderRadius: 10,
    },
    overlay: {
        flex: 1,
        borderWidth: 2,
        borderColor: 'transparent',
        borderRadius: 10,
        backgroundColor: 'transparent',
    },
});
