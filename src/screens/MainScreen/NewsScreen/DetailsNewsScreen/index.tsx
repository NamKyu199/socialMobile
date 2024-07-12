import React, { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, Text, useWindowDimensions, View } from "react-native"
import styles from "~screens/MainScreen/NewsScreen/DetailsNewsScreen/styles";
import AppImage from "~utils/images/app_images";
import { Clock, CloseCircle, Eye } from "iconsax-react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
import { ColorLikeOne, LikeOne } from "~utils/images/svg";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import HTML from 'react-native-render-html';

const DetailsNewsScreen = ({ route, navigation }: any) => {

    const { item } = route.params;
    console.log('data:', item)
    const [pressed, setPressed] = useState(false);
    const [likeIcon, setLikeIcon] = useState(<LikeOne />);
    const PAGE_WIDTH = Dimensions.get('window').width;
    const PAGE_HEIGHT = Dimensions.get('window').height;

    const handlePress = async () => {
        const newPressed = !pressed;
        setPressed(newPressed);

        const newLikeIcon = likeIcon.type === ColorLikeOne ? <LikeOne /> : <ColorLikeOne />;
        setLikeIcon(newLikeIcon);

        try {
            const accessToken = await AsyncStorage.getItem('accessToken')
            const response = await axios.put('http://192.53.172.131:1050/news/like-news/' + item.newsId,
                {},
                {
                    headers: {
                        'authorization': accessToken
                    }
                }
            )
        } catch (error: any) {
            console.error('Error', error.message);
        }
    };

    const [toptrending, setToptrendinh] = useState([]);
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('http://192.53.172.131:1050/news/trending-news');
                setToptrendinh(response.data.newsInfo);
                console.log(response.data.newsInfo.images)
            }
            catch (error: any) {
                console.error('Error fetching News :', error.message)
            }
        };
        fetchNews();
    }, []);

    const formatVietnamDate = (utcDate: string): string => {
        const vietnamDate = moment.utc(utcDate).tz('Asia/Ho_Chi_Minh');
        const formattedDate = vietnamDate.format('DD/MM/YYYY');
        return formattedDate;
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 20, marginBottom: 20 }}>
                <TouchableOpacity>
                    <Text style={{ fontWeight: '400', fontSize: 16, lineHeight: 17, color: 'rgba(89, 89, 89, 1)', fontFamily: 'Roboto-Regular' }}>Home</Text>
                </TouchableOpacity>
                <Text style={{ fontWeight: '400', fontSize: 16, lineHeight: 17, color: 'rgba(89, 89, 89, 1)', marginLeft: 7, marginRight: 5, fontFamily: 'Roboto-Regular' }}>{">"}</Text>
                <Text style={{ fontWeight: '400', fontSize: 16, lineHeight: 17, color: 'plum', fontFamily: 'Roboto-Regular' }}>Câu chuyện về Midu</Text>
            </View>
            <ScrollView>
                <Image source={{ uri: item.coverImage }} style={{ height: 250, width: '100%' }} />
                <View style={{ backgroundColor: '#FFFFFF', paddingBottom: 20, paddingHorizontal: 20 }}>
                    <View style={{ marginTop: 20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Clock color="#A6A6A6" size={14} />
                                <Text style={{ fontWeight: '400', fontSize: 12, lineHeight: 15, marginLeft: 5, fontFamily: 'Roboto-Regular' }}>{formatVietnamDate(item.createdAt)}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginRight: 40 }}>
                                <Image source={AppImage.userIcon} style={{ height: 14, width: 14 }} />
                                <Text style={{ fontWeight: '400', fontSize: 12, lineHeight: 15, marginLeft: 5, fontFamily: 'Roboto-Regular' }}>Midu Team</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 20 }}>
                            <View style={{ backgroundColor: '#AB51E4', borderRadius: 16 }}>
                                <Text style={{ alignSelf: 'center', color: '#FFFFFF', fontWeight: '500', fontSize: 13, paddingHorizontal: 10, fontFamily: 'Roboto-Medium', marginHorizontal: 12, marginVertical: 6 }}>#{item.topic[0]}</Text>
                            </View>
                            <View style={{ backgroundColor: '#722ED1', borderRadius: 16, marginHorizontal: 5 }}>
                                <Text style={{ alignSelf: 'center', color: '#FFFFFF', fontWeight: '500', fontSize: 13, fontFamily: 'Roboto-Medium', marginHorizontal: 12, marginVertical: 6 }}>#{item.topic[1]}</Text>
                            </View>
                            <View style={{ backgroundColor: 'rgba(105, 24, 165, 1)', borderRadius: 16 }}>
                                <Text style={{ alignSelf: 'center', color: '#FFFFFF', fontWeight: '500', fontSize: 13, fontFamily: 'Roboto-Medium', marginHorizontal: 12, marginVertical: 6 }}>#{item.topic[2]}</Text>
                            </View>
                        </View>
                    </View>
                    <HTML source={{ html: item.description }} />
                </View>
                <View style={{ marginTop: 30 }}>
                    <Text style={{ borderLeftWidth: 6, paddingLeft: 15, borderColor: 'rgba(151, 78, 195, 1)', fontWeight: '600', fontSize: 22, lineHeight: 30, color: 'rgba(30, 30, 30, 1)', fontFamily: 'Roboto-Medium' }}>Tin cùng chuyên mục</Text>
                    {toptrending.slice(0, 10).map((item: any, index: any) => (
                        <View key={index} style={styles.fromEventNew}>
                            <Image key={index} source={{ uri: item.coverImage }} style={{ width: PAGE_WIDTH * 0.4, height: PAGE_HEIGHT * 0.13, borderRadius: 8 }} />
                            <View style={{ width: PAGE_WIDTH * 0.5 }}>
                                <TouchableOpacity style={{ flexGrow: 1 }}>
                                    <Text numberOfLines={4} style={styles.titleEvent2}>{item.title}</Text>
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 'auto' }}>
                                    <Image source={AppImage.date} style={{ marginRight: 5 }} />
                                    <Text style={{ fontWeight: '400', fontSize: 12, color: 'rgba(166, 166, 166, 1)', fontFamily: 'Roboto-Regular' }}>{formatVietnamDate(item.createdAt)}</Text>
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
                        { backgroundColor: pressed ? 'rgba(82, 5, 127, 1)' : 'rgba(242, 242, 242, 1)' },
                    ]}
                    accessibilityLabel="Interested"
                    accessibilityHint="Mark your interest for the event"
                    onPress={handlePress}
                >
                    <View style={{ alignSelf: 'center', marginTop: 17 }}>
                        {likeIcon}
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
                    <Text style={{ fontWeight: '400', fontSize: 16, lineHeight: 18, marginTop: 4, fontFamily: 'Roboto-Regular', marginRight: 5 }}>{item.totalViews}</Text>
                    <Text style={{ fontWeight: '400', fontSize: 16, lineHeight: 18, marginTop: 4, fontFamily: 'Roboto-Regular' }}>Người xem</Text>
                </View>
            </View>
        </View>
    )
}

export default DetailsNewsScreen;