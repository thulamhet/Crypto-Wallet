import React from 'react';
import { LineChart } from 'react-native-charts-wrapper';
import {
    View,
    StyleSheet
} from 'react-native';
export default class TestGraphScreen extends React.Component {

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.container}>
                    <LineChart style={styles.chart}
                        data={{ dataSets: [{ label: "demo", values: [{ y: 1 }, { y: 2 }, { y: 1 }] }] }}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    chart: {
        flex: 1
    }
});