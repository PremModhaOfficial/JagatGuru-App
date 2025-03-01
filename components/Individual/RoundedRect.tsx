// import React, { ReactNode } from 'react';
// import { View } from 'react-native';

// const RoundedRect = ({ children, className }: { children: ReactNode; className: string }) => {
//     return <View className={`rounded-3xl ${className}`}>{children}</View>;
// };

// export default RoundedRect;
// import React from 'react';
// import { Pressable, View } from 'react-native';

// export default function RoundedRect({ children, className, onPress }) {
//     return (
//         <Pressable onPress={onPress}>
//             <View className={className}>{children}</View>
//         </Pressable>
//     );
// }
import React, { ReactNode } from 'react';
import { View, Pressable } from 'react-native';

const RoundedRect = ({ children, className, onPress }: { children: ReactNode; className: string; onPress?: () => void }) => {
    return (
        <Pressable onPress={onPress}>
            <View className={`rounded-3xl ${className}`}>{children}</View>
        </Pressable>
    );
};

export default RoundedRect;
