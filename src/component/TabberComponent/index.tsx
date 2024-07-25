import React from "react";
import { Dimensions, Image, Platform, TouchableOpacity, View } from "react-native";
import { Notification, SearchNormal1 } from "iconsax-react-native";
import DropShadow from "react-native-drop-shadow";
import AppImage from "~utils/images/app_images";

const TabberComponent = ({ navigation }: any) => {
    const PAGE_HEIGHT = Dimensions.get('window').height;

    const handleNotification = () => {}

    return (
        <DropShadow
            style={{
                shadowColor: '#181818',
                shadowOffset: {
                    width: 0,
                    height: 0,
                },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 4,
            }}>
            <View style={{ backgroundColor: 'rgba(255, 255, 255, 1)', height: PAGE_HEIGHT * 0.11 }}>
                <View style={{ flexDirection: 'row', marginTop: Platform.OS === 'ios' ? 43 : 33, alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 16 }}>
                    <Image source={AppImage.logo} style={{ width: 127, height: 36 }} />
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
                            <SearchNormal1 style={{ marginRight: 20 }} size={20} color="rgba(41, 45, 50, 1)" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleNotification}>
                            <Notification size={20} color="rgba(41, 45, 50, 1)" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </DropShadow>
    )
}

export default TabberComponent;