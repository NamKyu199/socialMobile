import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react"
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native"
import QuestionContent from "~component/QuestionContent";
import QuestionHeader from "~component/QuestionHeader";
import QuestionActions from "~component/QuestionActions";
import { QuestionModel } from "~models/QuestionModel";
import { BASE_URL } from "~services/ApiBaseUrl";
import { ArchiveSlash, Archive, Edit2, Trash } from "iconsax-react-native";
import styles from "./style";

const NewestRoute = ({ navigation }: any) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [questionData, setQuestionData] = useState<QuestionModel[]>([]);
    const [userId, setUserId] = useState<string | null>(null);
    const bottomSheetQuestionRefs = useRef<(BottomSheetModal | null)[]>([]);

    useEffect(() => {
        const fetchUserId = async () => {
            const id = await AsyncStorage.getItem('userId');
            setUserId(id);
        };

        fetchUserId();
    }, []);

    const fetchQuestions = async () => {
        if (userId !== null) {
            try {
                const accessToken = await AsyncStorage.getItem('accessToken')
                const response = await axios.get(`${BASE_URL}community/trending-questions`,
                    {
                        headers: {
                            'authorization': accessToken
                        }
                    }
                );
                // if (response.data && response.data.questionsInfo && Array.isArray(response.data.questionsInfo)) {
                const fetchedQuestions = response.data.questionsInfo.map(
                    (value: any) => new QuestionModel(
                        value.questionId,
                        value.title,
                        value.topic,
                        value.description,
                        value.images,
                        value.createdAt,
                        value.userId,
                        value.username,
                        value.avatar,
                        value.totalVotes,
                        value.totalViews,
                        value.totalShares,
                        value.totalAnswers,
                        value.isVoted,
                        value.isSaved,
                    )
                );
                setQuestionData(fetchedQuestions);
                bottomSheetQuestionRefs.current = fetchedQuestions.map(() => null);
                // } else {
                //     console.error('Unexpected response data format:', response.data);
                // }
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        }
    };

    const handleDeleteQuestion = async (questionId: string) => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken')
            const response = await axios.delete(`${BASE_URL}community/question/${questionId}`,
                {
                    headers: {
                        'authorization': accessToken
                    }
                }
            );
            if (response.status === 200) {
                const filteredQuestions = questionData.filter(question => question.questionId !== questionId);
                setQuestionData(filteredQuestions);
                console.log('Câu hỏi đã được xoá');
            } else {
                console.error(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

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
            const updatedQuestions = questionData.map(question => {
                if (question.questionId === questionId) {
                    const newIsVoted = !question.isVoted;
                    const newTotalVotes = newIsVoted ? question.totalVotes + 1 : question.totalVotes - 1;
                    return { ...question, isVoted: newIsVoted, totalVotes: newTotalVotes };
                }
                return question;
            });
            setQuestionData(updatedQuestions);
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
            updateSaveStatus(true, questionId)
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
            updateSaveStatus(true, questionId)
            console.log(response.data.message)
        } catch (error: any) {

        }
    }

    const updateSaveStatus = (isSave: boolean, questionId: string) => {
        const updatedQuestions = questionData.map(question => {
            if (question.questionId === questionId) {
                // const newIsVoted = !question.isVoted;
                // const newTotalVotes = newIsVoted ? question.totalVotes + 1 : question.totalVotes - 1;
                return { ...question, isSaved: isSave };

            }
            return question;
        });
        setQuestionData(updatedQuestions);
    }

    useFocusEffect(
        useCallback(() => {
            fetchQuestions();
        }, [userId])
    );

    const renderQuestionItem = (item: QuestionModel, index: number) => (
        <>
            <View key={item.questionId} style={styles.view}>
                <View style={styles.row}>
                    <QuestionHeader
                        item={item}
                        index={index}
                        bottomSheetQuestionRefs={bottomSheetQuestionRefs}
                    />
                    <BottomSheetModal
                        ref={(ref) => bottomSheetQuestionRefs.current[index] = ref}
                        index={0}
                        snapPoints={['10%', '20%']}
                        handleIndicatorStyle={{ width: 60, backgroundColor: 'rgba(204, 204, 204, 1)' }}
                    >
                        <BottomSheetView>
                            {item.userId !== userId ?
                                <>
                                    {item.isSaved ?
                                        <TouchableOpacity
                                            style={{ flexDirection: 'row', alignItems: 'center', height: 44, marginLeft: 20 }}
                                            onPress={() => {
                                                bottomSheetQuestionRefs.current[index]?.dismiss()
                                                handleUnsaveQuestion(item.questionId)
                                            }}
                                        >
                                            <ArchiveSlash size={20} variant="Bold" color="rgba(151, 78, 195, 1)" />
                                            <Text style={{ fontSize: 16, fontWeight: '500', lineHeight: 18.75, color: 'rgba(30, 30, 30, 1)', marginLeft: 4 }}>Bỏ lưu câu hỏi</Text>
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity
                                            style={{ flexDirection: 'row', alignItems: 'center', height: 44, marginLeft: 20 }}
                                            onPress={() => {
                                                bottomSheetQuestionRefs.current[index]?.dismiss()
                                                handleSaveQuestion(item.questionId)
                                            }}
                                        >
                                            <Archive size={20} variant="Bold" color="rgba(151, 78, 195, 1)" />
                                            <Text style={{ fontSize: 16, fontWeight: '500', lineHeight: 18.75, color: 'rgba(30, 30, 30, 1)', marginLeft: 4 }}>Lưu câu hỏi</Text>
                                        </TouchableOpacity>
                                    }
                                </>
                                :
                                <>
                                    <TouchableOpacity
                                        style={{ flexDirection: 'row', alignItems: 'center', height: 44, marginLeft: 20 }}
                                        onPress={() => {
                                            bottomSheetQuestionRefs.current[index]?.dismiss()
                                            navigation.navigate('QuestionUpdateScreen', { questionData: item })
                                        }}
                                    >
                                        <Edit2 size={20} variant="Bold" color="rgba(151, 78, 195, 1)" />
                                        <Text style={{ fontSize: 16, fontWeight: '500', lineHeight: 18.75, color: 'rgba(30, 30, 30, 1)', marginLeft: 4 }}>Chỉnh sửa câu hỏi</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', height: 44, marginLeft: 20 }} onPress={() => { setModalVisible(!modalVisible) }}>
                                        <Trash size={20} variant="Bold" color="rgba(151, 78, 195, 1)" />
                                        <Text style={{ fontSize: 16, fontWeight: '500', lineHeight: 18.75, color: 'rgba(30, 30, 30, 1)', marginLeft: 4 }}>Xoá câu hỏi</Text>
                                    </TouchableOpacity>
                                </>
                            }
                            <Modal
                                animationType='fade'
                                transparent={true}
                                visible={modalVisible}
                            >
                                <View style={{ height: '100%', justifyContent: 'center', backgroundColor: '#000000AA' }}>
                                    <View style={{ backgroundColor: 'rgba(255, 255, 255, 1)', height: '25%', marginHorizontal: 23, borderRadius: 8 }}>
                                        <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '500', lineHeight: 28, color: 'rgba(0, 0, 0, 0.85)', marginTop: 40 }}>Xoá câu hỏi</Text>
                                        <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: '400', lineHeight: 22, color: 'rgba(0, 0, 0, 0.45)', marginTop: 8 }}>Bạn có chắc chắn xoá câu hỏi này không?</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 49.5, marginTop: 40 }}>
                                            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                                <Text style={{ fontSize: 16, fontWeight: '600', lineHeight: 24, color: 'rgba(114, 46, 209, 1)' }}>Không</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={{ backgroundColor: 'rgba(114, 46, 209, 1)', width: 112, height: 36.8, justifyContent: 'center', borderRadius: 8 }}
                                                onPress={() => {
                                                    handleDeleteQuestion(item.questionId)
                                                    setModalVisible(false);
                                                }}
                                            >
                                                <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '500', lineHeight: 24, color: 'rgba(255, 255, 255, 1)' }}>Xoá</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        </BottomSheetView>
                    </BottomSheetModal>
                </View>
                <QuestionContent item={item} />
                <View style={styles.line} />
                <QuestionActions item={item} handleVoteQuestion={handleVoteQuestion} />
            </View>
        </>
    )

    return (
        <>
            <FlatList
                data={questionData}
                renderItem={({ item, index }) => renderQuestionItem(item, index)}
                keyExtractor={(item) => item.questionId.toString()}
                style={styles.container}
            />
        </>
    )
}

export default NewestRoute;