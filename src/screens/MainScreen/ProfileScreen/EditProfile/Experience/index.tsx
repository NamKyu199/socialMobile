import React from "react";
import { View } from "react-native";
import HeaderEditProfile from "~component/HeaderEditProfile";
import Input from "~component/Input";

const Experience = () => {
    return (
        <>
            <HeaderEditProfile title='Kinh nghiệm làm việc' btn />
            <View style={{ backgroundColor: 'rgba(255,255,255,1)', height: '100%', paddingHorizontal: 20 }}>
                <Input 
                    text='Vị trí công việc'
                    placeholder='Nhập vị trí công việc'
                />
                <Input 
                    text='Mô tả'
                    placeholder='Nhập mô tả'
                />
            </View>
        </>
    )
}

export default Experience;