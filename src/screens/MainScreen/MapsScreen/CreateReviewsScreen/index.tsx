import React, { useEffect, useRef, useState } from "react";
import { Text, View, TouchableOpacity, ScrollView, Image, TextInput, PermissionsAndroid, Alert, Linking, Dimensions } from "react-native";
import EvaluateComponent from "~component/EvaluateComponent";
import AppImage from "~utils/images/app_images";
import { CameraIcon, Close } from "~utils/images/svg";
import { launchImageLibrary } from 'react-native-image-picker';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from "~services/ApiBaseUrl";

const requestLibraryPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Cool Photo App Library Permission',
        message: 'Cool Photo App needs access to your photo library so you can select awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
      console.log('Library permission denied');
      Alert.alert('Permission Denied', 'Library permission is required to select photos.');
    } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      console.log('Library permission denied permanently');
      Alert.alert(
        'Permission Required',
        'You have permanently denied the library permission. Please go to settings and enable it manually. Go to Settings > Apps & notifications > App name > Permissions to enable the permission.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings() },
        ]
      );
    }
  } catch (err) {
    console.warn('Permission request error:', err);
  }
  return false;
};

const CreateReviewsScreen = ({ navigation, route }: any) => {
  const PAGE_WIDTH = Dimensions.get('window').width;
  const PAGE_HEIGHT = Dimensions.get('window').height;
  const { id } = route.params;
  const [imagecomment, setImagecomment] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const [informationData, setInformationData] = useState<any>();
  const fetchInformation = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken')
    const response = await axios.get(`${BASE_URL}profile/getInformation`,
      {
        headers: {
          'Authorization': accessToken
        }
      }
    )
    setInformationData(response.data.getUserInfo);
  }

  useEffect(() => {
    fetchInformation()
  }, [])

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
  }

  useEffect(() => {
    fetchAvatar()
  }, [])

  const submitReview = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');

      if (!accessToken) {
        Alert.alert('Error', 'No authentication token found');
        return;
      }

      const formData = new FormData();
      formData.append('rating', rating.toString());
      formData.append('comment', comment);

      if (imagecomment) {
        formData.append('imagecomment', {
          uri: imagecomment,
          type: 'image/jpeg',
          name: 'review.jpg'
        });
      }

      const response = await axios.post(
        `http://192.53.172.131:1050/map/addReview/${id}`,
        formData,
        {
          headers: {
            'authorization': accessToken,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      console.log('Review submitted successfully:', response.data);
      navigation.goBack();
    } catch (error: any) {
      console.error('Error submitting review:', error.message);
    }
  };

  const openImagePicker = async () => {
    const hasPermission = await requestLibraryPermission();
    if (!hasPermission) return;

    launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response: any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        if (response.assets && response.assets.length > 0) {
          setImagecomment(response.assets[0].uri);
        }
      }
    });
  };

  const handlePostReview = () => {
    submitReview();
  };

  return (
    <ScrollView style={{ backgroundColor: '#FFFFFF' }}>
      <View style={{
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 20, paddingBottom: 20, backgroundColor: '#F8F9FC'
      }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Close />
        </TouchableOpacity>
        <Text style={{
          alignSelf: 'center', fontWeight: '700', fontSize: 18, lineHeight: 21, color: 'rgba(30, 30, 30, 1)', marginLeft: 12, fontFamily: 'Roboto-Bold'
        }}>Tạo đánh giá</Text>
        <TouchableOpacity style={{
          backgroundColor: 'rgba(231, 79, 177, 1)', width: 70, height: 35, borderRadius: 4, marginRight: 16
        }} onPress={handlePostReview}>
          <Text style={{
            color: 'rgba(255, 255, 255, 1)', alignSelf: 'center', marginTop: 6, fontWeight: '600', lineHeight: 20, fontFamily: 'Roboto-Medium'
          }}>Đăng</Text>
        </TouchableOpacity>
      </View>
      <View style={{ paddingTop: 20 }}>
        <View style={{ flexDirection: 'row', marginLeft: 20 }}>
          <Image source={{ uri: userAvatar.avatar }} style={{ borderRadius: 51, width: 40, height: 40 }} />
          <Text style={{
            alignSelf: 'center', marginLeft: 10, fontWeight: '500', fontSize: 14, lineHeight: 17, color: 'rgba(30, 30, 30, 1)', fontFamily: 'Roboto-Medium'
          }}>{informationData?.fullName}</Text>
        </View>
        <EvaluateComponent starRating={rating} setStarRating={setRating} />
        <TextInput style={{
          paddingHorizontal: 15, height: 100, borderWidth: 1, borderRadius: 8, borderColor: '#D9D9D9', backgroundColor: '#FFFFFF', flexDirection: 'row', alignItems: 'center', marginTop: 20, justifyContent: 'space-between', marginHorizontal: 16, fontWeight: '400', fontFamily: 'Roboto-Regular'
        }}
          value={comment}
          placeholder='Văn phòng sạch đẹp, thân thiện, đáp ứng công việc'
          multiline
          placeholderTextColor='#00000040'
          textAlignVertical='top'
          onChangeText={(text) => setComment(text)}
        />
        {imagecomment && (
          <Image source={{ uri: imagecomment }} style={{ width: PAGE_WIDTH * 0.92, height: PAGE_HEIGHT * 0.3, marginTop: 20, marginHorizontal: 16, borderRadius: 4 }} />
        )}
        <TouchableOpacity style={{
          backgroundColor: 'rgba(231, 79, 177, 0.1)', marginTop: 30, height: 40, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', borderRadius: 20, marginHorizontal: 16
        }} onPress={openImagePicker}>
          <CameraIcon />
          <Text style={{ marginLeft: 4, fontWeight: '600', fontSize: 14, color: 'rgba(231, 79, 177, 1)', fontFamily: 'Roboto-Medium' }}>Thêm ảnh để đánh giá</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreateReviewsScreen;
