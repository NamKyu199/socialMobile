import React, { useCallback, useEffect, useRef, useState } from "react"
import { FlatList, Text, TouchableOpacity, View } from "react-native"
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

    const handleVoteQuestion = async (questionId: string) => {
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
                    <ContentCard item={item}/>
                    <View style={{ borderWidth: 0.4, borderColor: 'rgba(215, 215, 215, 0.8)', marginVertical: 8 }}></View>
                    <SocialActions item={item} handleVoteQuestion={handleVoteQuestion}/>
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
                    <ContentCard item={item}/>
                    <View style={{ borderWidth: 0.4, borderColor: 'rgba(215, 215, 215, 0.8)', marginVertical: 8 }}></View>
                    <SocialActions item={item} handleVoteQuestion={handleVoteQuestion}/>
                </View>
            </>
        )
    }

    return (
        <>
            <Text style={{ fontSize: 14, fontWeight: '600', lineHeight: 16.41, color: 'rgba(96, 96, 96, 1)', marginTop: 24, marginLeft: 16 }}>
                Câu hỏi đã lưu
            </Text>
            <FlatList
                data={questionSaveData}
                renderItem={({ item, index }) => renderSavedQuestion(item, index)}
                keyExtractor={(item) => item.questionId.toString()}
                style={{ backgroundColor: 'rgba(255, 255, 255, 1)', paddingTop: 16 }}
            />
            {showSaveQuestion && (
                // <View style={{ height: 330.03, backgroundColor: 'rgba(255, 255, 255, 1)', paddingHorizontal: 16, paddingTop: 16, marginTop: 12 }}>
                //     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                //         <Image source={AppImage.avatar} />
                //         <View style={{ marginLeft: 12 }}>
                //             <Text style={{ fontSize: 14, fontWeight: '700', letterSpacing: 0.1, color: 'rgba(30, 30, 30, 1)' }}>
                //                 Man Van Truong
                //             </Text>
                //             <Text style={{ fontSize: 12, fontWeight: '500', color: 'rgba(204, 204, 204, 1)' }}>
                //                 2 giờ trước
                //             </Text>
                //         </View>
                //         <TouchableOpacity
                //             style={{ position: 'absolute', right: 0, bottom: 18 }}
                //             onPress={() => bottomSheetSaveQuestionRef.current?.present()}
                //         >
                //             <Mores />
                //         </TouchableOpacity>
                //         <BottomSheetModal
                //             ref={bottomSheetSaveQuestionRef}
                //             index={0}
                //             snapPoints={['10%', '20%']}
                //             handleIndicatorStyle={{ width: 60, backgroundColor: 'rgba(204, 204, 204, 1)' }}
                //         >
                //             <BottomSheetView>
                //                 <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', height: 44, marginLeft: 20 }}>
                //                     <ArchiveSlash size={20} variant="Bold" color="rgba(151, 78, 195, 1)" />
                //                     <Text style={{ fontSize: 16, fontWeight: '500', lineHeight: 18.75, color: 'rgba(30, 30, 30, 1)', marginLeft: 4 }}>Bỏ lưu câu hỏi</Text>
                //                 </TouchableOpacity>
                //             </BottomSheetView>
                //         </BottomSheetModal>
                //     </View>
                //     <Text style={{ fontSize: 18, fontWeight: '600', letterSpacing: 0.4, marginTop: 12 }}>
                //         Whereas disregard and contempt for human rights have resulted. Whereas disregard and contempt to t for human rights have ?
                //     </Text>
                //     <Text style={{ fontSize: 14, fontWeight: '400', letterSpacing: 0.4, color: 'rgba(89, 89, 89, 1)' }}>
                //         Whereas disregard and contempt for human rights have resulted. Whereas disregard and contempt to t for human rights have resulted. Whereas disregard and contempt for human rights have resulted
                //     </Text>
                //     <View style={{ marginTop: 12, flexDirection: 'row', justifyContent: 'flex-end' }}>
                //         <View style={{ height: 26, backgroundColor: 'rgba(171, 81, 228, 1)', borderRadius: 16, justifyContent: 'center', marginLeft: 4 }}>
                //             <Text style={{ textAlign: 'center', fontSize: 12, fontWeight: '500', color: 'rgba(255, 255, 255, 1)', paddingHorizontal: 12 }}>
                //                 #Hashtag
                //             </Text>
                //         </View>
                //     </View>
                //     <View style={{ borderWidth: 0.4, borderColor: 'rgba(215, 215, 215, 0.8)', marginVertical: 8 }}></View>
                //     <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                //         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                //             <TouchableOpacity onPress={handleLike}>
                //                 <View style={{
                //                     height: 36,
                //                     width: 98,
                //                     backgroundColor: isLiked ? 'rgba(82, 5, 127, 1)' : 'rgba(242, 242, 242, 1)',
                //                     borderRadius: 20,
                //                     flexDirection: 'row',
                //                     justifyContent: 'center',
                //                     alignItems: 'center'
                //                 }}>
                //                     <Heart
                //                         size={16}
                //                         color={isLiked ? 'rgba(255, 79, 129, 1)' : 'rgba(166, 166, 166, 1)'}
                //                         variant={isLiked ? 'Bold' : 'Linear'}
                //                         style={{ marginRight: 1 }}
                //                     />
                //                     <Text style={{
                //                         fontSize: 14,
                //                         fontWeight: '400',
                //                         color: isLiked ? 'rgba(255, 255, 255, 1)' : 'rgba(89, 89, 89, 1)',
                //                         marginLeft: 2,
                //                     }}>
                //                         {likeCount !== 0 ? `${likeCount} Thích` : `Thích`}
                //                     </Text>
                //                 </View>
                //             </TouchableOpacity>
                //             <View style={{ flexDirection: 'row', marginLeft: 24 }}>
                //                 <Image source={AppImage.commentIcon} />
                //                 <Text style={{ marginLeft: 2, fontSize: 14, fontWeight: '500', color: 'rgba(89, 89, 89, 1)', marginRight: 24 }}>
                //                     12
                //                 </Text>
                //             </View>
                //             <Image source={AppImage.shareIcon} />
                //         </View>
                //         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                //             <Eye size={16} color="rgba(150, 143, 143, 1)" />
                //             <Text style={{ marginLeft: 4, fontSize: 14, fontWeight: '500', color: 'rgba(89, 89, 89, 1)' }}>
                //                 120
                //             </Text>
                //         </View>
                //     </View>
                // </View>
                <>
                </>
            )}
            {!showSaveQuestion && (
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
            <Text style={{ fontSize: 14, fontWeight: '600', lineHeight: 16.41, color: 'rgba(96, 96, 96, 1)', marginTop: 32, marginLeft: 16 }}>
                Câu hỏi quan tâm
            </Text>
            <FlatList 
                data={questionInterestedData}
                renderItem={({item, index}) => renderInterestedQuestion(item, index)}
                keyExtractor={(item) => item.questionId.toString()}
                style={{ backgroundColor: 'rgba(255, 255, 255, 1)', paddingTop: 16 }}
            />
        </>
    )
}

export default InterestedRoute;
