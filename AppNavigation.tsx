import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './screens/RegistrationScreen';
import LoginScreen from './screens/LoginScreen';
import ClientDashboard from './screens/ClientDashboard';
import ProfileScreen from './screens/ProfileScreen';
import CreateJobScreen from './screens/CreateJobScreen';
import JobListScreen from './screens/JobListScreen';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ClientDashboard" component={ClientDashboard} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="CreateJob" component={CreateJobScreen} />
        <Stack.Screen name="JobList" component={JobListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
