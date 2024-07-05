import { Add } from "iconsax-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Posts = () => {
    return (
        <>
            <View style={{ backgroundColor: 'rgba(255, 255, 255, 1)', marginTop: 8, paddingHorizontal: 16, paddingVertical: 20 }}>
                <TouchableOpacity style={{
                    height: 62,
                    width: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                    borderWidth: 1,
                    borderRadius: 10,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: 'rgba(221, 221, 221, 0.4)',
                    shadowColor: 'rgba(24, 24, 24, 0.1)',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 1,
                    shadowRadius: 8
                }}>
                    <Add size={24} color="rgba(173, 175, 178, 1)" />
                    <Text style={{ fontSize: 16, fontWeight: '500', lineHeight: 24, color: 'rgba(173, 175, 178, 1)' }}>
                        Tạo bài viết mới
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default Posts;