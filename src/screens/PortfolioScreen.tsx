import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, AppState, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, TextInput, Image, Alert, processColor } from "react-native";
import colors from '../themes/colors';
import { LineChart } from 'react-native-charts-wrapper';
import CoinAPI from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import constants from '../constants/constant';

const PortfolioScreen : React.FC = () => {
    const [allAssets, setAllAssets] = useState([]);
    const [link, setLink] = useState([])
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [currentBalance, setCurrentBalance] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [priceCoin, setPriceCoin] = useState(0);
    const[symbol, setSymbol] = useState('');
    const [ownCoin, setOwnCoin] = useState([]);
    const getData = async (allAssets) => {
        try {
        const jsonValue = await AsyncStorage.getItem(constants.keyStorage);
        if(jsonValue !== 'null')  {


            console.log('jsonparse',JSON.parse(jsonValue));//obj
            console.log(typeof JSON.parse(jsonValue));


            //TODO: no chua update
            getInitBalance(JSON.parse(jsonValue), allAssets);
            setOwnCoin(JSON.parse(jsonValue));
        }
        return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
            Alert.alert('Failed to get data')
            console.log(e)
        // error reading value
        }
    }

    const reloadData = async () => {
        setIsRefreshing(true);
        try {
            const res = await CoinAPI.getAllCoins();
            // const res = dispatch(getAllCoin())
            // console.log('res', res)
            if (res && res.data) {
                const sortedAssets = res.data.sort((asset1: any, asset2: any) => asset2.quote.USD.price - asset1.quote.USD.price);
                setAllAssets(sortedAssets);
                const symbols = sortedAssets.map((asset) => asset.symbol).join(',');
                let res1 = await CoinAPI.getSymbolsInfo(symbols);
                setLink(res1.data);
                console.log(res)
                getData(res.data)
            }
            else {
                console.log('Failed to get data');
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            setIsRefreshing(false);
        }
    }

    const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem(constants.keyStorage, jsonValue)
        //   await AsyncStorage.removeItem(constants.keyStorage)
        } catch (e) {
            Alert.alert('Failed to store data')
            console.log(e);
          // saving error
        }
    }

    useEffect(() => {
        if (allAssets != null)
            reloadData();  
             // Chỉ lấy dữ liệu trong lần đầu render 
    }, []);
    
    const updateBalance = (ownCoin) => {
        let addBalance = 0;
        if(ownCoin.length > 0)
            for (let j = 0; j < allAssets.length; j++) { 
                if (ownCoin[ownCoin.length - 1].symbol === allAssets[j].symbol) { 
                    addBalance += (allAssets[j].quote.USD.price * parseInt(quantity));
                    console.log('quanti',parseInt(quantity) )
                    console.log('asss',allAssets[j].quote.USD.price )
                    break;
                }
            }
        console.log('sumRS', addBalance)
        console.log('allassss', allAssets)
        if(addBalance !== NaN) 
            setCurrentBalance(currentBalance + addBalance);
    }

    const getInitBalance = (myCoin, allAssets) => {
        let Balance = 0;
        for (let i = 0; i < myCoin.length; i++) {
            for (let j = 0; j < allAssets.length; j++) { 
                if (myCoin[i].symbol == allAssets[j].symbol) { 
                    Balance += (allAssets[j].quote.USD.price * parseInt(myCoin[i].quantity));
                    break;
                }
            }
        }
        // console.log(myCoin[0].symbol == allAssets[0].symbol)
        // console.log('allasSYmbol', allAssets[0].symbol)
        // console.log('mycoinsymbol',myCoin[0].symbol)
        // console.log('allas', allAssets)
        // console.log('price', allAssets[0].quote.USD.price)
        // console.log('quantity', parseInt(myCoin[0].quantity))
        // console.log('value',myCoin);
        // console.log('sumXXXX', typeof Balance)
        //TODO: fix de currBalance update
        // kO phai loi o day tai vi curr bi update sai o  cho khac
        setCurrentBalance(Balance);
        console.log('currentBalance', currentBalance)
    }

    useEffect(() => {
        console.log('owncoin', ownCoin);
        updateBalance(ownCoin);
        if(ownCoin.length !== 0)
        storeData(ownCoin);
        console.log(3)
    }, [ownCoin])

  

    const renderItem = ({item}) => { 
        
        return (
            <View>
                <View style={{ flexDirection: 'row', marginLeft: 5 }}>
                {/* <View style={{}}>
                    <LineChart
                        style={styles.chart}
                        data={{
                        dataSets: [
                            {   
                                values: [
                                    {x: 5, y: 90},
                                    {x: 10, y: 130},
                                    {x: 50, y: 2000, marker: "eat more"},
                                    {x: 80, y: 9000, marker: "eat less"}
                                ],
                                label: 'Coin Graph',
                                config: {
                                    mode: 'CUBIC_BEZIER',
                                    drawValues: false,
                                    lineWidth: 2,
                                    drawCircles: false,
                                    circleColor: processColor(colors.petrel),
                                    drawCircleHole: false,
                                    circleRadius: 5,
                                    highlightColor: processColor(colors.black),
                                    color: processColor(colors.petrel),
                                    drawFilled: false,
                                    fillGradient: {
                                    colors: [processColor(colors.petrel), processColor(colors.greenBlue)],
                                    positions: [0, 0.5],
                                    angle: 90,
                                    orientation: 'TOP_BOTTOM',
                                    },
                                    fillAlpha: 1000,
                                    valueTextSize: 15,
                                },
                            },
                        ],
                        }}
                        chartDescription={{text: ''}}
                        legend={{
                            enabled: true,
                        }}
                        marker={{
                            enabled: true,
                            markerColor: processColor(colors.white),
                            textColor: processColor(colors.black),
                        }}
                        xAxis={{
                            enabled: false,
                            granularity: 1, // độ chi tiết
                            drawLabels: true,
                            position: 'BOTTOM',
                            drawAxisLine: true,
                            drawGridLines: false,
                            fontWeight: 'bold',
                            textSize: 12,
                            textColor: processColor(colors.gray),
                            // valueFormatter: ['M', 'T', 'W', 'T', 'F', 'S'],
                        }}
                        yAxis={{
                            left: {
                                enabled: true,
                                textColor: processColor(colors.black),
                                drawGridLines: false,
                                gridLineWidth: 1,
                                drawAxisLine: false,
                                drawLabels: true,
                                yOffset: -5,
                                position: 'INSIDE_CHART',
                                textSize: 10,
                                gridColor: processColor(colors.white),
                            },
                            right: {
                                enabled: false,
                            },
                        }}
                        autoScaleMinMaxEnabled={true}
                        animation={{
                            durationX: 0,
                            durationY: 2000,
                            easingY: 'EaseInOutQuart',
                        }}
                        drawGridBackground={false}
                        drawBorders={false}
                        touchEnabled={true}
                        dragEnabled={true}
                        scaleEnabled={false}
                        scaleXEnabled={false}
                        scaleYEnabled={false}
                        pinchZoom={true}
                        doubleTapToZoomEnabled={true}
                        dragDecelerationEnabled={true}
                        dragDecelerationFrictionCoef={0.99}
                        keepPositionOnRotation={false}
                    />
            </View>            */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={addModalVisible}
                    >
                        <View style={styles.modalView}>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={setQuantity}
                                keyboardType="numeric"
                            />
                            <TouchableOpacity 
                                style={{
                                    width: 30, 
                                    height: 30, 
                                    borderColor: colors.white, 
                                    borderWidth: 0.5, 
                                    alignSelf: 'center',
                                    borderRadius: 10,
                                }}
                                onPress={() => {
                                    //TODO: here
                                    setAddModalVisible(!addModalVisible);
                                    setOwnCoin([...ownCoin,{symbol, quantity}]);
                                }}>
                                <Text style={{color: colors.white}}>Add</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>

                    {/* Coins */}
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <Image
                            // source={{ uri: link.toString()}}
                            source={{ uri: link ? link[item.symbol]?.logo : null}}
                            resizeMode="cover"
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 40,
                                margin: 4,
                            }}
                        />
                        <Text style={{marginLeft: 5, color: colors.white}}>{item?.symbol}</Text>
                    </View>

                    {/* Price */}
                    <View style={{alignSelf: 'center', flex: 1}}>
                        <Text style={{color: colors.white}}>${item.quote.USD.price.toFixed(2)}</Text>
                        <Text style={{color: item.quote.USD.percent_change_7d.toFixed(2)> 0 ? colors.greenBlue : colors.red}}>{item.quote.USD.percent_change_7d.toFixed(2)}%</Text>
                    </View>

                    {/* Add */}
                    <TouchableOpacity 
                        style={styles.addBtn}
                        onPress={()=> {
                            setAddModalVisible(!addModalVisible);
                            setPriceCoin(item.quote.USD.price);
                            setSymbol(item.symbol);
                        }}
                        //TODO: here
                    >
                        <Text style={{color: colors.white, alignSelf: 'center'}}>Add</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>

            {/* ModalAddCoin */}


            <View style={styles.header}>
                <Text style={styles.title}>Portfolio</Text>
                <Text style={{fontSize: 20}}>Current Balance</Text>
                <Text style={{fontSize: 20, color: colors.white, marginVertical: 5}}>${currentBalance.toFixed(2)}</Text>
            </View>

            <View style={{marginHorizontal: 5, marginTop: 20}}>
                <Text style={{color: colors.white, fontSize: 30}}>Your Assests</Text>
                
                <View style={{ 
                    flexDirection: 'row',
                    marginTop: 20,
                    justifyContent: 'space-between'   
                }}>
                    <Text style={{color: colors.white, fontSize: 20,}}>Coins</Text>
                    <Text style={{color: colors.white, fontSize: 20, textAlign: 'right'}}>Price</Text>
                    <Text style={{color: colors.white, fontSize: 20, textAlign: 'right'}}>Holdings</Text>
                </View>
            </View>

            <FlatList
                data={allAssets}
                keyExtractor={item => item?.id}
                renderItem={renderItem}
                
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black,
    },
    header: {
        paddingHorizontal: 15,
        backgroundColor: colors.gray,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    title: {
        marginTop: 50,
        fontSize: 50,
        color: colors.white,
        fontWeight: '700',
        marginBottom: 10,
    },
    chart :{
        width: 300,
        height: 300,
    },
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
        height: 100,
        marginTop: 100,
        borderRadius: 8,
    }, 
    addBtn : { 
        width: 40,
        height: 30, 
        borderRadius: 10,
        borderColor: colors.white,
        borderWidth: 0.5,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    textInput: { 
        width: 180, 
        height: 40, 
        borderWidth: 0.5, 
        // borderColor: colors.white,
        alignSelf: 'center',
        padding: 5,
        marginTop: 30,
        backgroundColor: colors.white,
        borderRadius: 10,
    }
})

export default PortfolioScreen;

