import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import NewestRoute from "./Routes/NewestRoute";
import OutStandingRoute from "./Routes/OutStandingRoute";
import InterestedRoute from "./Routes/InterestedRoute";
import { Send } from "iconsax-react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TabberComponent from "~component/TabberComponent";

const Tab = createMaterialTopTabNavigator();

const CommunityScreen = ({ navigation, route }: any) => {

    return (
        <>
            <TabberComponent />
            <View style={{ backgroundColor: 'rgba(255, 255, 255, 1)', height: 81, justifyContent: 'center' }}>
                <TouchableOpacity
                    style={{ backgroundColor: 'rgba(244, 246, 248, 1)', height: 49, marginHorizontal: 16, borderRadius: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 }}
                    onPress={() => navigation.navigate('QuestionCreateScreen')}
                >
                    <Text style={{ fontSize: 14, fontWeight: '400', lineHeight: 16.8, letterSpacing: 0.1, color: 'rgba(101, 103, 107, 1)' }}>Đặt câu hỏi?</Text>
                    <Send size={20} color="rgba(166, 166, 166, 1)" />
                </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: 'rgba(255, 255, 255, 1)', height: '100%', marginTop: 12 }}>
                <Tab.Navigator screenOptions={{
                    tabBarIndicatorStyle: { backgroundColor: 'rgba(114, 46, 209, 1)', width: '22%', marginLeft: '3.7%' },
                }}>
                    <Tab.Screen name="Mới nhất" component={NewestRoute} options={{
                        tabBarLabel: ({ focused }) => (
                            <Text style={{
                                fontSize: 16,
                                color: focused ? 'rgba(114, 46, 209, 1)' : 'rgba(30, 30, 30, 1)',
                                fontWeight: '400'
                            }}>
                                Mới nhất
                            </Text>
                        )
                    }} />
                    <Tab.Screen name="Nổi bật" component={OutStandingRoute} options={{
                        tabBarLabel: ({ focused }) => (
                            <Text style={{
                                fontSize: 16,
                                color: focused ? 'rgba(114, 46, 209, 1)' : 'rgba(30, 30, 30, 1)',
                                fontWeight: '400'
                            }}>
                                Nổi bật
                            </Text>
                        )
                    }} />
                    <Tab.Screen name="Quan tâm" component={InterestedRoute} options={{
                        tabBarLabel: ({ focused }) => (
                            <Text style={{
                                fontSize: 16,
                                color: focused ? 'rgba(114, 46, 209, 1)' : 'rgba(30, 30, 30, 1)',
                                fontWeight: '400'
                            }}>
                                Quan tâm
                            </Text>
                        )
                    }} />
                </Tab.Navigator>
                <View style={{marginBottom: 220}}/>
            </View>
        </>
    )
}

export default CommunityScreen;