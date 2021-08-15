import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, Image, StyleSheet, TextInput, TouchableOpacity, FlatList } from "react-native";
import colors from '../../app/themes/colors'
import icons from '../../app/themes/icons'
import axios from 'axios'

// ? data chi la tam thoi
const DATA = [
    {
      id: '1',
      name: 'Bitcoin',
      symbol: 'BTC',
      exchangeRate: '$39,582.27',
      source: icons.bitcoin,
    },
    {
      id: '2',
      name: 'Ethereum',
      symbol: 'ETH',
      exchangeRate: '$39,123.27',
      source: icons.ethereum,
    },
    {
      id: '3',
      name: 'Tether',
      symbol: 'USDT',
      exchangeRate: '$9,582.27',
      source: icons.tether,
    },
];



const AssetScreen = () => {
    const [data, setdata] = useState([]);
    useEffect(() => {
        try {
            const getCoin = async () => {    
                // let res = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
                //             headers: { 'X-CMC_PRO_API_KEY': 'a7a57837-ff05-4073-89ff-165fbcd744c8' }
                //         });
                let res = await axios.get('https://rest.coinapi.io/v1/assests', {
                            headers: { 'X-CoinAPI-Key': 'A26EED76-9940-45AD-9388-DD732D53A650' }
                        });
                console.log('saddas')
                console.log(res.data)
                setdata(res.data)
            }
            getCoin();
            } catch(error) {
                console.log(error)
            }
    }, [])

    const renderItem = ({item}) => (
        <TouchableOpacity 
            style={styles.listCoinItem}
            onPress={()=> {
                
            }}    
        >
            <View style={{flexDirection: 'row', marginLeft: 5}}>
                <Image
                    source={item?.source}
                    resizeMode="cover"
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 40,
                        margin: 4,
                        alignSelf:'center',
                        // backgroundColor: colors.black
                    }}
                />
                
                <View style={{alignSelf: 'center', marginLeft: 5}}>
                    <Text style={{fontWeight: 'bold'}}>{item?.name}</Text>
                    <Text style={{color: colors.white}}>{item?.assest_id}</Text>
                </View>
            </View>
            
            <View style={{alignSelf:'center', marginRight: 5}}>
                <Text >{item.exchangeRate}</Text>
            </View>
        </TouchableOpacity>
    )

    return (
        <SafeAreaView style={styles.container}>
            {/* List Coin */}
            <View>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item?.assest_id}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    // title: {
    //     fontFamily: 'Roboto-Black',
    //     fontSize: 20, 
    //     alignSelf: 'center',
    //     color: colors.black,
    //     marginLeft: 120
    // },
    // searchCoin: {
    //     flexDirection: 'row', 
    //     alignItems: 'center', 
    //     borderRadius: 20, 
    //     borderWidth:1, 
    //     borderColor:colors.gray, 
    //     margin: 10
    // },
    listCoinItem: {
        height: 70, 
        borderWidth: 0.34,
        marginTop: 2,
        borderColor: colors.black, 
        flexDirection: 'row',
        backgroundColor: colors.gray,
        justifyContent: 'space-between'
    }
})

export default AssetScreen;