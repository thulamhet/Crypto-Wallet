import React, { createContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CoinScreen from './src/screens/CoinScreen'
import AssesScreen from './src/screens/AssesScreen';
import PortfolioScreen from './src/screens/PortfolioScreen';
//token : 26xmBUNvXvP_28AsyhyV

const Stack = createStackNavigator();

export const SearchContext = createContext({
    searchText: '',
});

function App() {
    return (   
        <NavigationContainer>
                <Stack.Navigator>
                    {/* <Stack.Screen
                        name="Portfolio"
                        component={PortfolioScreen}
                        options={{ headerShown: false }}
                    /> */}
                    <Stack.Screen
                        name="Asses"
                        component={AssesScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="CoinScreen"
                        component={CoinScreen}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>           
        </NavigationContainer>
    )
}

export default App;
