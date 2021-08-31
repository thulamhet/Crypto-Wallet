import React, { useState } from 'react';
import {Modal, Alert, TouchableOpacity, Text, StyleSheet, Image, View} from 'react-native';
import colors from '../themes/colors';
import RNSInfo from 'react-native-sensitive-info';
import SInfo from 'react-native-sensitive-info';
import icons from '../themes/icons';
import CustomEnterPin from './CustomEnterPinModal';
import constants from '../constants/constant';
import CustomVerifyPin from './CustomVerifyPin';

type CustomDeletePinProps = { 
    modalVisible: boolean,
    setmodalVisible: (data: boolean) => void,
}

const XOA_PIN = 'XÓA PIN';

const deletePin = async () => {
    const value = await SInfo.deleteItem('key1', constants.keyStore);
}

const getPin = async () => {
    const gettingPin = await SInfo.getItem("key1", constants.keyStore);
}

const CustomDeletePin : React.FC<CustomDeletePinProps> = ({modalVisible, setmodalVisible}) => { 
    const [enterPinVisible, setEnterPinVisible] = useState(false);
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
            {/* Enter Pin */}
            <CustomVerifyPin
                modalVisible={enterPinVisible}
                setmodalVisible={setEnterPinVisible}
            />

            {/* Delete Touchable */}
            <TouchableOpacity
                style={styles.modalView}
                onPress={() => {
                    setEnterPinVisible(!enterPinVisible);                  
                    //TODO: Xử lý nhập pin đúng thì mới xóa pin
                }}
            >   
                <View>
                    {/* Close modal */}
                    <TouchableOpacity
                        onPress={() => {
                            setmodalVisible(!modalVisible);
                        }}
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