import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./style";

const CommonButton = (props: any) => {
    return (
        <View style={styles.view}>
            <TouchableOpacity disabled={props.disabled} onPress={props.onPress}>
                <View style={styles.btn }>
                    <Text style={styles.text}>{props.text}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default CommonButton;