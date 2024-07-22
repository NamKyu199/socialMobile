import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, View, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import axios from "axios";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import ReadMore from '@fawazahmed/react-native-read-more';
import AppImage from "~utils/images/app_images";
import { Location, Profile2User, User } from "iconsax-react-native";
import { CheckOne, ColorCheckOne, ColorStar, LocationIcon, Star } from "~utils/images/svg";
import styles from "~screens/MainScreen/HomeScreen/DetailsEventScreen/styles";
import { fontFamilies } from "~constant/fontFamilies";
import moment from "moment";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DetailsEventScreen = ({ navigation, route }: any) => {
    const { item } = route.params;
    const [eventId, setEventId] = useState(null);
    const [event, setEvent] = useState({
        id: '',
        image: '',
        startDate: '',
        nameEvent: '',
        participantUsersCount: 0,
        createBy: '',
        company: '',
        descriptionSections: [
            {
                title: '',
                content: '',
                id: ''
            }
        ],
        location: { latitude: 0, longitude: 0 },
        address: '',
        type: ''
    });

    const [suggestedEvent, setSuggestedEvent] = useState([]);
    const PAGE_WIDTH = Dimensions.get('window').width;
    const PAGE_HEIGHT = Dimensions.get('window').height;

    useEffect(() => {
        const fetchPressedStates = async () => {
            try {
                const quanTamValue = await AsyncStorage.getItem(`pressedQuanTam${eventId}`);
                if (quanTamValue !== null) {
                    setPressedQuanTam(JSON.parse(quanTamValue));
                }
                const seThamGiaValue = await AsyncStorage.getItem(`pressedSeThamGia${eventId}`);
                if (seThamGiaValue !== null) {
                    setPressedSeThamGia(JSON.parse(seThamGiaValue));
                }
            } catch (error: any) {
                console.error('Error fetching pressed states from AsyncStorage:', error.message);
            }
        };

        fetchPressedStates();
    }, [eventId]);

    const [pressedQuanTam, setPressedQuanTam] = useState(false);
    const handleQuanTamPress = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken')
            const response = await axios.post(
                `http://192.53.172.131:1050/home/toggleInterestEvent/${eventId}`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': accessToken,
                    },
                }
            );
            const result = response.data;
            console.log('Toggle pressedQuanTam Result:', result);
            if (result.isInterested !== undefined) {
                setPressedQuanTam(result.isInterested);
                await AsyncStorage.setItem(`pressedQuanTam${eventId}`, JSON.stringify(result.isInterested));
            } else {
                console.error('Invalid toggleInterestEvent response:', result);
            }
        } catch (error: any) {
            console.error('Error toggling interest:', error.message);
        }
    };
    const [pressedSeThamGia, setPressedSeThamGia] = useState(false);
    const handleSeThamGiaPress = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken')
            const response = await axios.post(
                `http://192.53.172.131:1050/home/toggleParticipantEvent/${eventId}`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': accessToken,
                    },
                }
            );
            const result = response.data;
            console.log('Toggle pressedSeThamGia Result:', result);
            if (result.isInterested !== undefined) {
                setPressedSeThamGia(result.isInterested);
                await AsyncStorage.setItem(`pressedSeThamGia${eventId}`, JSON.stringify(result.isInterested));
            } else {
                console.error('Invalid toggleParticipantEvent response:', result);
            }
        } catch (error: any) {
            console.error('Error toggling participation:', error.message);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://192.53.172.131:1050/home/getEvent/${item.id}`);
                if (response.data && response.data.event) {
                    const fetchedEvent = response.data.event;
                    setEvent(fetchedEvent);
                    setPressedSeThamGia(fetchedEvent.isInterested);
                    const eventId = item.id;
                    setEventId(eventId)
                    await AsyncStorage.setItem('pressedSeThamGia', JSON.stringify(fetchedEvent.isInterested));
                } else {
                    console.error('Invalid response structure', response.data);
                }
            } catch (error: any) {
                console.error('Error fetching data:', error.message);
            }
        };
        fetchData();
    }, [item.id]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`http://192.53.172.131:1050/home/getAllEventsSuggest/${eventId}`);
                if (response.data && response.data.events) {
                    setSuggestedEvent(response.data.events);
                } else {
                    console.error('Invalid response structure', response.data);
                }
            } catch (error: any) {
                console.error('Error fetching events:', error.message);
            }
        };

        fetchEvents();
    }, [eventId]);

    moment.locale('en');
    const formatVietnamDate = (utcDate: any) => {
        const vietnamDate = moment.utc(utcDate).tz('Asia/Ho_Chi_Minh');
        const daysOfWeek: any = {
            'Sunday': 'CHỦ NHẬT',
            'Monday': 'THỨ HAI',
            'Tuesday': 'THỨ BA',
            'Wednesday': 'THỨ TƯ',
            'Thursday': 'THỨ NĂM',
            'Friday': 'THỨ SÁU',
            'Saturday': 'THỨ BẢY'
        };
        const englishDayOfWeek = vietnamDate.format('dddd');
        const dayOfWeek = daysOfWeek[englishDayOfWeek];
        const day = vietnamDate.date();
        const month = vietnamDate.month() + 1;
        const year = vietnamDate.year();
        return `${dayOfWeek}, ${day} THÁNG ${month} NĂM ${year}`;
    };

    return (
        <View style={styles.container}>
            <View style={styles.from_hearder}>
                <TouchableOpacity onPress={() => navigation.navigate('MainScreen')} style={{ paddingRight: 20, paddingVertical: 10 }}>
                    <Image source={AppImage.leftArrowIcon} style={styles.back} />
                </TouchableOpacity>
                <Text style={styles.heading_header}>Sự kiện</Text>
                <View></View>
            </View>
            <ScrollView >
                <View style={styles.imageContainer}>
                    {event.image ? (
                        <Image source={{ uri: event.image }} style={styles.poster} />
                    ) : (
                        <Text>No image available</Text>
                    )}
                    <LinearGradient
                        colors={['#FFFFFF', 'transparent']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 0.5 }}
                        style={[styles.gradient, styles.gradientTop]}
                    />
                    <LinearGradient
                        colors={['transparent', '#FFFFFF']}
                        start={{ x: 0.5, y: 0.5 }}
                        end={{ x: 0.5, y: 1 }}
                        style={[styles.gradient, styles.gradientBottom]}
                    />
                </View>
                <View style={{ flexGrow: 1, marginTop: PAGE_HEIGHT * 0.27 }}>
                    <View style={styles.textOverlay}>
                        <Text style={styles.title_date}>{formatVietnamDate(event.startDate)}</Text>
                        <Text style={styles.title_event}>{event.nameEvent}</Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <View style={{ marginHorizontal: 15 }}>
                            <View style={styles.from_flowing}>
                                <TouchableOpacity
                                    style={[
                                        styles.careAbout,
                                        { backgroundColor: pressedQuanTam ? 'rgba(82, 5, 127, 1)' : 'rgba(242, 242, 242, 1)' },
                                    ]}
                                    accessibilityLabel="Interested"
                                    accessibilityHint="Mark your interest for the event"
                                    onPress={handleQuanTamPress}
                                >
                                    <View style={styles.titleIcon}>
                                        {pressedQuanTam ? <ColorStar width={15} height={15} /> : <Star width={15} height={15} />}
                                    </View>
                                    <Text style={[
                                        styles.headingAbout,
                                        { color: pressedQuanTam ? 'rgba(255, 255, 255, 1)' : 'rgba(89, 89, 89, 1)' },
                                    ]}>
                                        Quan tâm
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.careAbout,
                                        { backgroundColor: pressedSeThamGia ? 'rgba(82, 5, 127, 1)' : 'rgba(242, 242, 242, 1)' },
                                    ]}
                                    accessibilityLabel="Will attend"
                                    accessibilityHint="Mark your attendance for the event"
                                    onPress={handleSeThamGiaPress}
                                >
                                    <View style={styles.titleIcon}>
                                        {pressedSeThamGia ? <ColorCheckOne /> : <CheckOne />}
                                    </View>
                                    <Text style={[
                                        styles.headingAbout,
                                        { color: pressedSeThamGia ? 'rgba(255, 255, 255, 1)' : 'rgba(89, 89, 89, 1)' },
                                    ]}>
                                        Sẽ tham gia
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.from_share} accessibilityLabel="Share" accessibilityHint="Share this event">
                                    <Image source={AppImage.share} style={styles.shareIcon} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.from_information}>
                                <Text style={styles.title_infomation}>Chi tiết</Text>
                                <View style={styles.information}>
                                    <Profile2User color="rgba(166, 166, 166, 1)" variant="Bold" size={20} />
                                    <Text style={styles.heading_information}>{event.participantUsersCount} người đăng ký tham gia</Text>
                                </View>
                                <View style={styles.information}>
                                    <User color="rgba(166, 166, 166, 1)" variant="Bold" size={20} />
                                    <Text style={styles.heading_information}>Sự kiện của {event.createBy}</Text>
                                </View>
                                <View style={styles.information}>
                                    <Location color="rgba(166, 166, 166, 1)" variant="Bold" size={20} />
                                    <Text style={styles.heading_information_link}>{event.company}</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={styles.title_text}>1.{event.descriptionSections[0]?.title}</Text>
                                <ReadMore numberOfLines={3}
                                    animate={true}
                                    expandOnly={true}
                                    seeMoreText="Đọc thêm"
                                    seeMoreStyle={styles.seeMore}
                                    style={styles.textStyle}
                                >
                                    {event.descriptionSections[0]?.content}
                                </ReadMore>
                            </View>
                            <View style={{ marginTop: 15 }}>
                                <Text style={styles.title_text}>2.{event.descriptionSections[1]?.title}</Text>
                                <ReadMore numberOfLines={5}
                                    animate={true}
                                    expandOnly={true}
                                    seeMoreText="Đọc thêm"
                                    seeMoreStyle={styles.seeMore}
                                    style={styles.textStyle}
                                >
                                    {event.descriptionSections[1]?.content}
                                </ReadMore>
                            </View>
                        </View>
                        <View style={{ marginTop: 20, marginHorizontal: 16 }}>
                            <Text style={styles.from_location}>Vị trí</Text>
                            <View style={styles.body_location}>
                                <MapView
                                    provider={PROVIDER_GOOGLE}
                                    style={styles.map}
                                    region={{
                                        latitude: event.location.latitude,
                                        longitude: event.location.longitude,
                                        latitudeDelta: 0.001,
                                        longitudeDelta: 0.001,
                                    }}>
                                    <Marker
                                        coordinate={{ latitude: event.location.latitude, longitude: event.location.longitude }}
                                    >
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={styles.iconWrapper}>
                                                <LocationIcon style={{ width: 40, height: 50 }} />
                                            </View>
                                            <Text style={{
                                                fontSize: 14,
                                                color: '#E74FB1',
                                                fontFamily: fontFamilies.medium,
                                                fontWeight: '500',
                                                alignSelf: 'center',
                                                padding: 'auto'
                                            }}>{event.company}</Text>
                                        </View>
                                    </Marker>
                                </MapView>
                                <View style={styles.from_location_map}>
                                    <Text style={styles.title_map}>{event.company}</Text>
                                    <Text style={styles.location_map}>{event.address}</Text>
                                    <Text style={styles.location}>{event.type}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ marginTop: 20, marginBottom: 40, marginHorizontal: 16 }}>
                            <Text style={styles.title_suggested_event}>Sự kiện gợi ý</Text>
                            {suggestedEvent.slice(0, 2).map((suggestedEvent: any, index: any) => (
                                <View key={index} style={styles.from_date}>
                                    <View style={{ flexDirection: 'row', paddingTop: 8, paddingHorizontal: 8, paddingBottom: 8 }}>
                                        <View style={styles.body_date}>
                                            <Text style={styles.month}>Tháng</Text>
                                            <Text style={{ fontWeight: '700', fontSize: 36, color: 'rgba(231, 79, 177, 1)', alignSelf: 'center' }}>{suggestedEvent.specificMonth}</Text>
                                        </View>
                                        <View style={{ marginTop: 5, alignSelf: 'center', width: PAGE_WIDTH * 0.67, marginLeft: 9 }}>
                                            <Text style={styles.time_event}>{formatVietnamDate(suggestedEvent.startDate)}</Text>
                                            <Text numberOfLines={2} style={styles.title_time_event}>{suggestedEvent.nameEvent}</Text>
                                            <Text style={styles.location_event}>{suggestedEvent.address}</Text>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default DetailsEventScreen;