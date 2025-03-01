import React, { ReactNode } from 'react';
import { View } from 'react-native';

const RoundedRect = ({ children, className }: { children?: ReactNode; className: string }) => {
    return <View className={`rounded-3xl ${className}`}>{children}</View>;
};

export default RoundedRect;
