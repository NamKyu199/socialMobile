import { ArrowDown2 } from "iconsax-react-native";
import React from "react";
import { Text, View } from "react-native";

const Evaluate = () => {
    return (
        <>
            <View style={{ backgroundColor: 'rgba(255, 255, 255, 1)', marginTop: 8, paddingHorizontal: 16 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ fontSize: 16, fontWeight: '500', lineHeight: 20 }}>
                            Tất cả
                        </Text>
                        <View style={{ height: 2, width: 44, backgroundColor: 'rgba(114, 46, 209, 1)', borderRadius: 4, marginTop: 4 }} />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 16, fontWeight: '400', lineHeight: 19.84, color: 'rgba(166, 166, 166, 1)', marginRight: 4 }}>
                            Sắp xếp theo
                        </Text>
                        <ArrowDown2 size={16} color="rgba(166, 166, 166, 1)" />
                    </View>
                </View>
                <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: '400', lineHeight: 16.41, color: 'rgba(173, 175, 178, 1)', marginVertical: 12 }}>
                    Chưa có đánh giá nào
                </Text>
            </View>
        </>
    )
}

export default Evaluate;