import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { Clock } from "iconsax-react-native";
import moment from "moment";
import React, { useEffect, useState } from "react"
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import DropShadow from "react-native-drop-shadow";
import LinearGradient from "react-native-linear-gradient";
import styles from "~screens/MainScreen/NewsScreen/PracticeScreen/styles";
import AppImage from "~utils/images/app_images";


const PracticeScreen = ({ navigation }: any) => {
    const route = useRoute();
    const currentTabName = route.name;
    const [practiceNews, setPacticeNews] = useState([]);
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const accessToken = await AsyncStorage.getItem('accessToken')
                const response = await axios.get('http://192.53.172.131:1050/news/news', {
                    headers: {
                        'Authorization': accessToken
                    }
                },);
                setPacticeNews(response.data.newsInfo);
            }
            catch (error: any) {
                console.error('Error fetching News :', error.message)
            }
        };
        fetchNews();
    }, []);

    const [practice, setPractice] = useState([]);
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('http://192.53.172.131:1050/news/five-news/typeId/3');
                setPractice(response.data.newsInfo);
            }
            catch (error: any) {
                console.error('Error fetching News :', error.message)
            }
        };
        fetchNews();
    }, []);

    const hashtagColors = ['rgba(171, 81, 228, 1)', 'rgba(114, 46, 209, 1)', 'rgba(105, 24, 165, 1)', 'rgba(74, 10, 120, 1)', 'rgba(49, 0, 84, 1)'];
    const PAGE_WIDTH = Dimensions.get('window').width;
    const PAGE_HEIGHT = Dimensions.get('window').height;

    const formatVietnamDate = (utcDate: string): string => {
        const vietnamDate = moment.utc(utcDate).tz('Asia/Ho_Chi_Minh');
        const formattedDate = vietnamDate.format('DD/MM/YYYY');
        return formattedDate;
    };

    return (
        <ScrollView style={{ backgroundColor: '#F8F8F8' }}>
            <Text style={styles.title}>Luyện tập</Text>
            <View style={{ marginLeft: 16 }}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    {practice.map((item: any, index: any) => (
                        <View key={index} style={styles.from_backgroud_event}>
                            <Image source={{ uri: item.coverImage }} style={styles.background_envent} />
                            <LinearGradient
                                colors={['rgba(12, 11, 11, 0.56)', 'rgba(39, 39, 39, 0)']}
                                start={{ x: 0.8, y: 0.8 }}
                                end={{ x: 0.8, y: 0 }}
                                style={{ position: 'absolute', bottom: 0, width: '100%', height: PAGE_HEIGHT * 0.15, borderRadius: 8 }}
                            />
                            <View style={styles.date_title}>
                                <View style={{ flexDirection: 'row' }}>
                                    {item.topic.slice(0, 3).map((topic: any, idx: any) => (
                                        <View key={idx} style={[styles.hastag1, { backgroundColor: hashtagColors[idx % hashtagColors.length] }]}>
                                            <Text style={styles.headingHastag}>#{topic}</Text>
                                        </View>
                                    ))}
                                </View>
                                <TouchableOpacity onPress={() => navigation.navigate('DetailsNewsScreen', { item, currentTabName })}>
                                    <Text numberOfLines={2} style={styles.title_heading}>{item.title}</Text>
                                </TouchableOpacity>
                                <View style={styles.footerEvent}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Clock size="16" color="#ffffff" style={{ marginRight: 5 }} />
                                        <Text style={{ fontWeight: '400', fontSize: 12, color: 'rgba(255, 255, 255, 1)', fontFamily: 'Roboto-Regular' }}>{formatVietnamDate(item.createdAt)}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image source={AppImage.userIcon} style={{ width: 16, height: 16, marginRight: 5, tintColor: 'rgba(255, 255, 255, 1)' }} />
                                        <Text style={{ color: 'rgba(255, 255, 255, 1)', fontWeight: '400', fontSize: 14, fontFamily: 'Roboto-Regular' }}>Midu Team</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
            {/* Các sự kiện liên quan */}
            <View style={{ marginTop: 30, marginBottom: 27 }}>
                <Text style={styles.header_heading}>Tin mới</Text>
                {practiceNews.slice(0, 6).map((item: any, index: any) => (
                    <DropShadow
                        key={index}
                        style={styles.shadowNews}
                    >
                        <View key={index} style={styles.fromEventNew}>
                            <View>
                                <Image source={{ uri: item.coverImage }} style={{ width: PAGE_WIDTH * 0.4, height: PAGE_HEIGHT * 0.13, borderRadius: 8 }} />
                                <View style={styles.overlay} />
                            </View>
                            <View style={{ width: PAGE_WIDTH * 0.5 }}>
                                <TouchableOpacity style={{ flexGrow: 1 }} onPress={() => navigation.navigate('DetailsNewsScreen', { item, currentTabName })}>
                                    <Text numberOfLines={4} style={styles.titleEvent2}>{item.title}</Text>
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 'auto' }}>
                                    <View style={{ flexDirection: 'row', marginTop: 'auto' }}>
                                        <Image source={AppImage.date} style={{ marginRight: 5 }} />
                                        <Text style={{ fontWeight: '400', fontSize: 12, color: 'rgba(166, 166, 166, 1)', fontFamily: 'Roboto-Regular' }}>{formatVietnamDate(item.createdAt)}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </DropShadow>
                ))}
            </View>
            {/* Các sự kiện liên quan */}
        </ScrollView>
    )
}

export default PracticeScreen;