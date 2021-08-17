import React from 'react'
import { FlatList, SafeAreaView, View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../app/themes/colors'

type CustomListCoinProps = {
    data: any;
}

// const renderItem = ({item}) => (
//     <TouchableOpacity 
//         style={styles.listCoinItem}
//         onPress={()=> {
//         }}    
//     >
//         <View style={{flexDirection: 'row', marginLeft: 5}}>
//             <Image
//                 source={item?.source}
//                 resizeMode="cover"
//                 style={{
//                     width: 50,
//                     height: 50,
//                     borderRadius: 40,
//                     margin: 4,
//                     alignSelf:'center',
//                     // backgroundColor: colors.black
//                 }}
//             />
            
//             <View style={{alignSelf: 'center', marginLeft: 5}}>
//                 <Text style={{fontWeight: 'bold'}}>{item?.name}</Text>
//                 <Text style={{color: colors.white}}>{item?.symbol}</Text>
//             </View>
//         </View>
        
//         <View style={{alignSelf:'center', marginRight: 5}}>
//             <Text>${item.quote.USD.price.toFixed(2)}</Text>
//             <Text style ={{color: '#e02209'}}>{item.quote.USD.percent_change_7d.toFixed(2)}%</Text>
//         </View>
//     </TouchableOpacity>
// )

const CustomListCoin : React.FC<CustomListCoinProps> = ({data}) => {
    return (
        <SafeAreaView>
            <FlatList
                data={data}
                renderItem={({item}) => (
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
                                <Text style={{color: colors.white}}>{item?.symbol}</Text>
                            </View>
                        </View>
            
                        <View style={{alignSelf:'center', marginRight: 5}}>
                            <Text>${item.quote.USD.price.toFixed(2)}</Text>
                            <Text style ={{color: '#e02209'}}>{item.quote.USD.percent_change_7d.toFixed(2)}%</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item?.id}
            />
        </SafeAreaView>
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