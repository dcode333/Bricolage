import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../Screens/Seeker/Home'
import Jobs from '../../Screens/Seeker/Jobs'
import Apply from '../../Screens/Seeker/Apply'
import { MyContext } from '../../Store/Global'

const Stack = createNativeStackNavigator();

function SeekerStack() {
    const { user } = React.useContext(MyContext);
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="seekerhome" component={Home} />
            <Stack.Screen name="seekerjobs" component={Jobs} />
            <Stack.Screen name="seekerapply" component={Apply} />
        </Stack.Navigator>
    );
}

export default SeekerStack;
