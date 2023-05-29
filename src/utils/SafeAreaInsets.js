import { View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SafeAreaInsets = ({ children }) => {
    const insets = useSafeAreaInsets();
    return (
        <View style={{ flex: 1, /*marginTop: insets.top*/ }} >
            {children}
        </View>
    )
}

export default SafeAreaInsets