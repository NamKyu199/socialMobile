import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./HomeScreen";
import CommunityScreen from "./CommunityScreen";
import AppImage from "~utils/images/app_images";
import { Home2, Map1, People, } from "iconsax-react-native";
import NewsScreen from "./NewsScreen";
import MapsScreen from "./MapsScreen";
import ProfileScreen from "./ProfileScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "~services/ApiBaseUrl";

const MainScreen = ({ navigation }: any) => {
    const Tab = createBottomTabNavigator();
    const [userId, setUserId] = useState<string | null>(null);
    const [avatar, setAvatar] = useState();

    useEffect(() => {
        const fetchUserId = async () => {
            const id = await AsyncStorage.getItem('userId');
            setUserId(id);
        }
        fetchUserId();
    })

    const fetchAvatar = async () => {
        if (userId !== null) {
            try {
                const accessToken = await AsyncStorage.getItem('accessToken')
                const response = await axios.get(`${BASE_URL}profile/getAvatar`,
                    {
                        headers: {
                            'Authorization': accessToken
                        }
                    }
                )
                setAvatar(response.data.avatar)
            } catch (error: any) {

            }
        }
    }

    useEffect(() => {
        fetchAvatar()
    });

    const [currentTab, setCurrentTab] = useState('');

    return (
        <>
            <Tab.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
                <Tab.Screen name="Trang chủ" component={HomeScreen} options={{
                    tabBarIcon: ({ focused }) => (
                        <Home2
                            variant={focused ? 'Bold' : 'Linear'}
                            color={focused ? 'rgba(231, 79, 177, 1)' : 'rgba(173, 175, 178, 1)'}
                        />
                    ),
                    tabBarLabel: 'Trang chủ',
                    tabBarActiveTintColor: 'rgba(231, 79, 177, 1)',
                    tabBarInactiveTintColor: 'rgba(173, 175, 178, 1)',
                }}
                    listeners={{
                        tabPress: () => {
                            setCurrentTab('Trang chủ');
                        }
                    }}
                />
                <Tab.Screen name="CommunityScreen" component={CommunityScreen} options={{
                    tabBarIcon: ({ focused }) => (
                        <People
                            variant={focused ? 'Bold' : 'Linear'}
                            color={focused ? 'rgba(231, 79, 177, 1)' : 'rgba(173, 175, 178, 1)'}
                        />
                    ),
                    tabBarLabel: 'Cộng đồng',
                    tabBarActiveTintColor: 'rgba(231, 79, 177, 1)',
                    tabBarInactiveTintColor: 'rgba(173, 175, 178, 1)',
                }} />
                <Tab.Screen name="MapsScreen" component={MapsScreen} options={{
                    tabBarIcon: ({ focused }) => (
                        <Map1
                            variant={focused ? 'Bold' : 'Linear'}
                            color={focused ? 'rgba(231, 79, 177, 1)' : 'rgba(173, 175, 178, 1)'}
                        />
                    ),
                    tabBarLabel: 'Bản đồ',
                    tabBarActiveTintColor: 'rgba(231, 79, 177, 1)',
                    tabBarInactiveTintColor: 'rgba(173, 175, 178, 1)',
                    tabBarHideOnKeyboard: true,
                }} />
                <Tab.Screen name="NewScreens" component={NewsScreen} options={{
                    tabBarIcon: ({ focused }) => (
                        <View>
                            <Image source={focused ? AppImage.focusNewIcon : AppImage.newIcon} />
                        </View>
                    ),
                    tabBarLabel: 'Tin tức',
                    tabBarActiveTintColor: 'rgba(231, 79, 177, 1)',
                    tabBarInactiveTintColor: 'rgba(173, 175, 178, 1)',
                }} />
                <Tab.Screen name="ProfileScreen" component={ProfileScreen} options={{
                    tabBarIcon: ({ }) => (
                        <View>
                            <Image style={{ width: 20, height: 20, borderRadius: 100 }} source={{ uri: avatar }} />
                        </View>
                    ),
                    tabBarLabel: 'Hồ sơ',
                    tabBarActiveTintColor: 'rgba(231, 79, 177, 1)',
                    tabBarInactiveTintColor: 'rgba(173, 175, 178, 1)',
                }} />
            </Tab.Navigator>
        </>
    )
}

export default MainScreen;