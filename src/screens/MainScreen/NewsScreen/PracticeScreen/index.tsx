import axios from "axios";
import React, { useEffect, useState } from "react"
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import styles from "~screens/MainScreen/NewsScreen/PracticeScreen/styles";
import AppImage from "~utils/images/app_images";


const PracticeScreen = ({ navigation }: any) => {

    const [practiceNews, setPacticeNews] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('http://192.53.172.131:1050/news/news');
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

    return (
        <ScrollView style={{ marginHorizontal: 10, marginBottom: 15 }}>
            <Text style={styles.title}>Luyện tập</Text>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {practice.slice(0, 5).map((item: any, index: any) => (
                    <View key={index} style={styles.from_backgroud_event}>
                        {item.images.slice(0, 1).map((images: any, index: any) => (
                            <Image key={index} source={{ uri: images }} style={styles.background_envent} />
                        ))}
                        <View style={styles.date_title}>
                            <View style={{ flexDirection: 'row', marginHorizontal: 8 }}>
                                {item.topic.slice(0, 3).map((topic: any, idx: any) => (
                                    <View key={idx} style={[styles.hastag1, { backgroundColor: hashtagColors[idx % hashtagColors.length] }]}>
                                        <Text style={styles.headingHastag}>#{topic}</Text>
                                    </View>
                                ))}
                            </View>
                            <TouchableOpacity onPress={() => navigation.navigate('DetailsNewsScreen', { item })}>
                                <Text numberOfLines={2} style={styles.title_heading}>{item.title}</Text>
                            </TouchableOpacity>
                            <View style={styles.footerEvent}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={AppImage.date} style={{ marginRight: 5, tintColor: 'rgba(255, 255, 255, 1)' }} />
                                    <Text style={{ fontWeight: '400', fontSize: 12, color: 'rgba(255, 255, 255, 1)', fontFamily: 'Roboto-Regular' }}>{item.createdAt}</Text>
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
            {/* Các sự kiện liên quan */}
            <View style={{ marginTop: 30 }}>
                <Text style={styles.header_heading}>Tin mới</Text>
                {practiceNews.slice(0, 5).map((item: any, index: any) => (
                    <View key={index} style={styles.fromEventNew}>
                        {item.images.slice(0, 1).map((images: any, index: any) => (
                            <Image key={index} source={{ uri: images }} style={{ width: PAGE_WIDTH * 0.4, height: PAGE_HEIGHT * 0.13, borderRadius: 8 }} />
                        ))}
                        <View style={{ width: PAGE_WIDTH * 0.5 }}>
                            <TouchableOpacity style={{ flexGrow: 1 }} onPress={() => navigation.navigate('DetailsNewsScreen', { item })}>
                                <Text numberOfLines={4} style={styles.titleEvent2}>{item.title}</Text>
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 'auto' }}>
                                <View style={{ flexDirection: 'row', marginTop: 'auto' }}>
                                    <Image source={AppImage.date} style={{ marginRight: 5 }} />
                                    <Text style={{ fontWeight: '400', fontSize: 12, color: 'rgba(166, 166, 166, 1)', fontFamily: 'Roboto-Regular' }}>{item.createdAt}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                ))}
            </View>
            {/* Các sự kiện liên quan */}
        </ScrollView>
    )
}

export default PracticeScreen;