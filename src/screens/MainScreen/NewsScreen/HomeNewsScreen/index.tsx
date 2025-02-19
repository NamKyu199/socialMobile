import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react"
import { Dimensions, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import styles from "~screens/MainScreen/NewsScreen/HomeNewsScreen/styles";
import AppImage from "~utils/images/app_images";
import DropShadow from 'react-native-drop-shadow';
import { useRoute } from "@react-navigation/native";

const HomeNewsScreen = ({ navigation }: any) => {
    const route = useRoute();
    const currentTabName = route.name;
    const PAGE_WIDTH = Dimensions.get('window').width;
    const PAGE_HEIGHT = Dimensions.get('window').height;
    const hashtagColors = ['rgba(171, 81, 228, 1)', 'rgba(114, 46, 209, 1)', 'rgba(105, 24, 165, 1)', 'rgba(74, 10, 120, 1)', 'rgba(49, 0, 84, 1)'];

    const [toptrending, setToptrending] = useState([]);
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('http://192.53.172.131:1050/news/trending-news');
                setToptrending(response.data.newsInfo);
            }
            catch (error: any) {
                console.error('Error fetchingTopTrending News :', error.message)
            }
        };
        fetchNews();
    }, []);

    const [height, setHeight] = useState([]);
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('http://192.53.172.131:1050/news/five-news/typeId/1');
                setHeight(response.data.newsInfo);
            }
            catch (error: any) {
                console.error('Error fetchingheight News :', error.message)
            }
        };
        fetchNews();
    }, []);

    const [nutritious, setNutritious] = useState([]);
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('http://192.53.172.131:1050/news/five-news/typeId/2');
                setNutritious(response.data.newsInfo);
            }
            catch (error: any) {
                console.error('Error fetchingnutritious News :', error.message)
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
                console.error('Error fetchingpractice News :', error.message)
            }
        };
        fetchNews();
    }, []);

    const [homenews, setHomenews] = useState([]);
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('http://192.53.172.131:1050/news/news');
                setHomenews(response.data.newsInfo);
            }
            catch (error: any) {
                console.error('Error fetchinghomenews News :', error.message)
            }
        };
        fetchNews();
    }, []);

    const renderItem = ({ item, index }: any) => (
        <View key={index} style={{ width: PAGE_WIDTH * 0.44 }}>
            <View>
                <Image source={{ uri: item.coverImage }} style={{ width: PAGE_WIDTH * 0.44, height: 110, borderRadius: 8 }} />
                <View style={styles.overlay} />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('DetailsNewsScreen', { item, currentTabName })}>
                <Text numberOfLines={4} style={styles.titleEvent1}>{item.title}</Text>
            </TouchableOpacity>
        </View>
    );

    const formatVietnamDate = (utcDate: string): string => {
        const vietnamDate = moment.utc(utcDate).tz('Asia/Ho_Chi_Minh');
        const formattedDate = vietnamDate.format('DD/MM/YYYY');
        return formattedDate;
    };

    return (

        <ScrollView style={{ backgroundColor: '#F8F8F8' }}
            showsHorizontalScrollIndicator={false}>
            {/* Tin tức nổi bật */}
            <View style={{
                marginTop: 30
            }}>
                <View style={styles.from_header}>
                    <Text style={styles.header_heading}>Tin tức nổi bật</Text>
                </View>
                <View style={{marginLeft:16}}>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                        {toptrending.slice(0, 5).map((item: any, index: any) => (
                            <DropShadow
                                key={index}
                                style={styles.shadow}
                            >
                                <View style={styles.from_eventTop}>
                                    <View style={{ width: PAGE_WIDTH * 0.75, height: PAGE_HEIGHT * 0.21 }}>
                                        {item.coverImage && item.coverImage ? (
                                            <Image source={{ uri: item.coverImage }} style={styles.background_envent} />
                                        ) : (
                                            <Image style={styles.background_envent} source={AppImage.PosterNewsHome} />
                                        )}
                                        <View style={styles.overlay} />
                                    </View>
                                    <View style={{ marginTop: 8, flexDirection: 'row' }}>
                                        {item.topic.slice(0, 3).map((topic: any, idx: any) => (
                                            <View key={idx} style={[styles.hastag1, { backgroundColor: hashtagColors[idx % hashtagColors.length] }]}>
                                                <Text style={styles.headingHastag}>#{topic}</Text>
                                            </View>
                                        ))}
                                    </View>
                                    <TouchableOpacity onPress={() => navigation.navigate('DetailsNewsScreen', { item, currentTabName })} style={{ flexGrow: 1, width: PAGE_WIDTH * 0.75 }}>
                                        <Text numberOfLines={2} style={styles.titleEvent}>{item.title}</Text>
                                    </TouchableOpacity>
                                    <View style={styles.footerEvent}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image source={AppImage.date} style={{ marginRight: 5 }} />
                                            <Text style={{ fontWeight: '400', fontSize: 12, color: 'rgba(166, 166, 166, 1)', fontFamily: 'Roboto-Regular' }}>{formatVietnamDate(item.createdAt)}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image source={AppImage.userIcon} style={{ width: 16, height: 16, marginRight: 5 }} />
                                            <Text style={{ fontWeight: '400', fontSize: 12, color: 'rgba(166, 166, 166, 1)', fontFamily: 'Roboto-Regular' }}>Midu Team</Text>
                                        </View>
                                    </View>
                                </View>
                            </DropShadow>
                        ))}
                    </ScrollView>
                </View>
            </View>
            {/* Tin tức nổi bật */}
            {/* Chiều cao */}
            <View>
                <View style={styles.from_header}>
                    <Text style={{ fontWeight: '600', fontSize: 20, lineHeight: 25, color: 'rgba(30, 30, 30, 1)',letterSpacing:0.4 }}>Chiều cao</Text>
                </View>
                {height.slice(0, 1).map((item: any, index: any) => (
                    <DropShadow
                        key={index}
                        style={styles.shadowType}
                    >
                        <View style={styles.from_eventTop1}>
                            <View>
                                <Image source={{ uri: item.coverImage }} style={{
                                    height: PAGE_HEIGHT * 0.25,
                                    width: PAGE_WIDTH * 0.87,
                                    borderRadius: 8,
                                }} />
                                <View style={styles.overlay} />
                            </View>
                            <View style={{ marginTop: 4, flexDirection: 'row' }}>
                                {item.topic.slice(0, 3).map((topic: any, idx: any) => (
                                    <View key={idx} style={[styles.hastag1, { backgroundColor: hashtagColors[idx % hashtagColors.length] }]}>
                                        <Text style={styles.headingHastag}>#{topic}</Text>
                                    </View>
                                ))}
                            </View>
                            <TouchableOpacity style={{ flexGrow: 1 }} onPress={() => navigation.navigate('DetailsNewsScreen', { item, currentTabName })}>
                                <Text numberOfLines={2} style={styles.titleEvent}>{item.title}</Text>
                            </TouchableOpacity>
                        </View>
                    </DropShadow>
                ))}
                <FlatList
                    scrollEnabled={false}
                    data={height.slice(1, 4)}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    renderItem={renderItem}
                />
            </View>
            {/* Chiều cao */}
            {/* Dinh dưỡng */}
            <View style={{ marginTop: 30, }}>
                <View style={styles.from_header}>
                    <Text style={{ fontWeight: '600', fontSize: 20, lineHeight: 25, color: 'rgba(30, 30, 30, 1)' }}>Dinh dưỡng</Text>
                </View>
                {nutritious.slice(0, 1).map((item: any, index: any) => (
                    <DropShadow
                        key={index}
                        style={styles.shadowType}
                    >
                        <View style={styles.from_eventTop1}>
                            <View>
                                <Image source={{ uri: item.coverImage }} style={{
                                    height: PAGE_HEIGHT * 0.25,
                                    width: PAGE_WIDTH * 0.87,
                                    borderRadius: 8,
                                }} />
                                <View style={styles.overlay} />
                            </View>
                            <View style={{ marginTop: 4, flexDirection: 'row' }}>
                                {item.topic.slice(0, 3).map((topic: any, idx: any) => (
                                    <View key={idx} style={[styles.hastag1, { backgroundColor: hashtagColors[idx % hashtagColors.length] }]}>
                                        <Text style={styles.headingHastag}>#{topic}</Text>
                                    </View>
                                ))}
                            </View>
                            <TouchableOpacity style={{ flexGrow: 1 }} onPress={() => navigation.navigate('DetailsNewsScreen', { item, currentTabName })}>
                                <Text numberOfLines={2} style={styles.titleEvent}>{item.title}</Text>
                            </TouchableOpacity>
                        </View>
                    </DropShadow>
                ))}
                <FlatList
                    scrollEnabled={false}
                    data={nutritious.slice(1, 4)}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    renderItem={renderItem}
                />
            </View>
            {/* Dinh dưỡng */}
            {/* Luyện tập */}
            <View style={{ marginTop: 30, }}>
                <View style={styles.from_header}>
                    <Text style={{ fontWeight: '600', fontSize: 20, lineHeight: 25, color: 'rgba(30, 30, 30, 1)' }}>Luyện tập</Text>
                </View>
                {practice.slice(0, 1).map((item: any, index: any) => (
                    <DropShadow
                        key={index}
                        style={styles.shadowType}
                    >
                        <View style={styles.from_eventTop1}>
                            <View>
                                <Image key={index} source={{ uri: item.coverImage }} style={{
                                    height: PAGE_HEIGHT * 0.25,
                                    width: PAGE_WIDTH * 0.87,
                                    borderRadius: 8,
                                }} />
                                <View style={styles.overlay} />
                            </View>
                            <View style={{ marginTop: 4, flexDirection: 'row' }}>
                                {item.topic.slice(0, 3).map((topic: any, idx: any) => (
                                    <View key={idx} style={[styles.hastag1, { backgroundColor: hashtagColors[idx % hashtagColors.length] }]}>
                                        <Text style={styles.headingHastag}>#{topic}</Text>
                                    </View>
                                ))}
                            </View>
                            <TouchableOpacity style={{ flexGrow: 1 }} onPress={() => navigation.navigate('DetailsNewsScreen', { item, currentTabName })}>
                                <Text numberOfLines={2} style={styles.titleEvent}>{item.title}</Text>
                            </TouchableOpacity>
                        </View>
                    </DropShadow>
                ))}
                <FlatList
                    scrollEnabled={false}
                    data={practice.slice(1, 4)}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    renderItem={renderItem}
                />
            </View>
            {/* Luyện tập */}
            {/* Các sự kiện liên quan */}
            <View style={{ marginTop: 30, marginBottom: 27 }}>
                <Text style={styles.header_heading}>Tin mới</Text>
                {homenews.slice(0, 6).map((item: any, index: any) => (
                    <DropShadow
                        key={index}
                        style={styles.shadowNews}
                    >
                        <View style={styles.fromEventNew}>
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
    );
};

export default HomeNewsScreen;