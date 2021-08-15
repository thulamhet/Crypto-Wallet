import React from 'react';  
import {createAppContainer} from 'react-navigation';  
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AssetScreen from '../screens/AssetScreen'
import testScreen from '../screens/testScreen';
import { NavigationContainer } from '@react-navigation/native';
const Tab = createMaterialTopTabNavigator();

const AppNavigator = createMaterialTopTabNavigator(  
    {  
        Home: AssetScreen,  
        Profile: testScreen,  
    }
)  
export default createAppContainer(AppNavigator);  