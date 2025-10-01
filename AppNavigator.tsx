import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PasswordResetScreen from './PasswordResetScreen';
import PasswordConfirmScreen from './PasswordConfirmScreen';

// Import screens

// Define navigation types
export type RootStackParamList = {
  Splash: undefined;
  Access: undefined;
  Login: undefined;
  SignUp: undefined;
  PasswordReset: undefined;
  VerifyCode: { email?: string } | undefined;
  PasswordConfirm: undefined;
  Home: undefined;
  Dashboard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        
        <Stack.Screen
          name="PasswordReset"
          component={PasswordResetScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PasswordConfirm"
          component={PasswordConfirmScreen}
          options={{ headerShown: false }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
