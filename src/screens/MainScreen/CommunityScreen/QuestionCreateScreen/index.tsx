import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { ImageIcon, LinkIcon, VideoIcon } from "~utils/images/svg";
import styles from "./style";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "~services/ApiBaseUrl";
import { launchImageLibrary } from "react-native-image-picker";
import { CloseCircle } from "iconsax-react-native";
import Header from "./Header";
import Title from "./Title";
import Topic from "./Topic";
import Description from "./Description";

const YOUTUBE_API_KEY = 'AIzaSyCYf0ZMZswBTeNbLUJnDN3hTf3L7VCDmlk';

const QuestionCreateScreen = ({ navigation }: any) => {
    const [hashtag, setHashtag] = useState<string[]>([]);
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [showLink, setShowLink] = useState(false);
    const [url, setUrl] = useState('');
    const [previewData, setPreviewData] = useState<any | null>(null);

    const CreatQuestion = Yup.object().shape({
        title: Yup.string().min(1, '').required('aaaaa'),
        description: Yup.string().min(1, '').required('aaaa')
    });

    const addHashtag = () => {
        if (hashtag.length < 5) {
            setHashtag([...hashtag, '#Hashtag']);
        }
    };

    const handleHashtagChange = (index: number, text: string) => {
        const updateHashtag = [...hashtag];
        updateHashtag[index] = text;
        setHashtag(updateHashtag);
    };

    const openLib = () => {
        launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
            if (response.assets && response.assets.length > 0) {
                const uri = response.assets[0].uri;
                setImageUri(uri || null)
            }
        })
    }

    const handleCreatQueston = async (values: any) => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken')
            const formData = new FormData();
            formData.append('title', values.title)
            hashtag.forEach((topic, index) => {
                formData.append(`topic[${index}]`, topic);
            });
            formData.append('description', values.description)
            if (imageUri) {
                const uriParts = imageUri.split('/')
                const fileName = uriParts[uriParts.length - 1]
                formData.append('images', {
                    uri: imageUri,
                    name: fileName,
                    type: 'image/jpeg'
                })
            }
            console.log(imageUri)
            const response = await axios.post(`${BASE_URL}community/create-question`, formData,
                {
                    headers: {
                        'authorization': accessToken,
                        'Content-Type': 'multipart/form-data'
                    }
                });
            console.log(response.data)
            if (response.data.topic && Array.isArray(response.data.topic)) {
                setHashtag(response.data.topic);
            }
            setImageUri(response.data.images)
            navigation.goBack()
        } catch (error: any) {
            console.error(error);
        }
    };

    const getYoutubeVideoId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const fetchYoutubeData = async (videoId: string) => {
        const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${YOUTUBE_API_KEY}&part=snippet`
        );
        console.log(videoId);
        return response.data.items[0].snippet;
    };

    const handleUrlChange = async (text: string) => {
        setUrl(text);
        const videoId = getYoutubeVideoId(text);
        if (videoId) {
            try {
                const data = await fetchYoutubeData(videoId);
                setPreviewData(data);
            } catch (error) {
                console.error('Error fetching YouTube data:', error);
                setPreviewData(null);
            }
        } else {
            setPreviewData(null);
        }
    };

    const [buttonPressed, setButtonPressed] = useState(false)
    const button = [
        { id: 1, Icon: ImageIcon, action: openLib },
        { id: 2, Icon: LinkIcon, action: () => setShowLink(true) },
        { id: 3, Icon: VideoIcon, action: () => { } },
    ];

    const handlePress = (action: any) => {
        setButtonPressed(true);
        action();
    }

    return (
        <Formik
            initialValues={{
                title: '',
                description: '',
            }}
            onSubmit={(value) => {
                handleCreatQueston(value);
            }}
            validationSchema={CreatQuestion}
            validateOnMount={true}
        >
            {({ values, handleChange, setFieldTouched, isValid, handleSubmit }) => (
                <>
                    <Header
                        styles={styles}
                        navigation={navigation}
                        isValid={isValid}
                        handleSubmit={handleSubmit}
                    />
                    <View style={styles.body}>
                        <Title
                            styles={styles}
                            values={values}
                            handleChange={handleChange}
                            setFieldTouched={setFieldTouched}
                        />
                        <View style={styles.lineView} />
                        <Topic
                            styles={styles}
                            hashtag={hashtag}
                            handleHashtagChange={handleHashtagChange}
                            addHashtag={addHashtag}
                        />
                        <View style={styles.lineView} />
                        {showLink && (
                            <View style={styles.textView}>
                                <Text style={styles.text}>Url</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <TextInput
                                        placeholder="Nhập link url...."
                                        placeholderTextColor={'rgba(166, 166, 166, 1)'}
                                        style={{ flex: 1 }}
                                        multiline={true}
                                        value={url}
                                        onChangeText={handleUrlChange}
                                    />
                                    <TouchableOpacity onPress={() => setUrl('')}>
                                        <CloseCircle variant="Bold" color="rgba(166, 166, 166, 1)" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        {previewData && (
                            <View>
                                {previewData.thumbnails?.high?.url && (
                                    <Image
                                        source={{ uri: previewData.thumbnails.high.url }}
                                        style={{ width: '100%', height: 224, borderRadius: 4 }}
                                    />
                                )}
                                <View style={{ width: '100%', height: 32, backgroundColor: 'rgba(32, 32, 32, 0.8)', borderBottomLeftRadius: 4, borderBottomRightRadius: 4, justifyContent: 'center', position: 'absolute', bottom: 0 }}>
                                    <Text style={{ fontSize: 14, fontWeight: '400', lineHeight: 16.41, color: 'rgba(255, 255, 255, 1)', marginLeft: 12.75 }}>
                                        {url}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    style={{ position: 'absolute', top: 16, right: 3 }}
                                    onPress={() => setPreviewData('')}
                                >
                                    <CloseCircle size={32} variant="Bold" color="rgba(89, 89, 89, 0.6)" />
                                </TouchableOpacity>
                            </View>
                        )}
                        {imageUri && (
                            <View>
                                <Image style={{ height: 224, width: '100%', marginTop: 12, borderRadius: 4 }} source={{ uri: imageUri }} />
                                <TouchableOpacity
                                    style={{ position: 'absolute', top: 16, right: 3 }}
                                    onPress={() => setImageUri('')}
                                >
                                    <CloseCircle size={32} variant="Bold" color="rgba(89, 89, 89, 0.6)" />
                                </TouchableOpacity>
                            </View>
                        )}
                        <Description
                            styles={styles}
                            values={values}
                            handleChange={handleChange}
                            setFieldTouched={setFieldTouched}
                        />
                        <View style={{ flexDirection: 'row' }}>
                            {button.map(({ id, Icon, action }) => (
                                <TouchableOpacity key={id} onPress={() => handlePress(action)} disabled={buttonPressed}>
                                    <Icon fill={buttonPressed ? 'rgba(166, 166, 166, 1)' : 'rgba(0, 0, 0, 1)'} />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </>
            )}
        </Formik>
    );
};

export default QuestionCreateScreen;