import React, { createContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CoinScreen from './src/screens/CoinScreen'
import AssestScreen from './src/screens/AssestScreen';
//token : 26xmBUNvXvP_28AsyhyV

const Stack = createStackNavigator();

export const SearchContext = createContext({
    searchText: '',
    setSearchText: (data: string) => {},
  });

function App() {
    const [searchText, setSearchText] = useState('');

    return (  
        <SearchContext.Provider value={{searchText, setSearchText}}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Assest"
                        component={AssestScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen 
                        name="CoinScreen" 
                        component={CoinScreen} 
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
       </SearchContext.Provider>
    )
  }

export default App;
