import React, { useCallback, useEffect, useRef, useState } from "react"
import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { Archive, ArchiveSlash, ArrowDown2, } from "iconsax-react-native";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet"
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { QuestionModel } from "~models/QuestionModel";
import { BASE_URL } from "~services/ApiBaseUrl";
import { useFocusEffect } from "@react-navigation/native";
import SocialActions from "~component/QuestionActions";
import ContentCard from "~component/QuestionContent";
import QuestionHeader from "~component/QuestionHeader";

const InterestedRoute = () => {
    const [questionSaveData, setQuestionSaveData] = useState<QuestionModel[]>([]);
    const [questionInterestedData, setQuestionInterestedData] = useState<QuestionModel[]>([]);
    const [showSaveQuestion, setShowSaveQuestion] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const bottomSheetSaveQuestionRef = useRef<(BottomSheetModal | null)[]>([]);
    const bottomSheetUnSaveQuestionRef = useRef<(BottomSheetModal | null)[]>([]);

    useEffect(() => {
        const fetchUserId = async () => {
            const id = await AsyncStorage.getItem('userId');
            setUserId(id);
        };

        fetchUserId();
    }, []);

    const fetchSavedQuestions = async () => {
        if (userId !== null) {
            try {
                const accessToken = await AsyncStorage.getItem('accessToken')
                const response = await axios.get(`${BASE_URL}community/saved-questions`,
                    {
                        headers: {
                            'authorization': accessToken
                        }
                    },
                )
                const fetchedSaveQuestions = response.data.questionsInfo.map(
                    (value: any) => new QuestionModel(
                        value.questionId,
                        value.title,
                        value.topic,
                        value.description,
                        value.images,
                        value.createdAt,
                        value.userId,
                        value.username,
                        value.totalVotes,
                        value.totalViews,
                        value.totalShares,
                        value.totalAnswers,
                        value.isVoted,
                        value.isSaved,
                    )
                )
                setQuestionSaveData(fetchedSaveQuestions)
            } catch (error: any) {

            }
        }
    }

    const fetchInterestedQuestions = async () => {
        if (userId !== null) {
            try {
                const response = await axios.get(`${BASE_URL}community/similar-questions`)
                const fetchedInterestedQuestions = response.data.questionsInfo.map(
                    (value: any) => new QuestionModel(
                        value.questionId,
                        value.title,
                        value.topic,
                        value.description,
                        value.images,
                        value.createdAt,
                        value.userId,
                        value.username,
                        value.totalVotes,
                        value.totalViews,
                        value.totalShares,
                        value.totalAnswers,
                        value.isVoted,
                        value.isSaved,
                    )
                )
                setQuestionInterestedData(fetchedInterestedQuestions)
            } catch (error: any) {

            }
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchSavedQuestions()
            fetchInterestedQuestions()
        }, [userId])
    )

    // const handleDeleteQuestion = async (questionId: string) => {
    //     try {
    //         const accessToken = await AsyncStorage.getItem('accessToken')
    //         const response = await axios.delete(`${BASE_URL}community/question/${questionId}`,
    //             {
    //                 headers: {
    //                     'authorization': accessToken
    //                 }
    //             }
    //         );
    //         if (response.status === 200) {
    //             const filteredQuestions = questionSavaData.filter(question => question.questionId !== questionId);
    //             setQuestionSavaData(filteredQuestions);
    //             console.log('Câu hỏi đã được xoá');
    //         } else {
    //             console.error(response.data);
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    const handleVoteSaveQuestion = async (questionId: string) => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken')
            const response = await axios.put(`${BASE_URL}community/vote-question/${questionId}`,
                {},
                {
                    headers: {
                        'authorization': accessToken
                    }
                })
            const updatedSaveQuestions = questionSaveData.map(question => {
                if (question.questionId === questionId) {
                    const newIsVoted = !question.isVoted;
                    const newTotalVotes = newIsVoted ? question.totalVotes + 1 : question.totalVotes - 1;
                    return { ...question, isVoted: newIsVoted, totalVotes: newTotalVotes };
                }
                return question;
            });
            setQuestionSaveData(updatedSaveQuestions);
            console.log(response.data)
        } catch (error: any) {

        }
    }

    const handleVoteInterestedQuestion = async (questionId: string) => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken')
            const response = await axios.put(`${BASE_URL}community/vote-question/${questionId}`,
                {},
                {
                    headers: {
                        'authorization': accessToken
                    }
                })
            const updateInterestedSaveQuestion = questionInterestedData.map(question => {
                if (question.questionId === questionId) {
                    const newIsVoted = !question.isVoted;
                    const newTotalVotes = newIsVoted ? question.totalVotes + 1 : question.totalVotes - 1;
                    return { ...question, isVoted: newIsVoted, totalVotes: newTotalVotes };
                }
                return question;
            });
            setQuestionInterestedData(updateInterestedSaveQuestion);
            console.log(response.data)
        } catch (error: any) {

        }
    }

    const handleSaveQuestion = async (questionId: string) => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken')
            const response = await axios.put(`${BASE_URL}community/save-question/${questionId}`,
                {},
                {
                    headers: {
                        'authorization': accessToken
                    }
                }
            )
            console.log(response.data.message)
        } catch (error: any) {

        }
    }

    const handleUnsaveQuestion = async (questionId: string) => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken')
            const response = await axios.put(`${BASE_URL}community/unsave-question/${questionId}`,
                {},
                {
                    headers: {
                        'authorization': accessToken
                    }
                }
            )
            console.log(response.data.message)
        } catch (error: any) {

        }
    }

    const renderSavedQuestion = (item: QuestionModel, index: number) => {
        return (
            <>
                <View key={item.questionId} style={{ backgroundColor: 'rgba(255, 255, 255, 1)', paddingHorizontal: 16, paddingBottom: 36 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <QuestionHeader
                            item={item}
                            index={index}
                            bottomSheetQuestionRefs={bottomSheetSaveQuestionRef}
                        />
                        <BottomSheetModal
                            ref={(ref) => bottomSheetSaveQuestionRef.current[index] = ref}
                            index={0}
                            snapPoints={['10%', '20%']}
                            handleIndicatorStyle={{ width: 60, backgroundColor: 'rgba(204, 204, 204, 1)' }}
                        >
                            <BottomSheetView>
                                <TouchableOpacity
                                    style={{ flexDirection: 'row', alignItems: 'center', height: 44, marginLeft: 20 }}
                                    onPress={() => {
                                        bottomSheetSaveQuestionRef.current[index]?.dismiss()
                                        handleUnsaveQuestion(item.questionId)
                                    }}
                                >
                                    <ArchiveSlash size={20} variant="Bold" color="rgba(151, 78, 195, 1)" />
                                    <Text style={{ fontSize: 16, fontWeight: '500', lineHeight: 18.75, color: 'rgba(30, 30, 30, 1)', marginLeft: 4 }}>Bỏ lưu câu hỏi</Text>
                                </TouchableOpacity>
                            </BottomSheetView>
                        </BottomSheetModal>
                    </View>
                    <ContentCard item={item} />
                    <View style={{ borderWidth: 0.4, borderColor: 'rgba(215, 215, 215, 0.8)', marginVertical: 8 }}></View>
                    <SocialActions item={item} handleVoteQuestion={handleVoteSaveQuestion} />
                </View>
            </>
        )
    }

    const renderInterestedQuestion = (item: QuestionModel, index: number) => {
        return (
            <>
                <View key={item.questionId} style={{ backgroundColor: 'rgba(255, 255, 255, 1)', paddingHorizontal: 16, paddingBottom: 36 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <QuestionHeader
                            item={item}
                            index={index}
                            bottomSheetQuestionRefs={bottomSheetUnSaveQuestionRef}
                        />
                        <BottomSheetModal
                            ref={(ref) => bottomSheetUnSaveQuestionRef.current[index] = ref}
                            index={0}
                            snapPoints={['10%', '20%']}
                            handleIndicatorStyle={{ width: 60, backgroundColor: 'rgba(204, 204, 204, 1)' }}
                        >
                            <BottomSheetView>
                                <TouchableOpacity
                                    style={{ flexDirection: 'row', alignItems: 'center', height: 44, marginLeft: 20 }}
                                    onPress={() => {
                                        bottomSheetUnSaveQuestionRef.current[index]?.dismiss()
                                        handleSaveQuestion(item.questionId)
                                    }}
                                >
                                    <Archive size={20} variant="Bold" color="rgba(151, 78, 195, 1)" />
                                    <Text style={{ fontSize: 16, fontWeight: '500', lineHeight: 18.75, color: 'rgba(30, 30, 30, 1)', marginLeft: 4 }}>Lưu câu hỏi</Text>
                                </TouchableOpacity>
                            </BottomSheetView>
                        </BottomSheetModal>
                    </View>
                    <ContentCard item={item} />
                    <View style={{ borderWidth: 0.4, borderColor: 'rgba(215, 215, 215, 0.8)', marginVertical: 8 }}></View>
                    <SocialActions item={item} handleVoteQuestion={handleVoteInterestedQuestion} />
                </View>
            </>
        )
    }

    return (
        <ScrollView>
            <FlatList
                data={questionSaveData}
                ListHeaderComponent={
                    <View style={{backgroundColor: 'rgb(240,240,240)'}}>
                        <Text style={{ fontSize: 14, fontWeight: '600', lineHeight: 16.41, color: 'rgba(96, 96, 96, 1)', marginTop: 24, marginLeft: 16, marginBottom: 10 }}>
                        Câu hỏi đã lưu
                    </Text>
                    </View>
                }
                renderItem={({ item, index }) => renderSavedQuestion(item, index)}
                keyExtractor={(item) => item.questionId.toString()}
                style={{ backgroundColor: 'rgba(255, 255, 255, 1)', paddingTop: 16 }}
                scrollEnabled={false}
                ListFooterComponent={
                    <>
                        {!showSaveQuestion && questionSaveData.length > 0 && (
                            <View style={{ height: 48, backgroundColor: 'rgba(252, 252, 252, 1)', marginTop: 4, justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity
                                    style={{ flexDirection: 'row', alignItems: 'center' }}
                                    onPress={() => setShowSaveQuestion(!showSaveQuestion)}
                                >
                                    <Text style={{ fontSize: 14, fontWeight: '600', lineHeight: 16.41, color: 'rgba(89, 89, 89, 1)' }}>
                                        Hiển thị thêm
                                    </Text>
                                    <ArrowDown2 size={16} color="rgba(166, 166, 166, 1)" />
                                </TouchableOpacity>
                            </View>
                        )}
                    </>
                }
            />
            <Text style={{ fontSize: 14, fontWeight: '600', lineHeight: 16.41, color: 'rgba(96, 96, 96, 1)', marginTop: 32, marginLeft: 16, marginBottom: 10 }}>
                Câu hỏi quan tâm
            </Text>
            <FlatList
                data={questionInterestedData}
                renderItem={({ item, index }) => renderInterestedQuestion(item, index)}
                keyExtractor={(item) => item.questionId.toString()}
                style={{ backgroundColor: 'rgba(255, 255, 255, 1)', paddingTop: 16 }}
                scrollEnabled={false}
            />
        </ScrollView>
    )
}

export default InterestedRoute;
