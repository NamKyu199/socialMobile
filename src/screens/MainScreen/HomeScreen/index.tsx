import React, { useEffect, useState } from "react";
import { Text, View, Dimensions, Image, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Carousel from 'react-native-reanimated-carousel';
import styles from "./styles";
import { useSharedValue } from "react-native-reanimated";
import { Eye, More } from "iconsax-react-native";
import { ColorLikeOne, LikeOne } from "~utils/images/svg";
import axios from "axios";
import TabberComponent from "~component/TabberComponent";
import AppImage from "~utils/images/app_images";
import { fontFamilies } from "~constant/fontFamilies";
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment-timezone';

const HomeScreen = ({ navigation }: any) => {

    const [selectedButton, setSelectedButton] = useState('interaction');
    const [questions, setQuestions] = useState<any[]>([]);
    const [likeIds, setLikeIds] = useState<string[]>([]);
    const [voteCounts, setVoteCounts] = useState<{ [key: string]: number }>({});
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('http://192.53.172.131:1050/community/trending-questions');
                const questionsData = response.data.questionsInfo;
                const initialLikeIds = questionsData.filter((item: any) => item.isVoted).map((item: any) => item.questionId);
                const initialVoteCounts = questionsData.reduce((acc: any, item: any) => {
                    acc[item.questionId] = item.totalVotes;
                    return acc;
                }, {});
                setQuestions(questionsData);
                setLikeIds(initialLikeIds);
                setVoteCounts(initialVoteCounts);
            } catch (error: any) {
                console.error('Error fetching questions:', error.message);
            }
        };
        fetchQuestions();
    }, []);
    const handlePress = async (values: any) => {
        const isLiked = likeIds.includes(values.questionId);
        let newLikeIds, newVoteCounts;
        if (!isLiked) {
            newLikeIds = [...likeIds, values.questionId];
            newVoteCounts = { ...voteCounts, [values.questionId]: (voteCounts[values.questionId] || values.totalVotes) + 1 };
        } else {
            newLikeIds = likeIds.filter((item) => values.questionId !== item);
            newVoteCounts = { ...voteCounts, [values.questionId]: voteCounts[values.questionId] - 1 };
        }
        setLikeIds(newLikeIds);
        setVoteCounts(newVoteCounts);
        try {
            const response = await fetch('http://192.53.172.131:1050/community/vote-question/' + values.questionId, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY2N2I3MTQ2Y2EwZDZiYmUyYzcyZTZmMCIsImZ1bGxOYW1lIjoiQWRtaW4iLCJlbWFpbCI6Im1pZHVhZG1pbkBnbWFpbC5jb20iLCJwaG9uZU51bWJlciI6IjA3OTYxODg4ODMiLCJwYXNzd29yZCI6IiQyYSQxMCRVR2NSVDBRMzZSTUh1T3VDbWtWZ2F1MHlqZ3hTaXZ4TjdvSExKaVN2eVpVaDZNUUMzTEtMQyIsImFjdGl2ZSI6dHJ1ZSwiZm9sbG93aW5nIjpbXSwiZm9sbG93ZXJzIjpbXSwidmlld3MiOjAsInZpZXdlZEJ5IjpbXSwiaXNBZG1pbiI6dHJ1ZSwiY3JlYXRlZEF0IjoiMjAyNC0wNi0yNlQwMTozOToxOC4yMzBaIiwidXBkYXRlZEF0IjoiMjAyNC0wNi0yNlQwMTozOToxOC4yMzBaIiwic2x1ZyI6ImFkbWluIiwicm9sZUlkIjoiNjYzODgwNzc2NGFhM2VmMzZmYzQ0MzFkIiwiX192IjowfSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzE5NDEwNTg4LCJleHAiOjE3MTk0OTY5ODh9.jMn4briglJur1BXEkxFBD7b0qX0j5M0tJmhv3l0O4zE',
                },
            });
            const result = await response.json();
            console.log('result:', result);
        } catch (error: any) {
            console.error('Error:', error.message);
        }
    };

    const hashtagColors = ['rgba(171, 81, 228, 1)', 'rgba(114, 46, 209, 1)', 'rgba(105, 24, 165, 1)', 'rgba(74, 10, 120, 1)', 'rgba(49, 0, 84, 1)'];
    const TopExpertColors = [
        { colors: ['#FFEB7A', '#FFD32F'], useGradient: true },
        { colors: ['#DFE0D0', '#C9CAB7'], useGradient: true },
        { colors: ['#F5B379', '#F18B34'], useGradient: true },
        { colors: ['#FFFFFF', '#FFFFFF'], useGradient: false },
        { colors: ['#FFFFFF', '#FFFFFF'], useGradient: false },
        { colors: ['#FFFFFF', '#FFFFFF'], useGradient: false },
        { colors: ['#FFFFFF', '#FFFFFF'], useGradient: false },
        { colors: ['#FFFFFF', '#FFFFFF'], useGradient: false },
        { colors: ['#FFFFFF', '#FFFFFF'], useGradient: false },
        { colors: ['#FFFFFF', '#FFFFFF'], useGradient: false },
        { colors: ['#FFFFFF', '#FFFFFF'], useGradient: false },
        { colors: ['#FFFFFF', '#FFFFFF'], useGradient: false },
        { colors: ['#FFFFFF', '#FFFFFF'], useGradient: false },
        { colors: ['#FFFFFF', '#FFFFFF'], useGradient: false },
        { colors: ['#FFFFFF', '#FFFFFF'], useGradienFt: false },
        { colors: ['#FFFFFF', '#FFFFFF'], useGradient: false },
        { colors: ['#FFFFFF', '#FFFFFF'], useGradient: false },
        { colors: ['#FFFFFF', '#FFFFFF'], useGradient: false },
        { colors: ['#FFFFFF', '#FFFFFF'], useGradient: false },
        { colors: ['#FFFFFF', '#FFFFFF'], useGradient: false },
    ];
    const checkRank = (index: number) => {
        switch (index) {
            case 0:
                return AppImage.gold_Medal;
            case 1:
                return AppImage.silver_Medal;
            case 2:
                return AppImage.bronze_Medal;
            default:
                return null;
        }
    };

    const renderRankView = (index: number) => {
        if (index > 2 && index <= 20) {
            return (
                <View style={{
                    backgroundColor: '#E87A13',
                    position: 'absolute',
                    zIndex: 1,
                    top: -5,
                    left: -5,
                    borderRadius: 17,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    minWidth: 16,
                    minHeight: 16,
                }}>
                    <Text style={{ color: '#FFFFFF', fontSize: 10, alignSelf: 'center', fontFamily: fontFamilies.regular, fontWeight: '500' }}>{index + 1}</Text>
                </View>
            );
        }
        return null;
    };

    const PAGE_WIDTH = Dimensions.get('window').width;
    const PAGE_HEIGHT = Dimensions.get('window').height;

    const progressValue = useSharedValue<number>(0);
    const baseOptions = {
        vertical: false,
        width: PAGE_WIDTH,
        height: PAGE_WIDTH * 0.6,
    } as const;

    const renderItem = ({ item, index }: any) => {
        return (
            <TouchableWithoutFeedback key={index} onPress={() => handleImagePress(item)}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.style_image}
                        source={{ uri: item.coverImage }}
                    />
                    <View style={styles.overlayContainer}>
                        <Text numberOfLines={2} style={styles.overlayText}>{item.title}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    };


    const handleImagePress = (item: any) => {
        navigation.navigate('DetailsNewsScreen', { item })
    };

    const [toptrending, setToptrendinh] = useState([]);
    useEffect(() => {
        const fetchToptreding = async () => {
            try {
                const response = await axios.get('http://192.53.172.131:1050/news/trending-news');
                setToptrendinh(response.data.newsInfo);
            }
            catch (error: any) {
                console.error('Error:', error.message)
            }
        };
        fetchToptreding();
    }, []);

    const [views, setViews] = useState([]);
    useEffect(() => {
        const fetchViews = async () => {
            try {
                const response = await axios.get('http://192.53.172.131:1050/home/calculate-views');
                setViews(response.data);
            } catch (error: any) {
                console.error('Error:', error.message);
            }
        };
        fetchViews();
    }, []);

    const [interaction, setInteraction] = useState([]);
    useEffect(() => {
        const fetchInterctions = async () => {
            try {
                const response = await axios.get('http://192.53.172.131:1050/home/calculate-interactions');
                setInteraction(response.data);
            } catch (error: any) {
                console.error('Error:', error.message);
            }
        };

        fetchInterctions();
    }, []);

    const [eventNews, setEventNews] = useState([]);
    useEffect(() => {
        const fetchEventNews = async () => {
            try {
                const response = await axios.get('http://192.53.172.131:1050/home/getAllEvents');
                setEventNews(response.data.events);
            }
            catch (error: any) {
                console.error('Error :', error.message)
            }
        };
        fetchEventNews();
    }, []);

    const getCurrentDate = () => {
        return moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD');
    };
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
        const dayOfWeek = daysOfWeek[vietnamDate.format('dddd')];
        const day = vietnamDate.date();
        const month = vietnamDate.month() + 1; // month() is zero-based, so we add 1
        const year = vietnamDate.year();
        return `${dayOfWeek}, ${day} THÁNG ${month} NĂM ${year}`;
    };

    return (
        <ScrollView>
            <TabberComponent />
            {/* Các tin tức đang chú í nhất */}
            <View style={{ marginTop: 20 }}>
                <View style={styles.from_header}>
                    <Text style={styles.header_heading}>Tin tức</Text>
                </View>
                <View style={{ zIndex: 999 }}>
                    <Carousel
                        {...baseOptions}
                        style={{
                            width: PAGE_WIDTH,
                            height: PAGE_HEIGHT * 0.3,
                        }}
                        loop
                        pagingEnabled
                        snapEnabled
                        autoPlay
                        autoPlayInterval={5000}
                        onProgressChange={(_, absoluteProgress) =>
                            (progressValue.value = absoluteProgress)
                        }
                        mode="parallax"
                        data={toptrending.slice(0, 5)}
                        renderItem={renderItem}
                    />
                </View>
            </View>
            {/* Các tin tức đang chú í nhất */}
            {/* Bảng xếp hạng các chuyên gia */}
            <View style={{ marginTop: 30, marginHorizontal: 15 }}>
                <Text style={styles.header_heading}>Bảng xếp hạng chuyên gia</Text>
                <View style={[styles.from_top]}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity onPress={() => setSelectedButton('interaction')}>
                            <View style={[styles.buttonSwitch, selectedButton === 'interaction' ? styles.selectedButton : styles.unselectedButton]}>
                                <Text style={[styles.buttonText, selectedButton === 'interaction' ? styles.selectedButtonText : styles.unselectedButtonText]}>Lượt tương tác</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity onPress={() => setSelectedButton('view')}>
                            <View style={[styles.buttonSwitch, selectedButton === 'view' ? styles.selectedButton : styles.unselectedButton]}>
                                <Text style={[styles.buttonText, selectedButton === 'view' ? styles.selectedButtonText : styles.unselectedButtonText]}>Lượt xem</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 20 }}>
                    <Text style={styles.header_chart1}>Hạng</Text>
                    <Text style={styles.header_chart2}>Tên</Text>
                    {selectedButton === 'interaction' && (
                        <Text style={styles.header_chart3}>Lượt tương tác</Text>
                    )}
                    {selectedButton === 'view' && (
                        <Text style={styles.header_chart3}>Lượt xem</Text>
                    )}
                </View>
                {selectedButton === 'interaction' && (
                    <ScrollView style={{ height: 400 }}>
                        {interaction && interaction.slice(0, 20).map((item: any, index: any) => {
                            const backgroundColor = TopExpertColors[index % TopExpertColors.length];
                            return (
                                <View
                                    key={index}
                                    style={[
                                        styles.from_gold_Medal,
                                        { backgroundColor: backgroundColor.useGradient ? 'transparent' : backgroundColor.colors[0] }
                                    ]}
                                >
                                    {backgroundColor.useGradient && (
                                        <LinearGradient
                                            // @ts-ignore
                                            colors={backgroundColor.colors}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 1 }}
                                            style={[StyleSheet.absoluteFill, { borderRadius: 8 }]}
                                        />
                                    )}
                                    <View style={{ width: PAGE_WIDTH * 0.12, height: PAGE_HEIGHT * 0.06, marginLeft: 15 }}>
                                        {index < 3 && <Image source={checkRank(index)} style={styles.top_Medal} />}
                                        {index >= 3 && renderRankView(index)}
                                        <Image source={{ uri: item.avatar }} style={{ width: '100%', height: '100%', borderRadius: 8 }} />
                                    </View>
                                    <Text style={styles.header_chart4}>{item.username}</Text>
                                    <Text style={styles.header_chart5}>{item.totalPoints}</Text>
                                </View>
                            );
                        })}
                    </ScrollView>
                )}
                {selectedButton === 'view' && (
                    <ScrollView style={{ height: 400 }}>
                        {views && views.slice(0, 20).map((item: any, index: any) => {
                            const backgroundColor = TopExpertColors[index % TopExpertColors.length];
                            return (
                                <View
                                    key={index}
                                    style={[
                                        styles.from_gold_Medal,
                                        { backgroundColor: backgroundColor.useGradient ? 'transparent' : backgroundColor.colors[0] }
                                    ]}
                                >
                                    {backgroundColor.useGradient && (
                                        <LinearGradient
                                            // @ts-ignore
                                            colors={backgroundColor.colors}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 1 }}
                                            style={[StyleSheet.absoluteFill, { borderRadius: 8 }]}
                                        />
                                    )}
                                    <View style={{ width: PAGE_WIDTH * 0.12, height: PAGE_HEIGHT * 0.06, marginLeft: 15 }}>
                                        {index < 3 && <Image source={checkRank(index)} style={styles.top_Medal} />}
                                        {index >= 3 && renderRankView(index)}
                                        <Image source={{ uri: item.avatar }} style={{ width: '100%', height: '100%', borderRadius: 8 }} />
                                    </View>
                                    <Text style={styles.header_chart4}>{item.fullName}</Text>
                                    <Text style={styles.header_chart5}>{item.views}</Text>
                                </View>
                            );
                        })}
                    </ScrollView>
                )}
            </View>
            {/* End of Bảng xếp hạng các chuyên gia */}
            {/* Sự kiện */}
            <View style={{ marginTop: 30 }}>
                <View style={styles.from_header}>
                    <Text style={styles.header_heading}>Sự kiện</Text>
                    <TouchableOpacity>
                        <Text style={styles.header_hyperlink}>Xem chi tiết</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {eventNews.map((item: any, index: any) => (
                        <View key={index} style={styles.from_backgroud_event}>
                            <View style={styles.imageContainer}>
                                <Image source={{ uri: item.image }} style={styles.background_envent} />
                                <View style={styles.overlayContainer}>
                                    {moment(item.startDate).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD') === getCurrentDate() ? (
                                        <>
                                            <View style={styles.from_check_event}>
                                                <Text style={styles.heading_check_event}>Đang diễn ra</Text>
                                            </View>
                                            <View style={styles.date_title}>
                                                <View style={styles.body_date}>
                                                    <Text style={styles.month}>{item.specificMonth}</Text>
                                                    <Text style={{ fontWeight: '700', fontSize: 32, color: 'rgba(231, 79, 177, 1)', alignSelf: 'center' }}>{item.specificDay}</Text>
                                                </View>
                                                <View style={{ justifyContent: 'center', width: PAGE_WIDTH * 0.6 }}>
                                                    <TouchableOpacity style={{ zIndex: 99, flexGrow: 1 }} onPress={() => { navigation.navigate('DetailsEventScreen', { item }) }}>
                                                        <Text style={styles.title_event1} numberOfLines={2}>{item.nameEvent}</Text>
                                                        <Text style={styles.interested_participate1}>{item.interestedUsers} người quan tâm - {item.participantUsers} người sẽ tham gia</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </>
                                    ) : moment(item.startDate).tz('Asia/Ho_Chi_Minh').isAfter(moment().tz('Asia/Ho_Chi_Minh'), 'day') ? (
                                        <>
                                            <View style={styles.from_check_event_process}>
                                                <Text style={styles.heading_check_event}>Sắp diễn ra</Text>
                                            </View>
                                            <View style={styles.date_title}>
                                                <TouchableOpacity style={{ zIndex: 99, flexGrow: 1 }} onPress={() => { navigation.navigate('DetailsEventScreen', { item }) }}>
                                                    <Text style={{ fontFamily: fontFamilies.back, fontWeight: '700', fontSize: 10, color: '#FFFFFF', marginLeft: 10 }}>{formatVietnamDate(item.startDate)}</Text>
                                                    <Text style={{ marginLeft: 10, fontWeight: '700', fontSize: 16, color: 'rgba(255, 255, 255, 1)', fontFamily: 'Roboto-Bold' }} numberOfLines={2}>{item.nameEvent}</Text>
                                                    <Text style={styles.interested_participate1}>{item.interestedUsers} người quan tâm - {item.participantUsers} người sẽ tham gia</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </>
                                    ) : null}
                                </View>
                            </View>
                            <Image source={AppImage.share} style={styles.shareIcon} />
                        </View>
                    ))}
                </ScrollView>
            </View>
            {/* Sự kiện */}
            {/* Những cậu hỏi đáng được quan tâm */}
            <View style={{ paddingBottom: 60 }}>
                <View style={{ paddingBottom: 60 }}>
                    <Text style={styles.header_topComment}>Top câu hỏi được quan tâm</Text>
                    {questions.slice(0, 5).map((item: any, index: any) => (
                        <View key={index} style={styles.from_question}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={AppImage.avatar} />
                                <View style={{ marginLeft: 12 }}>
                                    <Text style={styles.name_user}>{item.username}</Text>
                                    <Text style={styles.time_question}>{item.createdAt}</Text>
                                </View>
                                <TouchableOpacity style={{ position: 'absolute', right: 0, bottom: 18 }}>
                                    <More />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => navigation.navigate('QuestionDetailScreen', { questionData: item })}>
                                    <Text style={styles.title_question}>{item.title}</Text>
                                </TouchableOpacity>
                                <Text style={styles.title_summary}>{item.description}</Text>
                                {item.images.slice(0, 1).map((images: any, index: any) => (
                                    <View key={index} style={{ width: PAGE_WIDTH * 0.92, height: PAGE_HEIGHT * 0.3, marginTop: 5, borderRadius: 8, alignItems: 'center' }}>
                                        <Image source={{ uri: images }} style={styles.background_envent} />
                                    </View>
                                ))}
                            </View>
                            <View style={styles.hashtag}>
                                {item.topic.slice(0, 3).map((topic: any, idx: any) => (
                                    <View key={idx} style={[styles.from_hashtag, { backgroundColor: hashtagColors[idx % hashtagColors.length] }]}>
                                        <Text style={styles.heading_hashtag}>#{topic}</Text>
                                    </View>
                                ))}
                            </View>
                            <View style={styles.tabfooter}></View>
                            <View style={styles.footer}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={styles.from_heart}>
                                        <TouchableOpacity
                                            style={[
                                                styles.from_heart,
                                                { backgroundColor: likeIds.includes(item.questionId) ? 'rgba(82, 5, 127, 1)' : 'rgba(242, 242, 242, 1)' },
                                            ]}
                                            accessibilityLabel="Interested"
                                            accessibilityHint="Mark your interest for the event"
                                            onPress={() => handlePress(item)}
                                        >
                                            <View>
                                                {likeIds.includes(item.questionId) ? <ColorLikeOne /> : <LikeOne />}
                                            </View>
                                            <Text
                                                style={[
                                                    styles.icon_heart,
                                                    { color: likeIds.includes(item.questionId) ? 'rgba(255, 255, 255, 1)' : 'rgba(89, 89, 89, 1)' },
                                                ]}
                                            >
                                                {voteCounts[item.questionId] || item.totalVotes}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 24, alignSelf: 'center' }} onPress={() => navigation.navigate('QuestionDetailScreen', { questionData: item })}>
                                        <Image source={AppImage.commentIcon} />
                                        <Text style={styles.number_comment}>{item.totalAnswers}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Image source={AppImage.shareIcon} />
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Eye size={16} color="rgba(150, 143, 143, 1)" />
                                    <Text style={styles.number_eye}>{item.totalViews}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
            {/* Những cậu hỏi đáng được quan tâm */}
        </ScrollView>
    )
}

export default HomeScreen;