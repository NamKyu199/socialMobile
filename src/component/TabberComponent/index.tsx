import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Notification, SearchNormal1 } from "iconsax-react-native";
import React from "react";
import { Dimensions, Image, Platform, TouchableOpacity, View } from "react-native";
import AppImage from "~utils/images/app_images";

const TabberComponent = ({ navigation }: any) => {
    
    const PAGE_HEIGHT = Dimensions.get('window').height;

    return (
        <View style={{ backgroundColor: 'rgba(255, 255, 255, 1)', height: PAGE_HEIGHT * 0.1 }}>
            <View style={{ flexDirection: 'row', marginTop: Platform.OS === 'ios' ? 43 : 30, alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 16 }}>
                <Image source={AppImage.logo} style={{ width: 127, height: 36 }} />
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
                        <SearchNormal1 style={{ marginRight: 20 }} size={20} color="rgba(41, 45, 50, 1)" />
                    </TouchableOpacity>
                    <Notification size={20} color="rgba(41, 45, 50, 1)" />
                </View>
            </View>
        </View>
    )
}

export default TabberComponent;