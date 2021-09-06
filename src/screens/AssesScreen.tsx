import React, { createContext, useEffect, useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AppState, View, Text, Image, TouchableOpacity, StyleSheet,Modal, TextInput } from 'react-native';
import icons, { portfolio } from '../themes/icons'
import colors from '../themes/colors'
import VolumeScreen from './VolumeScreen';
import PopularScreen from './PopularScreen';
import UsdScreen from './UsdScreen'
import { SearchContext } from '../../App';
import Fonts from '../themes/fonts';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomSetPin from '../components/CustomSetPinModal';
import SInfo from 'react-native-sensitive-info';
import CustomDeletePin from '../components/CustomDeletePinModal';
import CustomEnterPin from '../components/CustomEnterPinModal';
import constants from '../constants/constant';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCoin } from '../redux/action/coinAction';

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

function AssesScreen({ navigation }) {
    const [searchText, setSearchText] = useState('');
    const [pinModalVisible, setPinModalVisible] = useState(false);
    const [removePinVisible, setRemovePinVisible] = useState(false);
    const [enterPinVisible, setEnterPinVisible] = useState(false);
    const [checkPin, setCheckPin] = useState(false);

    const dispatch = useDispatch();
    const coinReducer = useSelector((state: any) => state?.coinReducer);
    const coins = coinReducer.coins;

    useEffect(() => {
        dispatch(getAllCoin())
        console.log('redux',coins)
    }, [])

    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);
    
    const getPin = async () => {
        const gettingPin = await SInfo.getItem("key1", constants.keyStore);
        if(gettingPin === undefined) {
           setCheckPin(true) ;
        } else setCheckPin(false) ;
    }

    useEffect(() => {
        //Xu ly khi co pin r thi an vao menu ra remove pin va nguoc lai
        getPin();
        // console.log(appState.current)
    }, [pinModalVisible, removePinVisible])

    useEffect(() => { 
        //Xu ly khi app render lan dau
        const getPin = async () => {
            const gettingPin = await SInfo.getItem("key1", constants.keyStore);
            if(gettingPin !== undefined) {
                setEnterPinVisible(!enterPinVisible)
            }
        }
        getPin();

        //Xu ly khi app xuong background
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
            return () => {
                subscription.remove();
                };
        });

        //lay coin
        
        
    }, [])

    
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

                    <TouchableOpacity
                        onPress={() => { navigation.navigate('Portfolio')}}
                    >
                        <Image
                            style={styles.portfolioImg}
                            source={icons.portfolio}
                            resizeMode='cover'
                        />
                    </TouchableOpacity>
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

export default AssesScreen;

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
        paddingHorizontal: 8,
    
    },
    portfolioImg : { 
        flex: 1,
        width: 30, 
        height: 30,
        marginLeft: 100,
        borderRadius: 50,
    }

})

