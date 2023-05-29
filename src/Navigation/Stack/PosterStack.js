import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Bids from '../../Screens/Poster/Bids'
import Jobs from '../../Screens/Poster/Jobs'
import { MyContext } from '../../Store/Global'

const Stack = createNativeStackNavigator();

function PosterStack() {
    const { user } = React.useContext(MyContext);
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Jobpage" component={Jobs} />
            <Stack.Screen name="Bidspage" component={Bids} />
        </Stack.Navigator>
    );
}

export default PosterStack;
