import React, { ReactNode } from 'react';
import { View, Text } from 'react-native';

export default function AppText({
    className,
    children,
}: {
    className?: string;
    children?: ReactNode;
}) {
    return (
        <View>
            <Text className={` ${className}`}>{children}</Text>
        </View>
    );
}
