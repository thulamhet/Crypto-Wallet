import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-charts-wrapper';
import { View, Text, Image, StyleSheet, SafeAreaView, processColor } from 'react-native';
import axios from 'axios'
import colors from '../themes/colors';
import Fonts from '../themes/fonts';
import CoinAPI from '../services/api';



const CoinScreen : React.FC<{navigation: any, route: any}> = ({route, navigation}) => {
    const { dataSingleCoin, logoCoin } = route.params;
    const [data, setData] = useState([]);
    const [sourceData, setsourceData] = useState([]);
    const [btn1DBgColor, setbtn1DBgColor]  = useState(colors.gray);
    const [btn7DBgColor, setbtn7DBgColor]  = useState(colors.lightGray);
    const [btn1MBgColor, setbtn1MBgColor]  = useState(colors.lightGray);
    const [btn3MBgColor, setbtn3MBgColor]  = useState(colors.lightGray);
    const [period, setperiod] = useState('');

    const filterData = (data : Array<any>) => { 
        let tmp = [];
        for(let i = 0; i < data.length; i++) {
            const item = {y: data[i].price_close, x : i }
            tmp.push(item)
        }
        return tmp;
    }

    const getLowestPrice = (data: Array<any>) => { 
        let lowestPrice = data[0]?.price_low;
        data.map((item) => { 
            lowestPrice = item.price_low < lowestPrice ? item.price_low : lowestPrice;
        })
        return lowestPrice;
    }

    const getHighestPrice = (data: Array<any>) => { 
        let highestPrice = data[0]?.price_high;
        data.map((item) => { 
            highestPrice = item.price_low < highestPrice ? item.price_high : highestPrice;
        })
        return highestPrice;
    }

    const getVolumeTradedPrice = (data: Array<any>) => { 
        let volPrice = 0;
        data.map((item) => { 
            volPrice += item.volume_traded;
        })
        return volPrice;
    }

    const getData = async (period: String) => { 
        let period_id : String;
        switch (period) {
            case '1D':
                period_id = '15MIN';
                break;
            case '7D':
                period_id = '2HRS';
                break;
            case '1M':
                period_id = '8HRS';
                break;
            default:
                period_id = '1DAY';
                break;
        }
        try {
            let res = await CoinAPI.getPeriodCoins(dataSingleCoin.symbol, period_id);
            if (res) {
                setData(filterData(res))
                setsourceData(res)
            } else { 
                console.log('Failed to get period')
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { 
        // getData(period);
    }, [period])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headView}>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                        onPress={()=> navigation.navigate('Home')}
                    >
                        <Image
                            style={styles.iconImg}
                            source={{uri: logoCoin}}

                        />
                    </TouchableOpacity>

                    <View style={{alignSelf: 'center', paddingHorizontal: 10}}>
                        <Text style={styles.nameView}>{dataSingleCoin.name}</Text>
                        <Text style={styles.symbolView}>{dataSingleCoin.symbol}</Text>
                    </View>
                </View>

                <View style={{alignSelf: 'center', margin: 10}}>
                    <Text>${dataSingleCoin.quote.USD.price.toFixed(2)}</Text>
                    <Text style={{textAlign: 'right', color: colors.red}}>${dataSingleCoin.quote.USD.percent_change_7d.toFixed(2)}</Text>
                </View>
            </View>

            {/* LineDiv */}
            <View style={styles.lineView}></View>

            {/* Low High Volume Price*/}
            <View style={styles.priceView}>
                <View style={{}}>
                    <Text style={{color: colors.gray}}>Low</Text>
                    <Text>${getLowestPrice(sourceData)?.toFixed(2)}</Text>
                </View>
                <View>
                    <Text style={{color: colors.gray}}>High</Text>
                    <Text>${getHighestPrice(sourceData)?.toFixed(2)}</Text>
                </View>
                <View>
                    <Text style={{color: colors.gray}}>Vol</Text>
                    <Text>${getVolumeTradedPrice(sourceData)?.toFixed(2)}</Text>
                </View>
            </View>

            {/* Chart */}
            <View style={{}}>
                    <LineChart
                        style={styles.chart}
                        data={{
                        dataSets: [
                            {   
                                values: data,
                                label: '',
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
                                    drawFilled: true,
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
                            enabled: true,
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
            </View>            

            {/* Choose period */}
            <View style={styles.periodView}>
                    <TouchableOpacity 
                        style={[styles.periodBtn,{backgroundColor: btn1DBgColor}]}
                        onPress={() => { 
                            setbtn1DBgColor(colors.gray);
                            setbtn7DBgColor(colors.lightGray);
                            setbtn1MBgColor(colors.lightGray);
                            setbtn3MBgColor(colors.lightGray);
                            setperiod('1D');
                        }}
                    >
                        <Text>1D</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.periodBtn,{backgroundColor: btn7DBgColor}]}
                        onPress={() => { 
                            setbtn7DBgColor(colors.gray);
                            setbtn1DBgColor(colors.lightGray);
                            setbtn1MBgColor(colors.lightGray);
                            setbtn3MBgColor(colors.lightGray);
                            setperiod('7D');
                        }}
                    >
                        <Text>7D</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.periodBtn,{backgroundColor: btn1MBgColor}]}
                        onPress={() => { 
                            setbtn1MBgColor(colors.gray);
                            setbtn7DBgColor(colors.lightGray);
                            setbtn1DBgColor(colors.lightGray);
                            setbtn3MBgColor(colors.lightGray);
                            setperiod('1M');

                        }}
                    >
                        <Text>1M</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.periodBtn,{backgroundColor: btn3MBgColor}]}
                        onPress={() => { 
                            setbtn3MBgColor(colors.gray);
                            setbtn7DBgColor(colors.lightGray);
                            setbtn1MBgColor(colors.lightGray);
                            setbtn1DBgColor(colors.lightGray);
                            setperiod('3M');
                        }}
                    >
                        <Text>3M</Text>
                    </TouchableOpacity>
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
    },
    lineView: {
        width: 350,
        height: 20, 
        borderTopWidth: 0.2, 
        alignSelf: 'center',
        borderTopColor: colors.gray,
    },
    chart : {
        width: 390,
        height: 600,
    }, 
    priceView : {
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    iconImg : {
        width: 60,
        height: 60,
        margin: 10
    },
    periodView: { 
        flexDirection: 'row',
        justifyContent: 'space-around',

    },
    periodBtn: { 
        width: 50,
        height: 20,
        backgroundColor: colors.lightGray,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default CoinScreen;


