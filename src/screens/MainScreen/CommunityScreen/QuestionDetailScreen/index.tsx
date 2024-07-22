import { ArrowDown2, ArrowUp2, Edit2, More, Trash } from "iconsax-react-native";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, Image, Modal, Text, TouchableOpacity, View } from "react-native";
import AppImage from "~utils/images/app_images";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet"
import { QuestionAnswerModel } from "~models/QuestionAnswerModel";
import { Canvas, Skia, Path } from "@shopify/react-native-skia";
import QuestionDetailRepliesItem from "~component/QuestionDetailRepliesItem";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { QuestionRepliesAnswerModel } from "~models/QuestionRepliesAnswerModel";
import { BASE_URL } from "~services/ApiBaseUrl";
import QuestionAnswerContent from "./QuestionAnswerContent";
import styles from "./style";
import QuestionAnswerHeader from "./QuestionAnswerHeader";
import QuestionAnswerAction from "./QuestionAnswerAction";
import QuestionComment from "./QuestionComment";
import { StatusTextInput } from "~constant/StatusTextInput";

const QuestionDetailScreen = ({ route }: any) => {
    const { questionData } = route.params || { questionData: {} }
    const [viewInput, setViewInput] = useState<StatusTextInput>(StatusTextInput.DEFAULT);
    const [comment, setComment] = useState('');
    const [userId, setUserId] = useState<string | null>(null);
    const [questionAnswerData, setQuestionAnswerData] = useState<QuestionAnswerModel[]>([]);
    const [questionRepliesAnswerData, setQuestionRepliesAnswerData] = useState<QuestionRepliesAnswerModel[]>([]);
    const bottomSheetAnswerRef = useRef<BottomSheetModal>(null);

    const bottomSheetCommentRef = useRef<BottomSheetModal>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [itemHeight, setItemHeight] = useState(0);
    const [action, setAction] = useState(StatusTextInput.COMMENT);

    const path = Skia.Path.Make();
    path.moveTo(20, 4);
    path.lineTo(20, itemHeight);

    useEffect(() => {
        const fetchUserId = async () => {
            const id = await AsyncStorage.getItem('userId')
            setUserId(id)
        }
        fetchUserId()
    }, [])  

    const fetchQuestionAnswer = async (questionId: string) => {
        try {
            const response = await axios.get(`${BASE_URL}community/question/${questionId}`)
            const fetchedQuestionAnswer = response.data.questionInfo.answers.map(
                (values: any) => new QuestionAnswerModel(
                    values.answerId,
                    values.content,
                    values.userId,
                    values.username,
                    values.answerImage,
                    values.totalAnswerVotes,
                    values.createdAt,
                    values.totalRepliesAnswer,
                    values.isAnswerVoted,
                )
            )
            setQuestionAnswerData(fetchedQuestionAnswer)
        } catch (error: any) {

        }
    }

    const fetchQuestionRepliesAnswer = async (answerId: string) => {
        try {
            const response = await axios.get(`${BASE_URL}community/answers/parentAnswerId/${answerId}`)
            const fetchedQuestionRepliesAnswer = response.data.answers.map(
                (values: any) => new QuestionRepliesAnswerModel(
                    values.answerId,
                    values.content,
                    values.userId,
                    values.username,
                    values.parentAnswerId,
                    values.image,
                    values.totalVotes,
                    values.createdAt,
                    values.isVoted,
                )
            )
            setQuestionRepliesAnswerData(fetchedQuestionRepliesAnswer)
        } catch (error: any) {

        }
    }

    const AnswerToQuestion = async (questionId: string) => {
        console.log(`AnswerToQuestion ${questionId}`)
        const accessToken = await AsyncStorage.getItem('accessToken')
        console.log(`AnswerToQuestion ${questionId}`)
        try {
            const response = await axios.post(`${BASE_URL}community/create-answer/questionId/${questionId}`,
                {
                    content: comment
                },
                {
                    headers: {
                        'authorization': accessToken
                    }
                })
            setComment('')
            console.log(response.data)
            fetchQuestionAnswer(questionId)
            // setQuestionAnswerData([newComment, ...questionAnswerData])
        } catch (error: any) {
            console.error(error)
        }
    }

    const handleVoteAnswerQuestion = async (answerId: string) => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken')
            const response = await axios.put(`${BASE_URL}community/vote-answer/${answerId}`,
                {},
                {
                    headers: {
                        'authorization': accessToken
                    }
                }
            )
            const updatedAnswerQuestion = questionAnswerData.map(question => {
                if (question.answerId === answerId) {
                    const newIsVoted = !question.isAnswerVoted;
                    const newTotalVotes = newIsVoted ? question.totalAnswerVotes + 1 : question.totalAnswerVotes - 1;
                    return { ...question, isAnswerVoted: newIsVoted, totalAnswerVotes: newTotalVotes };
                }
                return question;
            })
            setQuestionAnswerData(updatedAnswerQuestion)
            console.log(response.data)
        } catch (error: any) {

        }
    }

    const handleDeleteAnswerQuestion = async (answerId: string) => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken')
            const response = await axios.delete(`${BASE_URL}community/answer/${answerId}`,
                {
                    headers: {
                        'authorization': accessToken
                    }
                },
            )
            if (response.status === 200) {
                const filteredQuestions = questionAnswerData.filter(question => question.answerId !== answerId);
                setQuestionAnswerData(filteredQuestions)
                console.log(response.data)
            }
        } catch (error: any) {

        }
    }

    const handleUpdateQuestion = async (answerId: string) => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken')
            const response = await axios.put(`${BASE_URL}community/answer/${answerId}`,
                {
                    content: comment
                },
                {
                    headers: {
                        'authorization': accessToken
                    }
                }
            )
        } catch (error: any) {

        }
    }

    const handleAnswerToAnswer = async (answerId: string) => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken')
            const response = await axios.post(`${BASE_URL}community/create-answer/parentAnswerId/${answerId}`,
                {},
                {
                    headers: {
                        'authorization': accessToken
                    }
                }
            )
        } catch (error: any) {

        }
    }

    useEffect(() => {
        fetchQuestionAnswer(questionData.questionId)
    }, [])

    const renderContent = () => (
        <>
            <QuestionAnswerContent
                questionData={questionData}
            />
            <View style={styles.line} />
            <QuestionAnswerAction
                questionData={questionData}
            />
            <View style={styles.line} />
            <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}
                onPress={() => bottomSheetAnswerRef.current?.present()}
            >
                <Text style={{ marginRight: 12, fontSize: 14, fontWeight: '600', lineHeight: 16.41, color: 'rgba(30, 30, 30, 1)' }}>
                    Lọc trả lời
                </Text>
                <ArrowDown2 size={16} color="rgba(41, 45, 50, 1)" />
            </TouchableOpacity>
            <BottomSheetModal
                ref={bottomSheetAnswerRef}
                index={1}
                snapPoints={['20%', '30%']}
                handleIndicatorStyle={{ width: 60, backgroundColor: 'rgba(204, 204, 204, 1)' }}
            >
                <BottomSheetView>
                    <View style={{ marginLeft: 16 }}>
                        <Text style={{ fontSize: 20, fontWeight: '600', lineHeight: 23.44, color: 'rgba(30, 30, 30, 1)', marginTop: 24 }}>
                            Lọc trả lời
                        </Text>
                        <TouchableOpacity>
                            <Text style={{ fontSize: 16, fontWeight: '600', lineHeight: 18.75, color: 'rgba(30, 30, 30, 1)', marginTop: 16 }}>
                                Phù hợp nhất
                            </Text>
                            <Text style={{ fontSize: 14, fontWeight: '400', lineHeight: 16.41, color: 'rgba(89, 89, 89, 1)', marginTop: 4 }}>
                                Hiển thị những trả lời có nhiều lượt tương tác nhất trước tiên
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            // fetchQuestionAllAnswer(questionData.questionId)
                            bottomSheetAnswerRef.current?.dismiss()
                        }}>
                            <Text style={{ fontSize: 16, fontWeight: '600', lineHeight: 18.75, color: 'rgba(30, 30, 30, 1)', marginTop: 28 }}>
                                Tất cả các bình luận
                            </Text>
                            <Text style={{ fontSize: 14, fontWeight: '400', lineHeight: 16.41, color: 'rgba(89, 89, 89, 1)', marginTop: 4 }}>
                                Hiện thị tất cả trả lời, theo thứ tự từ cũ nhất đến mới nhất
                            </Text>
                        </TouchableOpacity>
                    </View>
                </BottomSheetView>
            </BottomSheetModal>
        </>
    )

    const renderQuestionAnswerItem = (item: QuestionAnswerModel, index: number) => (
        <>
            <View style={{ flexDirection: 'row', marginTop: 12, borderWidth: 0 }} onLayout={(event) => {
                const { height } = event.nativeEvent.layout
                setItemHeight(height)
            }}>
                <View style={{ flexDirection: 'column' }}>
                    <Image source={AppImage.avatar} style={{ width: 40, height: 40 }} />
                    {item.showReplies && (
                        <>
                            {item.totalRepliesAnswer !== 0 && (
                                <Canvas style={{ flex: 1 }}>
                                    <Path
                                        path={path}
                                        color="rgba(166, 166, 166, 1)"
                                        style="stroke"
                                        strokeWidth={1.2}
                                    />
                                </Canvas>
                            )}
                        </>
                    )}
                </View>
                <View key={item.answerId} style={{ flex: 1, marginLeft: 8 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 14, fontWeight: '700', lineHeight: 21, letterSpacing: 0.001, color: 'rgba(30, 30, 30, 1)' }}>
                            {item.username}
                        </Text>
                        <Text style={{ fontSize: 12, fontWeight: '500', lineHeight: 14.06, color: 'rgba(204, 204, 204, 1)', marginLeft: 20 }}>
                            {item.createdAt}
                        </Text>
                    </View>
                    <Text style={{ fontSize: 14, fontWeight: '400', lineHeight: 21, letterSpacing: 0.02, color: 'rgba(89, 89, 89, 1)' }}>
                        {item.content}
                    </Text>
                    {item.answerImage !== null && (
                        <Image source={{ uri: item.answerImage }} style={{ height: 162, width: '100%', borderRadius: 8, marginBottom: 6 }} />
                    )}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => handleVoteAnswerQuestion(item.answerId)}>
                            <Text style={{ fontSize: 14, fontWeight: '500', lineHeight: 16.41, color: item.isAnswerVoted ? 'rgba(53, 3, 173, 1)' : 'rgba(89, 89, 89, 1)' }}>
                                {item.totalAnswerVotes !== 0 ? item.totalAnswerVotes + ' Thích' : 'Thích'}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            setViewInput(StatusTextInput.REPLIES)
                        }}>
                            <Text style={{ fontSize: 14, fontWeight: '500', lineHeight: 16.41, color: 'rgba(89, 89, 89, 1)', marginHorizontal: 56 }}>
                                Phản hồi
                            </Text>
                        </TouchableOpacity>
                        {item.userId === userId && (
                            <TouchableOpacity onPress={() => bottomSheetCommentRef.current?.present()}>
                                <More size={16} color="rgba(166, 166, 166, 1)" />
                            </TouchableOpacity>
                        )}
                        <BottomSheetModal
                            ref={bottomSheetCommentRef}
                            index={0}
                            snapPoints={['10%', '20%']}
                            handleIndicatorStyle={{ width: 60, backgroundColor: 'rgba(204, 204, 204, 1)' }}
                        >
                            <BottomSheetView>
                                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', height: 44, marginLeft: 20 }}>
                                    <Edit2 size={20} variant="Bold" color="rgba(151, 78, 195, 1)" />
                                    <TouchableOpacity
                                        onPress={() => {
                                            bottomSheetCommentRef.current?.dismiss()
                                            setViewInput(StatusTextInput.EDIT)
                                            setComment(item.content)
                                        }}
                                    >
                                        <Text style={{ fontSize: 16, fontWeight: '500', lineHeight: 18.75, color: 'rgba(30, 30, 30, 1)', marginLeft: 4 }}>
                                            Chỉnh sửa
                                        </Text>
                                    </TouchableOpacity>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', height: 44, marginLeft: 20 }} onPress={() => { setModalVisible(!modalVisible) }}>
                                    <Trash size={20} variant="Bold" color="rgba(151, 78, 195, 1)" />
                                    <Text style={{ fontSize: 16, fontWeight: '500', lineHeight: 18.75, color: 'rgba(30, 30, 30, 1)', marginLeft: 4 }}>
                                        Xoá
                                    </Text>
                                </TouchableOpacity>
                                <Modal
                                    animationType='fade'
                                    transparent={true}
                                    visible={modalVisible}
                                >
                                    <View style={{ height: '100%', justifyContent: 'center', backgroundColor: '#000000AA' }}>
                                        <View style={{ backgroundColor: 'rgba(255, 255, 255, 1)', height: '25%', marginHorizontal: 23, borderRadius: 8 }}>
                                            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '500', lineHeight: 28, color: 'rgba(0, 0, 0, 0.85)', marginTop: 40 }}>
                                                Xoá bình luận
                                            </Text>
                                            <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: '400', lineHeight: 22, color: 'rgba(0, 0, 0, 0.45)', marginTop: 8 }}>
                                                Bạn có chắc chắn xoá bình luận này không?
                                            </Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 49.5, marginTop: 40 }}>
                                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                                    <Text style={{ fontSize: 16, fontWeight: '600', lineHeight: 24, color: 'rgba(114, 46, 209, 1)' }}>
                                                        Không
                                                    </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={{ backgroundColor: 'rgba(114, 46, 209, 1)', width: 112, height: 36.8, justifyContent: 'center', borderRadius: 8 }}
                                                    onPress={() => handleDeleteAnswerQuestion(item.answerId)}
                                                >
                                                    <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '500', lineHeight: 24, color: 'rgba(255, 255, 255, 1)' }}>
                                                        Xoá
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </Modal>
                            </BottomSheetView>
                        </BottomSheetModal>
                    </View>
                    {item.totalRepliesAnswer !== 0 && (
                        <TouchableOpacity
                            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}
                            onPress={() => {
                                const updatedQuestionAnswerData = [...questionAnswerData];
                                updatedQuestionAnswerData[index].showReplies = !item.showReplies;
                                setQuestionAnswerData(updatedQuestionAnswerData);
                                fetchQuestionRepliesAnswer(questionAnswerData[index].answerId);
                            }}
                        >
                            {item.showReplies ? <ArrowUp2 size={20} color="rgba(53, 3, 173, 1)" variant="Bold" /> : <ArrowDown2 size={20} color="rgba(53, 3, 173, 1)" variant="Bold" />}
                            <Text>
                                {item.totalRepliesAnswer !== 0 ? item.totalRepliesAnswer + ' Phản hồi' : 'Phản hồi'}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            {item.showReplies && (
                <QuestionDetailRepliesItem
                    questionRepliesAnswerData={questionRepliesAnswerData}
                    totalRepliesAnswer={item.totalRepliesAnswer}
                />
            )}
        </>
    )

    return (
        <View style={{ flex: 1 }}>
            <QuestionAnswerHeader
                questionData={questionData}
            />
            <FlatList
                ListHeaderComponent={renderContent}
                data={questionAnswerData}
                renderItem={({ item, index }) => renderQuestionAnswerItem(item, index)}
                keyExtractor={(item) => item.answerId.toString()}
                style={{ backgroundColor: 'rgba(255, 255, 255, 1)', height: '100%', paddingHorizontal: 16 }}
            />
            <View style={{ backgroundColor: 'rgba(255, 255, 255, 1)', height: 20 }} />
            <QuestionComment
                // value={comment}
                onChangeText={setComment}
                statusTextInput={viewInput}
                onFocus={() => {
                    setViewInput(StatusTextInput.COMMENT)
                }}
                onCancel={() => setViewInput(StatusTextInput.DEFAULT)}
                onClick={() => {
                    console.log(action)
                    switch (action) {
                        case StatusTextInput.COMMENT:
                            setAction(StatusTextInput.COMMENT);
                            break;
                        case StatusTextInput.EDIT:
                            setAction(StatusTextInput.EDIT);
                            break;
                        case StatusTextInput.REPLIES:
                            setAction(StatusTextInput.REPLIES);
                            break;
                    }
                }}
            />
        </View>
    )
}

export default QuestionDetailScreen;