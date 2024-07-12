import React from "react";
import { View } from "react-native";
import HeaderEditProfile from "~component/HeaderEditProfile";
import Input from "~component/Input";

const Story = () => {
    return (
        <>
            <HeaderEditProfile title='Tiểu sử' btn />
            <View style={{ backgroundColor: 'rgba(255,255,255,1)', height: '100%', paddingHorizontal: 20 }}>
                <Input
                    text='Tiểu sử'
                    placeholder='Nhập tiểu sử'
                />
            </View>
        </>
    )
}

export default Story;