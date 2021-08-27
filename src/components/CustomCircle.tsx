import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import colors from "../themes/colors";

type CircleType = {
    number: string;
    onPress: () => void;
}

const CustomCircle: React.FC<CircleType> = ({number, onPress}) => {
    return (
        <TouchableOpacity
            onPress={() => onPress()}
            style={styles.circleView}
        >
            <Text style={styles.numberView}>{number}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    circleView: { 
        backgroundColor: colors.gray,
        width: 40, height: 40, 
        borderRadius: 40/2, 
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    numberView: {
        color: colors.white,
    }
})

export default CustomCircle;