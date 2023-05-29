import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '../../Screens/SignIn';
import SignUp from '../../Screens/SignUp';
import Forgetpass from '../../Screens/Forgetpass';
import { MyContext } from '../../Store/Global'
import SeekerTab from '../Tabs/SeekerTab'
import PosterTabs from '../Tabs/PosterTab';
import Header from './components/Header';


const Stack = createNativeStackNavigator();

function StackNav() {
    const { user } = React.useContext(MyContext);
    return (
        <Stack.Navigator screenOptions={{ header: () => <Header /> }}>
            {!user ? <Stack.Group>
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="Forgetpass" component={Forgetpass} />

            </Stack.Group> :
                user?.type === "employer" ?
                    <Stack.Screen options={{ headerShown: false }} name="Poster" component={PosterTabs} /> :
                    <Stack.Screen options={{ headerShown: false }} name="Seeker" component={SeekerTab} />
            }
        </Stack.Navigator>
    );
}

export default StackNav;
