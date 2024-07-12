import React from "react";
import { View } from "react-native";
import HeaderEditProfile from "~component/HeaderEditProfile";
import Input from "~component/Input";

const Achievements = () => {
    return (
        <>
            <HeaderEditProfile title='Thành tích' btn/>
            <View style={{backgroundColor: 'rgba(255,255,255,1)', height: '100%', paddingHorizontal: 20}}>
                <Input 
                    text='Tên thành tích'
                    placeholder='Nhập tên thành tích'
                />
                <Input 
                    text='Mô tả'
                    placeholder='Nhập mô tả'
                />
            </View>
        </>
    )
}

export default Achievements;