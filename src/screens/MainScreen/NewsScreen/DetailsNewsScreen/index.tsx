import React, { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, Text, useWindowDimensions, View } from "react-native"
import styles from "~screens/MainScreen/NewsScreen/DetailsNewsScreen/styles";
import AppImage from "~utils/images/app_images";
import { Clock, CloseCircle, Eye } from "iconsax-react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
import { ColorLikeOne, LikeOne } from "~utils/images/svg";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from 'moment-timezone';
import 'moment/locale/vi';
import HTML from 'react-native-render-html';

const DetailsNewsScreen = ({ route, navigation }: any) => {

    const { item } = route.params;
    const { currentTabName } = route.params;
    const PAGE_WIDTH = Dimensions.get('window').width;
    const PAGE_HEIGHT = Dimensions.get('window').height;
    const [pressedLike, setPressedLike] = useState(false);
    const [news, setNews] = useState({
        "newsId": '',
        "title": '',
        "topic": [''],
        "description": '',
        "coverImage": '',
        "createdAt": '',
        "totalLikes": '',
        "totalViews": '',
        "totalShares": '',
        "isLiked": '',
    });
    const [newMore, setNewMore] = useState([]);

    const [newids, setNewids] = useState(null);
    const handleLikePress = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            const response = await axios.put(
                `http://192.53.172.131:1050/news/like-news/${newids}`,
                {},
                {
                    headers: {
                        'Authorization': accessToken,
                    },
                },
            );
            const result = response.data;
            console.log('Toggle PressedLike Result:', result);
            if (result.isLiked !== undefined) {
                setPressedLike(result.isLiked);
                await AsyncStorage.setItem(`pressedLike${newids}`, JSON.stringify(result.isLiked));
            } else {
                console.error('Invalid like-news response:', result);
            }
        } catch (error: any) {
            console.error('Error Like News:', error.message);
        }
    };

    useEffect(() => {
        const fetchPressedLike = async () => {
            try {
                const likeValue = await AsyncStorage.getItem(`pressedLike${newids}`);
                if (likeValue !== null) {
                    setPressedLike(JSON.parse(likeValue));
                }
            } catch (error: any) {
                console.error('Error fetching pressed states from AsyncStorage:', error.message);
            }
        };

        fetchPressedLike();
    }, [newids]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://192.53.172.131:1050/news/news/${item.newsId}`);
                if (response.data && response.data.newsInfo) {
                    const fetchedNews = response.data.newsInfo;
                    setNews(fetchedNews);
                    setPressedLike(fetchedNews.isLiked);
                    setNewids(item.newsId);
                    const fetchedNewMore = response.data.sameTypeNewsInfo
                    setNewMore(fetchedNewMore)
                    await AsyncStorage.setItem(`pressedLike${item.newsId}`, JSON.stringify(fetchedNews.isLiked));
                } else {
                    console.error('Invalid response structure', response.data);
                }
            } catch (error: any) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, [item.newsId]);

    moment.locale('vi');
    const daysOfWeek = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

    const formatVietnamDateMore = (utcDate: string): string => {
        const vietnamDate = moment.utc(utcDate).tz('Asia/Ho_Chi_Minh');
        const dayOfWeek = daysOfWeek[vietnamDate.day()];
        const formattedDate = vietnamDate.format('DD/MM/YYYY HH:mm');
        return `${dayOfWeek}, ${formattedDate}`;
    };

    const formatVietnamDate = (utcDate: string) => {
        const vietnamDate = moment.utc(utcDate).tz('Asia/Ho_Chi_Minh');
        return vietnamDate.fromNow();
    };
    const hashtagColors = ['rgba(171, 81, 228, 1)', 'rgba(114, 46, 209, 1)', 'rgba(105, 24, 165, 1)', 'rgba(74, 10, 120, 1)', 'rgba(49, 0, 84, 1)'];
    const { width: contentWidth } = useWindowDimensions();
    const isValidImageUri = (uri: any) => uri && uri.trim() !== '';

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 16, width: PAGE_WIDTH * 0.8, marginHorizontal: 16 }}>
                <TouchableOpacity>
                    <Text style={{ fontWeight: '400', fontSize: 14, lineHeight: 17, color: 'rgba(89, 89, 89, 1)', fontFamily: 'Roboto-Regular' }}>{currentTabName}</Text>
                </TouchableOpacity>
                <Text style={{ fontWeight: '400', fontSize: 14, lineHeight: 17, color: 'rgba(89, 89, 89, 1)', marginLeft: 7, marginRight: 5, fontFamily: 'Roboto-Regular' }}>{">"}</Text>
                <Text style={{ fontWeight: '400', fontSize: 14, lineHeight: 17, color: 'rgba(231, 79, 177, 1)', fontFamily: 'Roboto-Regular', letterSpacing: 0.4 }}>{news.title}</Text>
            </View>
            <ScrollView>
                {isValidImageUri(news.coverImage) && (
                    <Image source={{ uri: news.coverImage }} style={{ height: 250, width: '100%' }} />
                )}
                <View style={{ backgroundColor: '#FFFFFF', paddingBottom: 20, paddingHorizontal: 20 }}>
                    <View style={{ marginTop: 20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Clock color="#A6A6A6" size={14} />
                                <Text style={{ fontWeight: '400', fontSize: 12, lineHeight: 15, marginLeft: 5, fontFamily: 'Roboto-Regular' }}>{formatVietnamDateMore(news.createdAt)}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginRight: 40 }}>
                                <Image source={AppImage.userIcon} style={{ height: 14, width: 14 }} />
                                <Text style={{ fontWeight: '400', fontSize: 12, lineHeight: 15, marginLeft: 5, fontFamily: 'Roboto-Regular' }}>Midu Team</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 8, flexDirection: 'row' }}>
                            {item.topic.slice(0, 3).map((topic: any, idx: any) => (
                                <View key={idx} style={[styles.hastag1, { backgroundColor: hashtagColors[idx % hashtagColors.length] }]}>
                                    <Text style={styles.headingHastag}>#{topic}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <HTML source={{ html: news.description }} contentWidth={contentWidth} />
                    </View>
                </View>
                <View style={{ marginTop: 30,marginBottom:28 }}>
                    <View style={{ borderLeftWidth: 6, marginLeft: 16, borderColor: 'rgba(151, 78, 195, 1)', }}>
                        <Text style={{ fontWeight: '600', fontSize: 22, lineHeight: 30, color: 'rgba(30, 30, 30, 1)', fontFamily: 'Roboto-Medium', marginLeft: 8 }}>Tin cùng chuyên mục</Text>
                    </View>
                    {newMore.map((news: any, index: any) => (
                        <View key={index} style={styles.fromEventNew}>
                            <View>
                                <Image key={index} source={{ uri: news.coverImage }} style={{ width: PAGE_WIDTH * 0.4, height: PAGE_HEIGHT * 0.13, borderRadius: 8 }} />
                                <View style={styles.overlay} />
                            </View>
                            <View style={{ width: PAGE_WIDTH * 0.5 }}>
                                <TouchableOpacity style={{ flexGrow: 1 }}>
                                    <Text numberOfLines={4} style={styles.titleEvent2}>{news.title}</Text>
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'row', marginTop: 'auto', marginLeft: 8 }}>
                                    <Image source={AppImage.date} style={{ marginRight: 5 }} />
                                    <Text style={{ fontWeight: '400', fontSize: 12, color: 'rgba(166, 166, 166, 1)', fontFamily: 'Roboto-Regular' }}>{formatVietnamDate(news.createdAt)}</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <View style={{ flexDirection: 'row', backgroundColor: '#FFFFFF', height: 90, borderTopRightRadius: 24, borderTopLeftRadius: 24, justifyContent: 'space-between', paddingHorizontal: 12 }}>
                <TouchableOpacity
                    style={[
                        styles.from_heart,
                        { backgroundColor: pressedLike ? 'rgba(82, 5, 127, 1)' : 'rgba(242, 242, 242, 1)' },
                    ]}
                    accessibilityLabel="Interested"
                    accessibilityHint="Mark your interest for the News"
                    onPress={handleLikePress}
                >
                    <View style={{ alignSelf: 'center', marginTop: 17 }}>
                        {pressedLike ? <ColorLikeOne /> : <LikeOne />}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: '#F2F2F2', height: PAGE_HEIGHT * 0.06, width: PAGE_WIDTH * 0.2, borderRadius: 20, marginTop: 25 }}>
                    <Text style={{ alignSelf: 'center', marginTop: 15, fontWeight: '500', fontSize: 16, lineHeight: 18, color: 'rgba(89, 89, 89, 1)' }}>Chia sẻ</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <CloseCircle size="60" color="#e74fb1" variant="Bold" style={{ marginTop: 5 }} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', marginTop: 35 }}>
                    <Eye size="25" color="rgba(150, 143, 143, 1)" style={{ marginRight: 5 }} />
                    <Text style={{ fontWeight: '400', fontSize: 16, lineHeight: 18, marginTop: 4, fontFamily: 'Roboto-Regular', marginRight: 5 }}>{news.totalViews}</Text>
                    <Text style={{ fontWeight: '400', fontSize: 16, lineHeight: 18, marginTop: 4, fontFamily: 'Roboto-Regular' }}>Người xem</Text>
                </View>
            </View>
        </View>
    )
}

export default DetailsNewsScreen;