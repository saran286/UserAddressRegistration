import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Registration from './screens/Registration';
import GetAddress from './screens/GetAddress';
import AddressList from './screens/AddressList';

type RootStackParamList = {
  Registration: undefined;
  GetAddress: { username: string ,password:string};
  AddressList: undefined;
};

const Stack:any = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Registration">
        <Stack.Screen name="Registration" component={Registration} options={{ headerShown: false }}/>
        <Stack.Screen name="GetAddress" component={GetAddress} initialParams={{ username: '',password:''}} options={{ headerShown: false }} />
        <Stack.Screen name="AddressList" component={AddressList} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
