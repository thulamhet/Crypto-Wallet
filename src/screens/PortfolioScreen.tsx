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
    const [quantity, setQuantity] = useState(null);

    const getData = async () => {
        try {
        const jsonValue = await AsyncStorage.getItem(constants.keyStorage);
        if(jsonValue !== 'null')  {
            console.log('json',jsonValue);
            setCurrentBalance(parseFloat(jsonValue));
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
            }
            else {
                console.log('Failed to get data')
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
        } catch (e) {
            Alert.alert('Failed to store data')
            console.log(e);
          // saving error
        }
    }

    useEffect(() => {
        if (allAssets != null)
            reloadData();  
            const balance = getData();
            console.log('balance',balance);
            // if(balance) setCurrentBalance(balance)
             // Chỉ lấy dữ liệu trong lần đầu render 
    }, []);

    useEffect(() => {
        storeData(currentBalance);
        //Store data mỗi lần update currbala
    }, [currentBalance])

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
                                    //TODO: chua set dc balance
                                    setCurrentBalance(currentBalance + item.quote.USD.price * quantity);
                                    console.log('price', item.quote.USD.price);
                                    console.log('quan', quantity);
                                    console.log('item', item)
                                    setAddModalVisible(!addModalVisible);
                                    console.log(item)
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
                            setCurrentBalance(currentBalance + item.quote.USD.price);
                            //TODO: ấn add xong thì xóa add thay bằng số coin
                        }}
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

