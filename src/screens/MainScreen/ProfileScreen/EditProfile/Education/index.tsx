import React from "react";
import { Text, View } from "react-native";
import HeaderEditProfile from "~component/HeaderEditProfile";
import Input from "~component/Input";

const Education = () => {
    return (
        <>
            <HeaderEditProfile title='Học vấn' btn />
            <View style={{ backgroundColor: 'rgba(255,255,255,1)', height: '100%', paddingHorizontal: 20 }}>
                <Input 
                    text='Tên trường học'
                    placeholder='Nhập trường học '
                />
            </View>
        </>
    )
}

export default Education;