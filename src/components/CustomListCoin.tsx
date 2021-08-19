import React from 'react'
import { FlatList, SafeAreaView, View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../themes/colors'

type CustomListCoinProps = {
    data: any;
    onPress: (data: any, logo: any) => void;
    logoLink: any;
    isRefreshing: boolean;
    refresh: () => void;
}

const CustomListCoin: React.FC<CustomListCoinProps> = ({ data, onPress, logoLink, refresh, isRefreshing }) => {

    // Luôn define hàm riêng cho renderItem
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.listCoinItem}
            onPress={() => onPress(item, logoLink[item.symbol]?.logo)}
        >
            <View style={{ flexDirection: 'row', marginLeft: 5 }}>
                <Image
                    source={{ uri: logoLink ? logoLink[item.symbol]?.logo : null}}
                    resizeMode="cover"
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 40,
                        margin: 4,
                        alignSelf: 'center',
                        // backgroundColor: colors.black
                    }}
                />

                <View style={{ alignSelf: 'center', marginLeft: 5 }}>
                    <Text style={{ fontWeight: 'bold' }}>{item?.name}</Text>
                    <Text style={{ color: colors.white }}>{item?.symbol}</Text>
                </View>
            </View>

            <View style={{ alignSelf: 'center', marginRight: 5 }}>
                <Text>${item.quote.USD.price.toFixed(2)}</Text>
                <Text style={{ color: colors.red, textAlign: 'right' }}>{item.quote.USD.percent_change_7d.toFixed(2)}%</Text>
            </View>
        </TouchableOpacity>
    );

    return ( //Không cần SafeAreaView ở đây vì component này được wrap trong màn hình khác, không nằm độc lập riêng 1 màn hình
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item?.id}
            refreshing={isRefreshing}
            onRefresh={() => refresh && refresh()}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },

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

export default CustomListCoin;