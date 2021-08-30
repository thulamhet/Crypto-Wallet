import React from 'react';
import { SafeAreaView, AppState, Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, TextInput, Image } from "react-native";
import colors from '../themes/colors';
import { LineChart } from 'react-native-charts-wrapper';


const PortfolioScreen : React.FC = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Portfolio</Text>
                <Text style={{fontSize: 20}}>Current Balance</Text>
                <Text style={{fontSize: 20, color: colors.white, marginVertical: 5}}>$213213,12USD</Text>
            </View>
            {/* Chart */}
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
    }
})

export default PortfolioScreen;

function processColor(white: string) {
    throw new Error('Function not implemented.');
}
