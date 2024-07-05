import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import Header from "./Component/Header";
import Information from "./Component/Information";
import Evaluate from "./Component/Evaluate";
import Posts from "./Component/Posts";
import AnswerQuestion from "./Component/AnswerQuestion";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "~services/ApiBaseUrl";
import axios from "axios";
import { launchImageLibrary } from "react-native-image-picker";

const ProfileScreen = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [coverPhoto, setCoverPhoto] = useState<string | null>(null);
  const [followingCount, setFollowingCount] = useState();
  const [followerCount, setFollowerCount] = useState();
  const [totalPoints, setTotalPoints] = useState();
  const [views, setViews] = useState();

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await AsyncStorage.getItem('userId')
      setUserId(id);
    }
    fetchUserId();
    const fetchAvatar = async () => {
      if (userId !== null) {
        try {
          const accessToken = await AsyncStorage.getItem('accessToken')
          const response = await axios.get(`${BASE_URL}profile/getAvatar`,
            {
              headers: {
                'Authorization': accessToken
              }
            }
          )
          setAvatar(response.data.avatar)
        } catch (error: any) {

        }
      }
    }
    fetchAvatar();
    const fetchCoverPhoto = async () => {
      if (userId !== null) {
        try {
          const accessToken = await AsyncStorage.getItem('accessToken')
          const response = await axios.get(`${BASE_URL}profile/getCoverPhoto`,
            {
              headers: {
                'Authorization': accessToken
              }
            }
          )
          setCoverPhoto(response.data.coverPhoto)
        } catch (error: any) {

        }
      }
    }
    fetchCoverPhoto();
    const fetchFollowViewInteraction = async () => {
      if (userId !== null) {
        try {
          const response = await axios.get(`${BASE_URL}profile/getFollowViewInteraction/${userId}`)
          setFollowingCount(response.data.followingCount)
          setFollowerCount(response.data.followerCount)
          setTotalPoints(response.data.totalPoints)
          setViews(response.data.views)
        } catch (error: any) {

        }
      }
    }
    fetchFollowViewInteraction();
  })

  const openLib = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
      if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        setAvatar(uri || null)
      }
    })
  }

  const handleChangeAvatar = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const formData = new FormData();
      if (avatar) {
        const uriParts = avatar.split('/')
        const fileName = uriParts[uriParts.length - 1]
        formData.append('avatar', {
          uri: avatar,
          name: fileName,
          type: 'image/jpeg'
        })
      }
      const response = await axios.put(`${BASE_URL}profile/updateAvatar/${userId}`, {},
        {
          headers: {
            'authorization': accessToken,
            'Content-Type': 'multipart/form-data'
          }
        })
      console.log(response.data.avatar)
      setAvatar(response.data.avatar)
    } catch (error: any) {

    }
  }

  return (
    <ScrollView>
      <Header />
      <Information
        coverPhoto={{ uri: coverPhoto }}
        avatar={{ uri: avatar }}
        openLib={openLib}
        followingCount={followingCount}
        followerCount={followerCount}
        totalPoints={totalPoints}
        views={views}
      />
      <Evaluate />
      <Posts />
      <AnswerQuestion />
    </ScrollView>
  )
}

export default ProfileScreen;