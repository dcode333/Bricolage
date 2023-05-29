import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../Screens/Poster/Home'
import Editprofile from '../../Screens/Editprofile';
import TabHeader from './components/TabHeader'
import { MyContext } from '../../Store/Global'
import { useContext } from 'react';
import PosterStack from '../Stack/PosterStack'
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function PosterTabs() {
    const { lang } = useContext(MyContext);
    return (
        <Tab.Navigator screenOptions={{ header: () => <TabHeader /> }} >
            <Tab.Screen name="Home"
                options={{
                    tabBarLabel: lang["tabs"]["Post"],
                    tabBarLabelStyle: { fontFamily: 'Poppins-Medium' },
                    tabBarIcon: ({ color, size }) => <MaterialIcons name="add-to-photos" size={size} color={color} />,
                    tabBarActiveTintColor: '#1DBF73'
                }} component={Home} />
            <Tab.Screen name="Jobs" options={{
                tabBarLabel: lang["tabs"]["Jobs"],
                tabBarLabelStyle: { fontFamily: 'Poppins-Medium' },
                tabBarIcon: ({ color, size }) => <MaterialIcons name="badge" size={size} color={color} />,
                tabBarActiveTintColor: '#1DBF73'

            }} component={PosterStack} />
            <Tab.Screen name="EditprofilePoster" options={{
                tabBarLabel: lang["tabs"]["Profile"],
                tabBarLabelStyle: { fontFamily: 'Poppins-Medium' },
                tabBarIcon: ({ color, size }) => <MaterialIcons name="person" size={size} color={color} />,
                tabBarActiveTintColor: '#1DBF73'

            }} component={Editprofile} />
        </Tab.Navigator>
    );
}

export default PosterTabs;