import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppImage from '~utils/images/app_images';
import { ColorStar, StarIcon } from '~utils/images/svg';
import 'moment/locale/vi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '~services/ApiBaseUrl';

const EvaluateScreen = ({ route, navigation }: any) => {
    const { id } = route.params;
    const [reviewData, setReviewData] = useState<any>([]);
    const [voteDetail, setVoteDetail] = useState<any>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const reviewResponse = await axios.get(`http://192.53.172.131:1050/map/summaryReview/${id}`);
                setReviewData(reviewResponse.data);
                const voteResponse = await axios.get(`http://192.53.172.131:1050/map/formattedReviews/${id}`);
                setVoteDetail(voteResponse.data.reviews);
            } catch (error: any) {
                console.error('Error:', error.message);
            }
        };
        fetchData();
    }, [id]);

    const PAGE_WIDTH = Dimensions.get('window').width;
    const PAGE_HEIGHT = Dimensions.get('window').height;

    const PercentageBar = ({ starText, percentage }: any) => {
        const [animation] = useState(new Animated.Value(0));
        useEffect(() => {
            return Animated.timing(animation, {
                toValue: percentage,
                duration: 500,
                useNativeDriver: false
            }).start();
        }, [percentage]);

        return (
            <View style={{ flexDirection: "row", }}>
                <View style={styles.progressMiddle}>
                    <View style={styles.progressWrap}>
                        <Animated.View
                            style={[styles.progressBar,
                            {
                                width: animation.interpolate({
                                    inputRange: [0, 100],
                                    outputRange: ["0%", "100%"],
                                }),
                            },
                            ]}
                        />
                    </View>
                </View>
            </View>
        );
    };

    moment.locale('vi'); // Set the locale to Vietnamese

    const formatVietnamDate = (utcDate: string) => {
        const vietnamDate = moment.utc(utcDate).tz('Asia/Ho_Chi_Minh');
        return vietnamDate.fromNow();
    };

    const [userAvatar, setUserAvatar] = useState<any>('');
    const fetchAvatar = async () => {
        const accessToken = await AsyncStorage.getItem('accessToken')
        const response = await axios.get(`${BASE_URL}profile/getAvatar`,
            {
                headers: {
                    'Authorization': accessToken
                }
            }
        )
        setUserAvatar(response.data)
        console.log(response.data)
    }

    useEffect(() => {
        fetchAvatar()
    }, [])

    return (
        <ScrollView style={{ marginBottom: 20, backgroundColor: '#FFFFFF' }}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Image source={AppImage.leftArrowIcon} style={{ width: 15, height: 20, marginHorizontal: 24, marginTop: 25, marginBottom: 10 }} />
                </TouchableOpacity>
                <Text style={{ marginTop: 20, fontFamily: 'Roboto-Regular', fontSize: 18, fontWeight: '400', color: '#1E1E1E' }}>Công ty Midu</Text>
            </View>
            <View style={{ flexDirection: 'row', height: 40, marginTop: 26, justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#DDDDDDCC' }}>
                <TouchableOpacity style={{ marginLeft: 30 }} onPress={() => { navigation.goBack() }}>
                    <Text style={{ fontFamily: 'Roboto-Regular', fontWeight: '400', fontSize: 16, color: '#1E1E1E' }}>Tổng quan</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginRight: 100 }}>
                    <Text style={{ fontFamily: 'Roboto-Regular', fontWeight: '400', fontSize: 16, color: '#722ED1', borderBottomWidth: 1, paddingHorizontal: 10, borderColor: '#722ED1', paddingBottom: 20 }}>Đánh giá</Text>
                </TouchableOpacity>
            </View>
            <View style={{ borderBottomWidth: 1, paddingBottom: 20, borderColor: '#DDDDDDCC' }}>
                <View style={{ marginTop: 20, marginHorizontal: 20 }}>
                    <Text style={styles.title}>Số lượt đánh giá</Text>
                    <View style={{ flexDirection: 'row', marginTop: 12 }}>
                        <View style={{ alignSelf: 'center', marginBottom: 15 }}>
                            <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: '500', fontFamily: 'Roboto-Medium', color: '#1E1E1E' }}>{reviewData.averageRating}</Text>
                            <View style={styles.totalWrap}>
                                <View>
                                    {reviewData.averageRating >= 1 ? <ColorStar width={15} height={15} /> : <StarIcon width={15} height={15} />}
                                </View>
                                <View style={{ marginLeft: 5 }}>
                                    {reviewData.averageRating >= 2 ? <ColorStar width={15} height={15} /> : <StarIcon width={15} height={15} />}
                                </View>
                                <View style={{ marginLeft: 5 }}>
                                    {reviewData.averageRating >= 3 ? <ColorStar width={15} height={15} /> : <StarIcon width={15} height={15} />}
                                </View>
                                <View style={{ marginLeft: 5 }}>
                                    {reviewData.averageRating >= 4 ? <ColorStar width={15} height={15} /> : <StarIcon width={15} height={15} />}
                                </View>
                                <View style={{ marginLeft: 5 }}>
                                    {reviewData.averageRating >= 5 ? <ColorStar width={15} height={15} /> : <StarIcon width={15} height={15} />}
                                </View>
                            </View>
                            <Text style={{ alignSelf: 'center', color: '#ADAFB2', fontFamily: 'Roboto-Regular', fontWeight: '400' }}>({reviewData.totalReviews})</Text>
                        </View>
                        <View style={{ width: PAGE_WIDTH * 0.6, marginLeft: 40 }}>
                            <View style={styles.spacer}>
                                <PercentageBar percentage={95} />
                            </View>
                            <View style={styles.spacer}>
                                <PercentageBar percentage={70} />
                            </View>
                            <View style={styles.spacer}>
                                <PercentageBar percentage={50} />
                            </View>
                            <View style={styles.spacer}>
                                <PercentageBar percentage={10} />
                            </View>
                            <View style={styles.spacer}>
                                <PercentageBar percentage={30} />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ marginTop: 20, borderBottomWidth: 1, paddingBottom: 20, borderColor: '#DDDDDDCC' }}>
                <Text style={{ marginLeft: 16, fontWeight: '500', fontSize: 16, fontFamily: 'Roboto-Medium', color: '#000000' }}>Đánh giá</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginTop: 20 }}>
                    <View style={{ width: PAGE_WIDTH * 0.12, height: PAGE_HEIGHT * 0.06 }}>
                        <Image source={{ uri: userAvatar.avatar }} style={{ width: '100%', height: '100%', borderRadius: 50 }} />
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('CreateReviewsScreen', { id: id })}
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            paddingHorizontal: 20,
                            paddingVertical: 12,
                            borderColor: '#DDDDDD',
                            marginLeft: 10,
                            borderRadius: 8,
                        }}
                    >
                        <Text>Thêm nhận xét về địa điểm</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ marginTop: 20 }}>
                <Text style={{ marginHorizontal: 16, fontWeight: '500', fontFamily: 'Roboto-Medium', fontSize: 16, color: '#1E1E1E' }}>Bài đánh giá</Text>
                {voteDetail.map((item: any, index: number) => (
                    <View style={{ borderBottomWidth: 1, paddingBottom: 20, borderColor: '#DDDDDDCC', marginTop: 22, marginHorizontal: 16 }}>
                        <View key={index}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: PAGE_WIDTH * 0.12, height: PAGE_HEIGHT * 0.06 }}>
                                    <Image source={{ uri: item.avatar }} style={{ width: '100%', height: '100%', borderRadius: 50 }} />
                                </View>
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ fontWeight: '500', fontFamily: 'Roboto-Medium', fontSize: 14, color: '#1E1E1E' }}>{item.fullName}</Text>
                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                        <View>
                                            {item.rating >= 1 ? <ColorStar width={15} height={15} /> : <StarIcon width={15} height={15} />}
                                        </View>
                                        <View style={{ marginLeft: 5 }}>
                                            {item.rating >= 2 ? <ColorStar width={15} height={15} /> : <StarIcon width={15} height={15} />}
                                        </View>
                                        <View style={{ marginLeft: 5 }}>
                                            {item.rating >= 3 ? <ColorStar width={15} height={15} /> : <StarIcon width={15} height={15} />}
                                        </View>
                                        <View style={{ marginLeft: 5 }}>
                                            {item.rating >= 4 ? <ColorStar width={15} height={15} /> : <StarIcon width={15} height={15} />}
                                        </View>
                                        <View style={{ marginLeft: 5 }}>
                                            {item.rating >= 5 ? <ColorStar width={15} height={15} /> : <StarIcon width={15} height={15} />}
                                        </View>
                                        <Text style={{ marginLeft: 4, fontWeight: '500', fontFamily: 'Roboto-Medium', fontSize: 12, color: '#CCCCCC' }}>
                                            {formatVietnamDate(item.createdAt)}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <Text style={{ marginTop: 10, fontWeight: '400', fontFamily: 'Roboto-Regular', color: '#595959' }}>{item.comment}</Text>
                            {item.imagecomment.length > 0 && (
                                <View style={{
                                    width: PAGE_WIDTH * 0.9,
                                    height: PAGE_HEIGHT * 0.25,
                                    marginTop: 8,
                                    borderRadius: 4,
                                    alignSelf: 'center',
                                    marginHorizontal: 16
                                }}>
                                    <Image
                                        source={{ uri: item.imagecomment[0] }}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: 4,
                                        }}
                                    />
                                </View>
                            )}
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    progressMiddle: {
        height: 15,
        flex: 1,
        marginHorizontal: 10,
    },
    progressWrap: {
        backgroundColor: "#F5F8FF",
        borderRadius: 18,
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        padding: 2,
    },
    progressBar: {
        flex: 1,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: "#ffcc48",
        shadowOpacity: 1.0,
        shadowRadius: 4,
        backgroundColor: "#FFCC48",
        borderRadius: 18,
        minWidth: 5,
    },
    title: {
        fontWeight: '500',
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        color: "#323357",
    },
    totalWrap: {
        borderRadius: 40,
        flexDirection: "row",
        marginTop: 5,
        marginBottom: 5
    },
    spacer: {
        marginBottom: 5,
    },
})

export default EvaluateScreen;
