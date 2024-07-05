import { SearchNormal1, Setting2 } from "iconsax-react-native";
import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

const Header = () => {
    return (
        <>
            <View style={{ height: 102, backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                <View style={{ flexDirection: 'row', marginTop: 56, alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 16 }}>
                    <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'rgba(240, 240, 240, 1)', height: 34, width: '100%', borderRadius: 8, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 8 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <SearchNormal1 size={16} color="rgba(89, 89, 89, 1)" />
                            <TextInput
                                style={{ fontSize: 14, fontWeight: '400', lineHeight: 18.2, letterSpacing: 0.001, color: 'rgba(89, 89, 89, 1)', marginLeft: 6 }}
                                placeholder="Tìm kiếm "
                                placeholderTextColor={'rgba(89, 89, 89, 1)'}
                            />
                        </View>
                    </View>
                    <TouchableOpacity>
                        <Setting2 size={24} color="rgba(114, 46, 209, 1)" style={{ marginLeft: 5 }} />
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default Header;