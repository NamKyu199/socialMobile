import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ArrowLeft2 } from "iconsax-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const HeaderEditProfile = (props: any) => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    return (
        <>
            <View style={{ backgroundColor: 'rgba(248, 249, 252, 1)', height: 98, borderWidth: 0.4, borderColor: 'rgba(221, 221, 221, 1)' }}>
                <Text style={{ fontSize: 18, fontWeight: '700', lineHeight: 21.09, textAlign: 'center', marginTop: 54 }}>
                    {props.title}
                </Text>
                <TouchableOpacity style={{ position: 'absolute', top: 54, left: 16 }} onPress={() => navigation.goBack()}>
                    <ArrowLeft2 color="rgba(41, 45, 50, 1)" size={24} />
                </TouchableOpacity>
                {props.btn != null && (
                    <TouchableOpacity
                        style={{ position: 'absolute', top: 54, right: 16, backgroundColor: 'rgba(240, 240, 240, 1)', borderRadius: 4 }}
                        onPress={props.onPress}
                    >
                        <Text style={{ fontSize: 16, fontWeight: '600', lineHeight: 18.75, color: 'rgba(166, 166, 166, 1)', marginVertical: 7, marginHorizontal: 16 }}>
                            Lưu
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </>
    )
}

export default HeaderEditProfile;