import React from 'react';
import {Modal, Alert, TouchableOpacity, Text, StyleSheet, Image, View} from 'react-native';
import colors from '../themes/colors';
import RNSInfo from 'react-native-sensitive-info';
import SInfo from 'react-native-sensitive-info';
import icons from '../themes/icons';

type CustomDeletePinProps = { 
    modalVisible: boolean,
    setmodalVisible: (data: boolean) => void,
}

const XOA_PIN = 'XÓA PIN';
const deletePin = async () => {
        const value = await SInfo.deleteItem('key1', {
            sharedPreferencesName: 'mySharedPrefs',
            keychainService: 'myKeychain'
        });
        console.log(value)
}
const getPin = async () => {
    const gettingPin = await SInfo.getItem("key1", {
        sharedPreferencesName: "mySharedPrefs",
        keychainService: "myKeychain",
      });
      
    console.log(gettingPin); 
}


const CustomDeletePin : React.FC<CustomDeletePinProps> = ({modalVisible, setmodalVisible}) => { 
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setmodalVisible(modalVisible);
            }}
        >   
            <TouchableOpacity
                style={styles.modalView}
                onPress={() => {
                    setmodalVisible(!modalVisible);
                    deletePin();
                    getPin();
                }}
            >   
                <View>
                    <TouchableOpacity
                                onPress={() => setmodalVisible(!modalVisible)}
                            >
                                <Image
                                    style={{
                                        resizeMode: 'cover',
                                        width:20,
                                        height:20,
                                        borderRadius: 50,
                                        margin: 2
                                    }}
                                    source={icons.close}
                                />
                            </TouchableOpacity>
                    <Text style={styles.textView}>{XOA_PIN}</Text>
                </View>
            </TouchableOpacity>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalView: {
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
        height: 50,
        marginTop: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textView: {
        color: colors.white,
    }
})

export default CustomDeletePin;