import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SeekerStack from '../Stack/SeekerStack';
import TabHeader from './components/TabHeader'
import Editprofile from '../../Screens/Editprofile';
import { MyContext } from '../../Store/Global'
import { useContext } from 'react';
import { MaterialIcons } from '@expo/vector-icons';



const Tab = createBottomTabNavigator();

function SeekerTab() {
    const { lang } = useContext(MyContext);
    return (
        <Tab.Navigator screenOptions={{ header: () => <TabHeader /> }} >
            <Tab.Screen name="seekerstack" options={{
                tabBarLabel: lang["tabs"]["Jobs"],
                tabBarLabelStyle: { fontFamily: 'Poppins-Medium' },
                tabBarIcon: ({ color, size }) => <MaterialIcons name="badge" size={size} color={color} />,
                tabBarActiveTintColor: '#1DBF73'
            }} component={SeekerStack} />

            <Tab.Screen name="Editprofile" options={{
                tabBarLabel: lang["tabs"]["Profile"],
                tabBarLabelStyle: { fontFamily: 'Poppins-Medium' },
                tabBarIcon: ({ color, size }) => <MaterialIcons name="person" size={size} color={color} />,
                tabBarActiveTintColor: '#1DBF73'
            }} component={Editprofile} />
        </Tab.Navigator>
    );
}

export default SeekerTab;