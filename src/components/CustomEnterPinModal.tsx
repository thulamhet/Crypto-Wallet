import React, {useEffect, useState} from 'react';
import { AppState, Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, TextInput, Image } from "react-native";
import icons from '../themes/icons';
import colors from '../themes/colors';
import { Dimensions } from 'react-native';
import CustomCircle from './CustomCircle'
import RNSInfo from 'react-native-sensitive-info';
import SInfo from 'react-native-sensitive-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { changePin } from '../redux/action/pinAction';
import constants from '../constants/constant';

// Data successfully deleted

type CustomEnterPinProps = {
    modalVisible: boolean,
    setmodalVisible: (data: boolean) => void;
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const NHAP_PIN: string = 'NHẬP PIN';
const NHAP_LAI_PIN: string = 'NHẬP LẠI PIN';

const CustomEnterPin: React.FC<CustomEnterPinProps> = ({modalVisible, setmodalVisible}) => { 
    const [text, setText] = useState('');
    const [pin, setPin] = useState('');
    const [pinText, setpinText] = useState(NHAP_PIN);

    let pinData : string;

    const savePin = async (pin: string) => { 
        pinData = await SInfo.setItem("key1", pin, constants.keyStore);
        console.log(pinData);     
    }

    const getPin = async () => {
        const gettingPin = await SInfo.getItem("key1", {
            sharedPreferencesName: "mySharedPrefs",
            keychainService: "myKeychain",
          });
        setPin(gettingPin);
    }

    useEffect(() => { 
        getPin()
    },[])
    

    return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setmodalVisible(!modalVisible);
                }}
            >   
                <View style={styles.modalView}>
                        {/* Value Input */}
                        <View style={styles.inputView}>
                            <Text style={styles.textView}>{pinText}</Text>
                            
                            <TextInput
                                style={styles.input}   
                                autoFocus={true}
                                onChangeText={setText}
                                secureTextEntry={true}
                                value={text}
                                editable={false}
                            />
                        
                        </View>

                        {/* Number Input */}
                        <View>
                            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                <CustomCircle number='1' onPress={() => {setText(text + '1')}}/>
                                <CustomCircle number='2' onPress={() => {setText(text + '2')}}/>
                                <CustomCircle number='3' onPress={() => {setText(text + '3')}}/>
                            </View>

                            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                <CustomCircle number='4' onPress={() => {setText(text + '4')}}/>
                                <CustomCircle number='5' onPress={() => {setText(text + '5')}}/>
                                <CustomCircle number='6' onPress={() => {setText(text + '6')}}/>
                            </View>

                            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                <CustomCircle number='7' onPress={() => {setText(text + '7')}}/>
                                <CustomCircle number='8' onPress={() => {setText(text + '8')}}/>
                                <CustomCircle number='9' onPress={() => {setText(text + '9')}}/>
                            </View>

                            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                <TouchableOpacity
                                    onPress={() => {setText(text.slice(0, -1))}}
                                >
                                <Image
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 50,
                                        margin: 10,
                                    }}
                                    source={icons.deleteicon}
                                />
                                </TouchableOpacity>
                                
                                <CustomCircle number='0' onPress={() => {setText(text + '0')}}/>
                                

                                {/* OK BUTTON */}
                                <TouchableOpacity
                                    style={[styles.okBtn, {backgroundColor: text !== '' ? colors.red : colors.charcoal}]}
                                    onPress={() => {
                                        setText('');
                                        // Nếu nhập đúng pin ms được dùng tiếp
                                        console.log(pin)
                                        if(pin == text) {
                                            setmodalVisible(!modalVisible);
                                        } else {
                                            Alert.alert('Nhập sai pin, vui lòng nhập lại')
                                        }
                                    }}
                                    disabled={!(text !== '')}
                                    // value={text}
                                 >
                                    <Text style={{color: colors.white}}>OK</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                </View>
            </Modal>
    )
}

const styles = StyleSheet.create({
    modalView: {
        // backgroundColor: colors.charcoal,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        margin: 20,
        shadowColor: colors.black,
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 5,
        height: windowHeight/2,
        marginTop: windowHeight/4,
        borderRadius: 8,
    }, 
    input: {
        width: 150,
        height: 50,
        backgroundColor: colors.white,
        marginVertical: 20,
        paddingHorizontal: 20,
        
    },
    okBtn: {
        width: 40,
        height: 40,
        margin: 10,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',   
    },
    textView : { 
        color: colors.white, 
        marginVertical : 5,
        fontWeight: 'bold'
    },
    inputView: {
        alignSelf: 'center', 
        alignItems:'center'
     }
})

export default CustomEnterPin;