import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, View, Text, Image, StyleSheet, TextInput, TouchableOpacity, FlatList } from "react-native";
import colors from '../themes/colors'
import axios from 'axios'
import CustomListCoin from '../components/CustomListCoinModal';
import { SearchContext } from '../../App';
import { useMemo } from 'react';
import CoinAPI from '../services/api';

const VolumeScreen = ({navigation}) => {
    const [allAssets, setAllAssets] = useState([]);
    const [link, setLink] = useState([])
    const [isRefreshing, setIsRefreshing] = useState(false);
    const context = useContext(SearchContext);
    const { searchText } = context;
    const reloadData = async () => {
        setIsRefreshing(true);
        try {
            const res = await CoinAPI.getAllCoins();
            if (res && res.data) {
                const sortedAssets = res.data.sort((asset1: any, asset2: any) => asset2.quote.USD.volume_24h - asset1.quote.USD.volume_24h);
                setAllAssets(sortedAssets);
                const symbols = sortedAssets.map((asset) => asset.symbol).join(',');
                let res1 = await CoinAPI.getSymbolsInfo(symbols);
                setLink(res1.data)
            }
            else {
                console.log('Failed')
            }

        } catch (error) {
            console.log(error);
        }
        finally {
            setIsRefreshing(false);
        }
    }

    useEffect(() => {
        if (allAssets != null)
            reloadData(); // Chỉ lấy dữ liệu trong lần đầu render 
    }, []);

    const filteredData = useMemo(() => {
        if (allAssets == null) return [];
        const lwc = searchText.toLowerCase(); // Gán riêng const để toLowerCase() của searchText không bị gọi nhiều lần 
        return allAssets.filter((asset) => asset.name.toLowerCase().includes(lwc) || asset.symbol.toLowerCase().includes(lwc));
    }, [searchText, allAssets]); //Chỉ filter lại khi danh sách hoặc keyword tìm kiếm thay đổi 

    return (
        <SafeAreaView style={styles.container}>
            {/* List Coin */}
            <CustomListCoin data={filteredData}
                onPress={(item, logo) => navigation.navigate('CoinScreen', { dataSingleCoin: item, logoCoin: logo })}
                refresh={reloadData}
                isRefreshing={isRefreshing}
                logoLink={link} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
})

export default VolumeScreen;