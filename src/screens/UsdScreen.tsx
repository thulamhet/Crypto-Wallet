import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, View, Text, Image, StyleSheet, TextInput, TouchableOpacity, FlatList } from "react-native";
import colors from '../themes/colors'
import axios from 'axios'
import CustomListCoin from '../components/CustomListCoin';
import { SearchContext } from '../../App';
import CoinScreen from './CoinScreen';

import coinAPI from '../services/api'

const symbol = 'BTCB,WBTC,BTC,YFI,MKR,ETH,BCH,COMP,AAVE,BNB,KSM,XMR,DASH,LTC,DCR,BSV,QNT,EGLD,ZEC,AXS,ZEN,FIL,ETC,SOL,BTG,ICP,NEO,FTT,UNI,LINK,LUNA,DOT,AVAX,WAVES,FLOW,CAKE,OKB,HNT,ATOM,HT,SUSHI,QTUM,SNX,KCS,RUNE,THETA,CEL,EOS,VGX,BNT,NEAR,XTZ,CELO,AUDIO,LEO,CRV,ADA,NEXO,KLAY,ENJ,STX,MATIC,MDX,XRP,MIOTA,ONT,ZRX,UST,DAI,USDT,BUSD,USDC,TUSD,PAX,GRT,ALGO,MANA,BAT,FTM,XLM,CHZ,TFUEL,DOGE,HBAR,XEM,RVN,CRO,XDC,VET,ZIL,ONE,TRX,DGB,AMP,TEL,SC,REV,HOT,BTT,SHIB'

const UsdScreen = ({navigation}) => {
    const [checkCallApi, setcheckCallApi] = useState(false)
    const [data, setdata] = useState([]);
    const [link, setLink] = useState([])
    const sortData = (data: any, res: any) => {
        const data_temp = res.data.data;
        data_temp.sort((data1: any, data2: any) => data2.quote.USD.price - data1.quote.USD.price)
        setdata(data_temp)
    }
    const context = useContext(SearchContext);
    const {searchText} = context;
    
    useEffect(() => {
        try {
            const getCoin = async () => {    
                let res = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
                            headers: { 'X-CMC_PRO_API_KEY': '0f674722-d83a-4a02-8c9a-42a64984e9d7' }
                        });
                // let res = await coinAPI.getAllCoins();
                sortData(data, res);
                let res1 = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?symbol=' + symbol , {
                            headers: { 'X-CMC_PRO_API_KEY': '0f674722-d83a-4a02-8c9a-42a64984e9d7' }
                        });
                setLink(res1.data.data);
                // var s = ""
                //  res.data.data.forEach(data => {
                //     s += data.symbol + ","
                //  });
                 console.log(res.data.data);
                //  console.log(res1.data.data)
                // console.log(res.data);
                // console.log(res1.data.data['AAVE'].logo)
            }
           
            getCoin();
        } catch(error) {
            console.log(error)
        } 
    }, [])



    return (
        <SafeAreaView style={styles.container}>
            {/* List Coin */}
            <CustomListCoin 
                data = {data.filter(a => (a.name.toLowerCase()).includes(searchText.toLowerCase())
                                            || (a.symbol.toLowerCase()).includes(searchText.toLowerCase())
                    )}
                onPress = {(item, logo) => navigation.navigate('CoinScreen', {dataSingleCoin: item, logoCoin: logo})}
                // onPress = {() => console.log(link['AAVE'].logo)}
                logoLink = {link}
            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
})

export default UsdScreen;