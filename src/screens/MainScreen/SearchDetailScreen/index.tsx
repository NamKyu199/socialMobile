import { ArrowLeft2, SearchNormal1 } from "iconsax-react-native";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AllRoute from "./Routes/AllRoute";
import CommunityRoute from "./Routes/CommunityRoute";
import NewsRoute from "./Routes/NewsRoute";
import EventRoute from "./Routes/EventRoute";
import ExpertRoute from "./Routes/ExpertRoute";
import PostsRoute from "./Routes/PostsRoute";

const Tab = createMaterialTopTabNavigator();

const SearchDetailScreen = ({ navigation, route }: any) => {
    const { text } = route.params || { text: '' };
    let label = '';

    return (
        <>
            <View style={{ backgroundColor: 'rgba(255, 255, 255, 1)', height: 108 }}>
                <View style={{ flexDirection: 'row', marginTop: 62, alignItems: 'center', marginHorizontal: 16 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ArrowLeft2 size={20} color="rgba(41, 45, 50, 1)" />
                    </TouchableOpacity>
                    <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'rgba(240, 240, 240, 1)', height: 34, width: '100%', borderRadius: 8, marginLeft: 10, alignItems: 'center', paddingLeft: 8 }}>
                        <SearchNormal1 size={16} color="rgba(89, 89, 89, 1)" />
                        <TextInput
                            style={{ marginLeft: 6 }}
                            placeholder={text}
                            placeholderTextColor={'rgba(89, 89, 89, 1)'}
                        />
                    </View>
                </View>
            </View>
            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarScrollEnabled: true,
                tabBarLabel: ({ focused }) => {
                    switch (route.name) {
                        case "AllRoute":
                            label = 'Tất cả';
                            break;
                        case "CommunityRoute":
                            label = 'Cộng đồng';
                            break;
                        case "NewsRoute":
                            label = 'Tin tức';
                            break;
                        case "EventRoute":
                            label = 'Sự kiện';
                            break;
                        case "ExpertRoute":
                            label = 'Chuyên gia';
                            break;
                        case "PostsRoute":
                            label = 'Bài viết';
                            break;
                        default:
                            label = route.name;
                    }
                    return (
                        <>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: focused ? '500' : '400',
                                color: focused ? 'rgba(30, 30, 30, 1)' : 'rgba(89, 89, 89, 1)'
                            }}>
                                {label}
                            </Text>
                            <View style={{ borderWidth: 1, borderRadius: 4, borderColor: focused ? 'rgba(114, 46, 209, 1)' : 'rgba(255, 255, 255, 1)', marginTop: 4 }} />
                        </>
                    )
                },
                tabBarItemStyle: { width: 'auto', marginHorizontal: 5 },
                tabBarIndicatorStyle: { backgroundColor: 'none' },
            })}>
                <Tab.Screen name="AllRoute" component={AllRoute} />
                <Tab.Screen name="CommunityRoute" component={CommunityRoute} />
                <Tab.Screen name="NewsRoute" component={NewsRoute} />
                <Tab.Screen name="EventRoute" component={EventRoute} />
                <Tab.Screen name="ExpertRoute" component={ExpertRoute} />
                <Tab.Screen name="PostsRoute" component={PostsRoute} />
            </Tab.Navigator>
        </>
    )
}

export default SearchDetailScreen;