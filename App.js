import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import SafeAreaInsets from './src/utils/SafeAreaInsets';
import { Global } from './src/Store/Global'
import Stack from './src/Navigation/Stack/StackNav'


export default function App() {

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
  });

  if (!fontsLoaded) { return <ActivityIndicator />;}
  

  return (
    <SafeAreaProvider>
      <Global>
        <NavigationContainer >
          <SafeAreaInsets >
            <Stack />
          </SafeAreaInsets>
        </NavigationContainer>
      </Global>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'tomato',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
