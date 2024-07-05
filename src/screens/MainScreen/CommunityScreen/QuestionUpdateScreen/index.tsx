import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Close, PlusCircle } from "~utils/images/svg";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import styles from "./style";
import { BASE_URL } from "~services/ApiBaseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

const QuestionUpdateScreen = ({ navigation, route }: any) => {
    const { questionData } = route.params || { questionData: {} };
    const [topic, setTopic] = useState<string[]>(questionData.topic || []);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const colors = [
        'rgba(171, 81, 228, 1)',
        'rgba(114, 46, 209, 1)',
        'rgba(105, 24, 165, 1)',
        'rgba(74, 10, 120, 1)',
        'rgba(49, 0, 84, 1)',
    ];

    const CreatQuestion = Yup.object().shape({
        title: Yup.string().required('Tiêu đề là bắt buộc'),
        description: Yup.string().required('Mô tả là bắt buộc'),
    });

    const addTopic = () => {
        if (topic.length < 5) {
            setTopic([...topic, '#Hashtag']);
        }
    };

    const handleHashtagChange = (index: number, text: string) => {
        const updateHashtag = [...topic];
        updateHashtag[index] = text;
        setTopic(updateHashtag);
    };

    const startEditing = (index: number) => {
        setEditingIndex(index);
    };

    const stopEditing = () => {
        setEditingIndex(null);
    };

    const handleUpdateQuestion = async (values: any) => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken')
            const response = await axios.put(`${BASE_URL}community/question/${questionData.questionId}`, {
                title: values.title,
                topic: topic,
                description: values.description,
            },
                {
                    headers: {
                        'authorization': accessToken
                    }
                }
            );
            if (response.data.topic && Array.isArray(response.data.topic)) {
                setTopic(response.data.topic);
            }
            navigation.goBack();
            console.log(response.data);
        } catch (error: any) {
            console.error(error);
        }
    };

    return (
        <Formik
            initialValues={{
                title: questionData.title || '',
                description: questionData.description || '',
            }}
            onSubmit={(values) => {
                handleUpdateQuestion(values);
            }}
            validationSchema={CreatQuestion}
        >
            {({ values, handleChange, setFieldTouched, handleSubmit }) => (
                <>
                    <View style={styles.headerView}>
                        <Text style={styles.headerText}>Chỉnh sửa câu hỏi</Text>
                        <TouchableOpacity style={styles.prefixIcon} onPress={() => navigation.goBack()}>
                            <Close />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.suffixBtn, { backgroundColor: 'rgba(166, 166, 166, 1)' }]}
                            onPress={() => handleSubmit()}
                        >
                            <Text style={styles.textBtn}>Đăng</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.body}>
                        <View style={styles.textView}>
                            <Text style={styles.text}>Tiêu đề</Text>
                            <TextInput
                                style={{ fontSize: 16 }}
                                placeholder="Nhập tiêu đề câu hỏi..."
                                multiline={true}
                                autoCorrect={false}
                                value={values.title}
                                onChangeText={handleChange('title')}
                                onBlur={() => setFieldTouched('title')}
                            />
                        </View>
                        <View style={styles.lineView}></View>
                        <View style={styles.textView}>
                            <Text style={styles.text}>Chủ đề</Text>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                {topic.map((topic, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => startEditing(index)}
                                        style={{ height: 26, backgroundColor: colors[index], borderRadius: 16, justifyContent: 'center', marginRight: 4, marginBottom: 2 }}
                                    >
                                        {editingIndex === index ? (
                                            <TextInput
                                                style={{ textAlign: 'center', fontSize: 12, fontWeight: '500', color: 'rgba(255, 255, 255, 1)', paddingHorizontal: 12 }}
                                                value={topic}
                                                onChangeText={(text) => handleHashtagChange(index, text)}
                                                onBlur={stopEditing}
                                            />
                                        ) : (
                                            <Text style={{ textAlign: 'center', fontSize: 12, fontWeight: '500', color: 'rgba(255, 255, 255, 1)', paddingHorizontal: 12 }}>
                                                {topic}
                                            </Text>
                                        )}
                                    </TouchableOpacity>
                                ))}
                                <TouchableOpacity
                                    style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(24, 144, 255, 1)', borderRadius: 16, width: 114, height: 28 }}
                                    onPress={addTopic}
                                >
                                    <PlusCircle />
                                    <Text style={{ fontSize: 12, fontWeight: '400', color: 'rgba(24, 144, 255, 1)' }}>Thêm chủ đề</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.lineView}></View>
                        <View style={styles.textView}>
                            <Text style={styles.text}>Mô tả</Text>
                            <TextInput
                                style={{ fontSize: 16 }}
                                placeholder="Nhập mô tả câu hỏi..."
                                multiline={true}
                                autoCorrect={false}
                                value={values.description}
                                onChangeText={handleChange('description')}
                                onBlur={() => setFieldTouched('description')}
                            />
                        </View>
                    </View>
                </>
            )}
        </Formik>
    );
};

export default QuestionUpdateScreen;
