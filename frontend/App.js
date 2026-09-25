import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import AdminPortal from './src/screens/AdminPortal';
import LandingScreen from './src/screens/LandingScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import UserPortal from './src/screens/UserPortal';

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const userStr = await AsyncStorage.getItem('user');
        
        if (token && userStr) {
          const user = JSON.parse(userStr);
          if (user.role === 'admin') {
            setInitialRoute('AdminPortal');
          } else {
            setInitialRoute('UserPortal');
          }
        } else {
          setInitialRoute('Landing');
        }
      } catch (e) {
        setInitialRoute('Landing');
      }
    };
    checkSession();
  }, []);

  if (!initialRoute) {
    return (
      <View style={{ flex: 1, backgroundColor: '#0B1020', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color="#8B5CF6" size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="UserPortal" component={UserPortal} options={{ headerShown: false }} />
        <Stack.Screen name="AdminPortal" component={AdminPortal} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
