import React, { createContext, useEffect, useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AppState, View, Text, Image, TouchableOpacity, StyleSheet,Modal, TextInput } from 'react-native';
import icons from '../../src/themes/icons'
import colors from '../../src/themes/colors'
import VolumeScreen from '../../src/screens/VolumeScreen';
import PopularScreen from '../../src/screens/PopularScreen';
import UsdScreen from '../../src/screens/UsdScreen'
import { SearchContext } from '../../App';
import Fonts from '../themes/fonts';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomSetPin from '../components/CustomSetPin';
import SInfo from 'react-native-sensitive-info';
import CustomDeletePin from '../components/CustomDeletePin';
import CustomEnterPin from '../components/CustomEnterPin';


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


function AssestScreen({ navigation }) {
    const [searchText, setSearchText] = useState('');
    const [pinModalVisible, setPinModalVisible] = useState(false);
    const [removePinVisible, setRemovePinVisible] = useState(false);
    const [enterPinVisible, setEnterPinVisible] = useState(false);
    const [checkPin, setCheckPin] = useState(false);


    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);

    useEffect(() => {
        getPin();
        // console.log(appState.current)
    }, [pinModalVisible, removePinVisible])

    

    useEffect(() => { 
        const getPin = async () => {
            const gettingPin = await SInfo.getItem("key1", {
                sharedPreferencesName: "mySharedPrefs",
                keychainService: "myKeychain",
            });
            if(gettingPin !== undefined) {
                setEnterPinVisible(!enterPinVisible)
            }
        }
        getPin();
            const subscription = AppState.addEventListener("change", nextAppState => {
                if (
                    appState.current.match(/inactive|background/) &&
                    nextAppState === "active"
                  ) {
                    console.log("App has come to the foreground!");
                  }
            
                appState.current = nextAppState;
                if(appState.current === 'background') {
                    getPin();

                }
                console.log("AppState", appState.current);
            });
        
    }, [])

    const getPin = async () => {
        const gettingPin = await SInfo.getItem("key1", {
            sharedPreferencesName: "mySharedPrefs",
            keychainService: "myKeychain",
        });

        if(gettingPin === undefined) {
           setCheckPin(true) ;
        } else setCheckPin(false) ;
    }
    
    return (
        <SearchContext.Provider value={{ searchText }}>
            <SafeAreaView style={{ flex: 1 }}>
                <CustomEnterPin
                    modalVisible={enterPinVisible}
                    setmodalVisible={setEnterPinVisible}
                />
                <CustomSetPin 
                    modalVisible={pinModalVisible}
                    setmodalVisible={setPinModalVisible}
                />
                <CustomDeletePin
                    modalVisible={removePinVisible}
                    setmodalVisible={setRemovePinVisible}
                />
                {/* Title and Menu */}
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity

                    //TODO: AN MENU O DAY
                        onPress={() => {
                            getPin();
                            // Có pin rồi thì vào modal xóa pin
                            if(!checkPin) setRemovePinVisible(!removePinVisible)
                            else setPinModalVisible(!pinModalVisible)
                            }
                        }
                    >
                        <Image
                            source={icons.menu}
                            resizeMode="cover"
                            style={{
                                width: 30,
                                height: 30,
                            }}
                        />
                    </TouchableOpacity>

                    <Text style={styles.title}>Thu1Coin</Text>
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
                                marginRight: 8
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
            </SafeAreaView>
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
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.gray,
        margin: 10,
        minHeight: 36,
        paddingHorizontal: 8
    },

})

