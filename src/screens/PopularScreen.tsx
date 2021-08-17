import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, View, Text, Image, StyleSheet, TextInput, TouchableOpacity, FlatList } from "react-native";
import colors from '../../app/themes/colors'
import icons from '../../app/themes/icons'
import axios from 'axios'
import CustomListCoin from '../components/CustomListCoin';
import { SearchContext } from '../../App';
const PopularScreen = () => {
    const [data, setdata] = useState([]);

    const sortData = (data: any, res: any) => {
        const data_temp = res.data.data;
        data_temp.sort((data1: any, data2: any) => data2.quote.USD.price - data1.quote.USD.price)
        setdata(data_temp)
    }
    const context = useContext(SearchContext);
    const {searchText, setSearchText} = context;

    useEffect(() => {
        try {
            const getCoin = async () => {    
                let res = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
                            headers: { 'X-CMC_PRO_API_KEY': 'a7a57837-ff05-4073-89ff-165fbcd744c8' }
                        });
                // let res = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/info', {
                //             headers: { 'X-CMC_PRO_API_KEY': '0f674722-d83a-4a02-8c9a-42a64984e9d7' }
                //         });
                // let res = await axios.get('https://rest.coinapi.io/v1/assests', {
                //             headers: { 'X-CoinAPI-Key': 'F122661C-4633-48AE-BACC-DF62838E7314' }
                //         });
                sortData(data, res)
    
            }
            getCoin();
        } catch(error) {
                console.log(error)
        } 
    }, [searchText])

    return (
        <SafeAreaView style={styles.container}>
            {/* List Coin */}
            <CustomListCoin data = {data.filter(a => (a.name.toLowerCase()).includes(searchText.toLowerCase()))}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
})

export default PopularScreen;