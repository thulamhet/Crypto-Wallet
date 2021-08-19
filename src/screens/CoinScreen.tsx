import React from 'react'
import { TouchableOpacity } from 'react-native';
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native'
import colors from '../themes/colors';
import Fonts from '../themes/fonts';

const CoinScreen : React.FC<{navigation: any, route: any}> = ({route, navigation}) => {
    const { dataSingleCoin, logoCoin } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headView}>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                        onPress={()=> navigation.navigate('Home')}
                    >
                        <Image
                            style={{
                                width: 60,
                                height: 60,
                                margin: 10
                            }}
                            source={{uri: logoCoin}}

                        />
                    </TouchableOpacity>
                    <View style={{alignSelf: 'center', paddingHorizontal: 10}}>
                        <Text style={styles.nameView}>{dataSingleCoin.name}</Text>
                        <Text style={styles.symbolView}>{dataSingleCoin.symbol}</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text>{dataSingleCoin.quote.USD.price.toFixed(2)}</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    headView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    nameView: {
        fontFamily: Fonts.bold
    },
    symbolView: {
        fontFamily: Fonts.light
    }
})

export default CoinScreen;