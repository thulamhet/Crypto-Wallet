import React, { createContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import icons from '../../src/themes/icons'
import colors from '../../src/themes/colors'
import VolumeScreen from '../../src/screens/VolumeScreen';
import PopularScreen from '../../src/screens/PopularScreen';
import UsdScreen from '../../src/screens/UsdScreen'
import CoinScreen from '../../src/screens/CoinScreen'
import { SearchContext } from '../../App';
import Fonts from '../themes/fonts';
//token : 26xmBUNvXvP_28AsyhyV

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function Home() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="USD" component={UsdScreen} />
            <Tab.Screen name="Volume" component={VolumeScreen} />
            <Tab.Screen name="Popular" component={PopularScreen} />
        </Tab.Navigator>
    );
}

function AssestScreen () {
    const [searchText, setSearchText] = useState('');

    return (  
        <SearchContext.Provider value={{searchText}}>
                {/* Title and Menu */}
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity>
                        <Image
                            source={icons.menu}
                            resizeMode="cover"
                            style={{
                                width: 30,
                                height: 30,
                            }}
                        />
                    </TouchableOpacity>
            
                    <Text style={styles.title}>ThuCoin</Text>
                </View>
                
                {/* Search */}
                <View style={styles.searchCoin}>
                    <TouchableOpacity>

                        <Image
                            source={icons.search}
                            resizeMode="cover"
                            style={{
                                width: 20,
                                height: 20,
                            }}
                        />
                    </TouchableOpacity>

                    <TextInput
                        style={{}}
                        placeholder='Search'
                        onChangeText={setSearchText}
                    />
                </View>

                <Stack.Navigator>
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
        </SearchContext.Provider>
    )
  }

export default AssestScreen;

const styles = StyleSheet.create({
    title: {
        fontFamily: Fonts.black,
        fontSize: 20, 
        alignSelf: 'center',
        color: colors.black,
        marginLeft: 120
    },
    searchCoin: {
        flexDirection: 'row', 
        alignItems: 'center', 
        borderRadius: 20, 
        borderWidth:1, 
        borderColor:colors.gray, 
        margin: 10
    },
   
})

