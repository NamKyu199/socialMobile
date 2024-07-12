import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import HeaderEditProfile from "~component/HeaderEditProfile";
import Input from "~component/Input";

const Certificate = () => {
    return (
        <>
            <HeaderEditProfile title='Chứng chỉ' btn />
            <View style={{ backgroundColor: 'rgba(255,255,255,1)', height: '100%', paddingHorizontal: 20 }}>
                <Input
                    text='Tên chứng chỉ'
                    placeholder='Nhập tên chứng chỉ'
                />
                <Input
                    text='Mô tả'
                    placeholder='Nhập mô tả'
                />
                <TouchableOpacity
                    style={{ backgroundColor: 'rgba(114, 46, 209, 0.1)', height: 36, borderRadius: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 24 }}
                >
                    <Text style={{fontSize: 14, fontWeight: '600', lineHeight: 16.41, color: 'rgba(114, 46, 209, 1)'}}>
                        Thêm ảnh chứng chỉ
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default Certificate; 