import React from "react";
import { Text, View } from "react-native";

const Answer = () => {
    return (
        <>
            <View style={{backgroundColor: 'rgba(255, 255, 255, 1)', height: '100%'}}>
                <Text style={{ fontSize: 14, fontWeight: '400', lineHeight: 16.41, color: 'rgba(173, 175, 178, 1)', textAlign: 'center' }}>
                    Chưa có câu trả lời nào
                </Text>
            </View>
        </>
    )
}

export default Answer;