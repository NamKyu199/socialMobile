import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView, Image, Modal, Dimensions, Animated, StyleSheet, SafeAreaView, PermissionsAndroid, Alert, Linking, Platform } from 'react-native';
import { ArchiveMinus, ArchiveSlash, ArchiveTick, Calendar, Call, Clock, CloseCircle, Edit2, Global, Location, Microphone2, Profile2User, SearchNormal1, Star1, User } from 'iconsax-react-native';
import { ArchiveMinusColor, CheckOne, ColorCheckOne, ColorStar, DirectIcon, GoogleMapIcon, HalfStar, LocationIcon, ShareColorIcon, Star, StarIcon } from '~utils/images/svg';
import styles from '~screens/MainScreen/MapsScreen/styles'
import AppImage from '~utils/images/app_images';
import ReadMore from '@fawazahmed/react-native-read-more';
import { useSharedValue } from 'react-native-reanimated';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import Carousel from 'react-native-reanimated-carousel';
import axios from 'axios';
import moment from "moment";
import 'moment/locale/vi';
import { GOOGLE_MAPS_API_KEY } from '~constant/APIKEY';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { fontFamilies } from '~constant/fontFamilies';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { BASE_URL } from '~services/ApiBaseUrl';
interface Location {
  latitude: number;
  longitude: number;
}

const MapsScreen = ({ navigation }: any) => {
  const [search, setSearch] = useState('');
  const [selectedSearch, setSelectedSearch] = useState('search');
  const [reviews, setReviews] = useState([]);
  const [summaryReview, setSummaryReview] = useState<any>([]);
  const [selectedOption, setSelectedOption] = useState({
    showLocation: false,
    showEvent: false,
    showSaveLocation: false,
    showNotification: true,
    showModalEvent: false,
    bottomSheetOpen: false,
    hasOpenedOnce: false,
    bottomSheetMoreOpen: false,
})

  const PAGE_WIDTH = Dimensions.get('window').width;
  const PAGE_HEIGHT = Dimensions.get('window').height;
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleShowEvent = () => {
    setSelectedOption((prevState) => ({ ...prevState, showLocation: false, showSaveLocation: false, showEvent: !selectedOption.showEvent }));
  };

  const [saveLocation, setSaveLocation] = useState([]);

  const handleShowSaveLocation = async () => {
    setSelectedOption((prev) => ({ ...prev, showLocation: false, showEvent: false, showSaveLocation: !selectedOption.showSaveLocation }));
    try {
      const response = await axios.get('http://192.53.172.131:1050/map/locationSaved');
      const result = response.data;
      setSaveLocation(result.locations)
    } catch (error: any) {
      console.error('Error showSaveLocation:', error.message);
    }
  };

  const handleSearchClear = () => {
    setSearch('');
  };

  useEffect(() => {
    setSelectedOption((prev) => ({ ...prev, showNotification: true }));
  }, []);

  const [eventDetails, setEventDetails] = useState<any>(null);
  const [suggestedEvent, setSuggestedEvent] = useState([]);
  const [pressedQuanTam, setPressedQuanTam] = useState(false);
  const [pressedSeThamGia, setPressedSeThamGia] = useState(false);
  const [eventIds, setEventIds] = useState(null);
  const [toggleLocationSaved, seTtoggleLocationSaved] = useState<boolean>(false);
  const [locationSaveID, setLocationSaveID] = useState(null);

  const handleShowModalEvent = async (eventId: any) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const [eventResponse, suggestedResponse] = await Promise.all([
        axios.get(`http://192.53.172.131:1050/home/getEvent/${eventId}`, {
          headers: { Authorization: accessToken },
        }),
        axios.get(`http://192.53.172.131:1050/home/getAllEventsSuggest/${eventId}`, {
          headers: { Authorization: accessToken },
        }),
      ]);
      setEventDetails(eventResponse.data.event);
      setSuggestedEvent(suggestedResponse.data.events);
      setSelectedOption((prev) => ({ ...prev, showModalEvent: true }));
      setEventIds(eventId);
      console.log('id:',eventId);
    } catch (error: any) {
      console.error('Error fetching event details or suggested events:', error.message);
    }
  };

  useEffect(() => {
    const fetchPressedStates = async () => {
      try {
        const quanTamValue = await AsyncStorage.getItem(`pressedQuanTam${eventIds}`);
        if (quanTamValue !== null) {
          setPressedQuanTam(JSON.parse(quanTamValue));
        }
        const seThamGiaValue = await AsyncStorage.getItem(`pressedSeThamGia${eventIds}`);
        if (seThamGiaValue !== null) {
          setPressedSeThamGia(JSON.parse(seThamGiaValue));
        }
      } catch (error: any) {
        console.error('Error fetching pressed states from AsyncStorage:', error.message);
      }
    };

    if (eventIds !== null) {
      fetchPressedStates();
    }
  }, [eventIds]);

  const handleQuanTamPress = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await axios.post(
        `http://192.53.172.131:1050/home/toggleInterestEvent/${eventIds}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken,
          },
        }
      );
      const result = response.data;
      console.log('Toggle pressedQuanTam Result:', result);
      if (result.isInterested !== undefined) {
        setPressedQuanTam(result.isInterested);
        await AsyncStorage.setItem(`pressedQuanTam${eventIds}`, JSON.stringify(result.isInterested));
      } else {
        console.error('Invalid toggleInterestEvent response:', result);
      }
    } catch (error: any) {
      console.error('Error toggling interest:', error.message);
    }
  };

  const handleSeThamGiaPress = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await axios.post(
        `http://192.53.172.131:1050/home/toggleParticipantEvent/${eventIds}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken,
          },
        }
      );
      const result = response.data;
      console.log('Toggle pressedSeThamGia Result:', result);
      if (result.isInterested !== undefined) {
        setPressedSeThamGia(result.isInterested);
        await AsyncStorage.setItem(`pressedSeThamGia${eventIds}`, JSON.stringify(result.isInterested));
      } else {
        console.error('Invalid toggleParticipantEvent response:', result);
      }
    } catch (error: any) {
      console.error('Error toggling participation:', error.message);
    }
  };

  const handleSaveLocationPress = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await axios.post(
        `http://192.53.172.131:1050/map/toggleLocationSaved/${locationSaveID}`,
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );
      const result = response.data;
      console.log('Toggle pressedSaveLocation Result:', result);
      if (result.isSaved !== undefined) {
        seTtoggleLocationSaved(result.isSaved);
        await AsyncStorage.setItem(`pressedSaveLocation${locationSaveID}`, JSON.stringify(result.isSaved));
      } else {
        console.error('Invalid toggleLocationSaved response:', result);
      }
    } catch (error: any) {
      console.error('Error toggling location saved state:', error.message);
    }
  };

  const handleOpenBottomSheetMore = async (item: any) => {
    try {
      const [locationResponse, reviewsResponse, summaryReviewResponse] = await Promise.all([
        axios.get(`http://192.53.172.131:1050/map/locationId/${item._id}`),
        axios.get(`http://192.53.172.131:1050/map/formattedReviews/${item._id}`),
        axios.get(`http://192.53.172.131:1050/map/summaryReview/${item._id}`)
      ]);
      setLocations(locationResponse.data);
      setReviews(reviewsResponse.data.reviews);
      setSummaryReview(summaryReviewResponse.data);
      if (!selectedOption.hasOpenedOnce) {
        setSelectedOption((prev) => ({ ...prev, bottomSheetMoreOpen: !selectedOption.bottomSheetMoreOpen, hasOpenedOnce: true }));
      }
      bottomSheetRef.current?.expand();
      setSelectedOption((prev) => ({ ...prev, showLocation: false, showEvent: false, showSaveLocation: false }));
      setLocationSaveID(item._id)
    } catch (error: any) {
      console.error('Error fetching event details:', error.message);
    }
  };

  const progressValue = useSharedValue<number>(0);
  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH,
    height: PAGE_WIDTH * 0.5,
  } as const;

  const PercentageBar = ({ percentage }: any) => {
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

  const currentTime = moment();
  const [locations, setLocations] = useState<any | []>([]);
  const [maps, setMaps] = useState<any[]>([]);
  const [numberMaps, setNumberMaps] = useState<any>([])
  const [eventNews, setEventNews] = useState([]);
  const [position, setPosition] = useState<{ latitude: number; longitude: number } | null>(null);

  const handleShareLocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation();
        setSelectedOption((prev) => ({ ...prev, showNotification: false, showLocation: true }))
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition({ latitude, longitude });
      },
      (error) => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
      { enableHighAccuracy: true }
    );
  };

  useEffect(() => {
    if (position) {
      fetchLocations(position.latitude, position.longitude);
      fetchEventNews(position.latitude, position.longitude);
    }
  }, [position]);

  const fetchLocations = async (latitude: number, longitude: number) => {
    try {
      const response = await axios.post('http://192.53.172.131:1050/map/locations', {
        latitude: latitude,
        longitude: longitude
      });
      setMaps(response.data.formattedLocations);
      setNumberMaps(response.data.countLocations);
    } catch (error: any) {
      console.error('Error fetching locations:', error.message);
    }
  };

  const fetchEventNews = async (latitude: number, longitude: number) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken')
      const response = await axios.post('http://192.53.172.131:1050/home/getEventsLocation', {
        latitude: latitude,
        longitude: longitude,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': accessToken,
        }
      });
      setEventNews(response.data.events);
    } catch (error: any) {
      console.error('Error fetching events :', error.message);
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  moment.locale('vi'); // Set the locale to Vietnamese

  const formatVietnamDate = (utcDate: string) => {
    const vietnamDate = moment.utc(utcDate).tz('Asia/Ho_Chi_Minh');
    return vietnamDate.fromNow();
  };

  const formatVietnamDateMore = (utcDate: any) => {
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

  const [activeIndex, setActiveIndex] = useState(0);

  const makePhoneCall = (numberPhone: any) => {
    if (numberPhone) {
      Linking.openURL(`tel:${numberPhone}`);
    } else {
      Linking.openURL(`telprompt:${numberPhone}`);
    }
  };

  const makePhoneCallMore = (numberPhoneMore: any) => {
    if (numberPhoneMore) {
      Linking.openURL(`tel:${numberPhoneMore}`);
    } else {
      Linking.openURL(`telprompt:${numberPhoneMore}`);
    }
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
    <View style={{ flex: 1 }}>
      <Modal
        visible={selectedOption.showNotification}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSelectedOption((prev) => ({ ...prev, showNotification: false, showSaveLocation: false, showEvent: false, showLocation: false, bottomSheetOpen: false }))}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitleText}>Chia sẻ vị trí</Text>
            <Text style={styles.modalText}>Bạn có muốn chia sẻ vị trí của mình không?</Text>
            <View style={styles.modalLocation}>
              <TouchableOpacity onPress={() => setSelectedOption((prev) => ({ ...prev, showNotification: false }))}>
                <Text style={styles.modalTextButton}>Không</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleShareLocation} style={styles.fromButtonColor}>
                <Text style={styles.modalTextButtonColor}>Có</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <View style={styles.searchContainer}>
            <GooglePlacesAutocomplete
              placeholder='Nhập địa chỉ của bạn'
              textInputProps={{
                placeholderTextColor: 'rgba(166, 166, 166, 1)',
                onFocus: () => setSelectedSearch('close'),
                onBlur: () => setSelectedSearch('search'),
                value: search,
                onChangeText: setSearch,
              }}
              query={{
                key: GOOGLE_MAPS_API_KEY,
                language: 'en',
              }}
              styles={{
                container: styles.autocompleteContainer,
                textInput: styles.searchInput,
                listView: styles.listView,
              }}
              onPress={(data, details = null) => {
                console.log(data, details);
              }}
            />
            <View style={styles.searchIcons}>
              <TouchableOpacity>
                <Microphone2 size={20} color="rgba(151, 78, 195, 1)" variant="Bold" />
              </TouchableOpacity>
              {selectedSearch === 'search' && (
                <TouchableOpacity>
                  <SearchNormal1 size={20} color='rgba(151, 78, 195, 1)' style={styles.iconMargin} />
                </TouchableOpacity>
              )}
              {selectedSearch === 'close' && (
                <TouchableOpacity onPress={handleSearchClear}>
                  <CloseCircle size={20} color='rgba(166, 166, 166, 1)' variant="Bold" style={styles.iconMargin} />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <SafeAreaView style={{
            ...StyleSheet.absoluteFillObject,
            height: PAGE_HEIGHT,
            width: PAGE_WIDTH,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={StyleSheet.absoluteFillObject}
              region={{
                latitude: position?.latitude || 20.984739466631968,
                longitude: position?.longitude || 105.77560749913258,
                latitudeDelta: 0.002,
                longitudeDelta: 0.002,
              }}>
              {position?.latitude && position?.longitude && (
                <Marker coordinate={{ latitude: position.latitude, longitude: position.longitude }}>
                  <Image source={AppImage.LocationIconMy} />
                </Marker>
              )}
              {maps.map((item, index) => (
                <Marker
                  key={index}
                  coordinate={{ latitude: item.latitude, longitude: item.longitude }}
                  onPress={() => handleOpenBottomSheetMore(item)}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <View style={styles.iconWrapper}>
                      <LocationIcon style={{ width: 40, height: 50 }} />
                    </View>
                    <Text style={{
                      fontSize: 14,
                      color: '#E74FB1',
                      fontFamily: fontFamilies.medium,
                      fontWeight: '500',
                      alignSelf: 'center',
                      padding: 'auto'
                    }}>{item.name}</Text>
                  </View>
                </Marker>
              ))}
            </MapView>
          </SafeAreaView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.iconButton} onPress={handleShowSaveLocation}>
              {selectedOption.showSaveLocation ? <CloseCircle color='#E74FB1' variant="Bold" size={50} /> : <ArchiveMinus size={24} color='rgba(231, 79, 177, 1)' style={styles.buttonIcon} />}
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={handleShowEvent}>
              {selectedOption.showEvent ? <CloseCircle color='#E74FB1' variant="Bold" size={50} /> : <Calendar size={24} color='rgba(231, 79, 177, 1)' style={styles.buttonIcon} />}
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={handleShareLocation}>
              <DirectIcon style={styles.buttonIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
      {selectedOption.showSaveLocation && (
        <View style={styles.bodyShowSaveLocation}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {saveLocation.slice(0, 5).map((item: any, index: any) => (
              <View
                key={index}
                style={{
                  backgroundColor: 'white',
                  marginHorizontal: 8,
                  flexDirection: 'row',
                  padding: 8,
                  gap: 8,
                  borderRadius: 8,
                }}>
                <View style={{ borderRadius: 4, width: PAGE_WIDTH * 0.22, height: PAGE_HEIGHT * 0.17 }}>
                  <Image
                    source={{ uri: item.images[0] }}
                    style={{ borderRadius: 4, maxWidth: '100%', height: '100%' }}
                  />
                </View>
                <View style={{ gap: 4 }}>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}>
                    <TouchableOpacity>
                      <Text style={{
                        fontWeight: '600',
                        fontFamily: 'Roboto-Medium',
                        fontSize: 16,
                        color: '#1E1E1E',
                        maxWidth: PAGE_WIDTH * 0.6
                      }}>{item.name}</Text>
                    </TouchableOpacity>
                    <ArchiveSlash color='#974EC3' variant="Bold" size={20} style={{ marginLeft: 8 }} />
                  </View>
                  <Text style={{ fontFamily: 'Roboto-Light', fontWeight: '300', fontSize: 13 }}>{item.description}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.numberReview}>{item.averageRating}</Text>
                    <View style={styles.stars}>
                      <View style={{ marginLeft: 5 }}>
                        {item.averageRating >= 1 ? <ColorStar width={16} height={16} /> : <StarIcon width={16} height={16} />}
                      </View>
                      <View style={{ marginLeft: 2 }}>
                        {item.averageRating >= 2 ? <ColorStar width={16} height={16} /> : <StarIcon width={16} height={16} />}
                      </View>
                      <View style={{ marginLeft: 2 }}>
                        {item.averageRating >= 3 ? <ColorStar width={16} height={16} /> : <StarIcon width={16} height={16} />}
                      </View>
                      <View style={{ marginLeft: 2 }}>
                        {item.averageRating >= 4 ? <ColorStar width={16} height={16} /> : <StarIcon width={16} height={16} />}
                      </View>
                      <View style={{ marginLeft: 2, marginRight: 5 }}>
                        {item.averageRating >= 5 ? <ColorStar width={16} height={16} /> : <StarIcon width={16} height={16} />}
                      </View>
                    </View>
                    <Text style={styles.numberUserReview}>({item.totalReviews})</Text>
                  </View>
                  <View style={styles.openingHoursContainer}>
                    <Text style={[styles.openingStatus, { color: currentTime.isBetween(moment(item.openingHours.monday.open, 'HH:mm'), moment(item.openingHours.monday.close, 'HH:mm'), null, '[)') ? '#504099' : 'red' }]}>
                      {currentTime.isBetween(moment(item.openingHours.monday.open, 'HH:mm'), moment(item.openingHours.monday.close, 'HH:mm'), null, '[)') ? 'Đang mở cửa' : 'Đang đóng cửa'}
                    </Text>
                    <Text style={styles.openingTime}>
                      {' · '}
                      {currentTime.isBetween(moment(item.openingHours.monday.open, 'HH:mm'), moment(item.openingHours.monday.close, 'HH:mm'), null, '[)') ?
                        `Mở cửa lúc ${item.openingHours.monday.open}` :
                        `Đóng cửa lúc ${item.openingHours.monday.close}`
                      }
                    </Text>
                  </View>
                  <Text style={{
                    fontWeight: '400',
                    fontSize: 14,
                    color: '#1E1E1E',
                    fontFamily: 'Roboto-Regular',
                    maxWidth: PAGE_WIDTH * 0.6
                  }}
                    numberOfLines={2}
                  >
                    {`${item.address.detailAddress}, ${item.address.ward}, ${item.address.district}, ${item.address.city}`}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
      {selectedOption.showEvent && (
        <View style={{ marginBottom: 30 }}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {eventNews.slice(0, 3).map((item: any, index: number) => (
              <View key={index} style={styles.from_backgroud_event}>
                <Image source={{ uri: item?.image }} style={styles.background_envent} />
                {item?.startDate === getCurrentDate() ? (
                  <View style={styles.from_check_event}>
                    <Text style={styles.heading_check_event}>Đang diễn ra</Text>
                  </View>
                ) : item?.startDate > getCurrentDate() ? (
                  <View style={styles.from_check_event_process}>
                    <Text style={styles.heading_check_event}>Sắp diễn ra</Text>
                  </View>
                ) : null}
                <View style={styles.date_title}>
                  <TouchableOpacity
                    style={{ zIndex: 99 }}
                    onPress={() => {
                      const eventId = item.id;
                      console.log('item:',eventId)
                      handleShowModalEvent(eventId);
                    }}>
                    <Text style={styles.title_event1} numberOfLines={2}>{item?.nameEvent}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.careAbout,
                      { backgroundColor: pressedQuanTam ? 'rgba(82, 5, 127, 1)' : 'rgba(242, 242, 242, 1)' },
                    ]}
                    accessibilityLabel="Interested"
                    accessibilityHint="Mark your interest for the event"
                    onPress={handleQuanTamPress}
                  >
                    <View style={styles.titleIcon}>
                      {pressedQuanTam ? <ColorStar width={15} height={15} /> : <Star width={15} height={15} />}
                    </View>
                    <Text style={[
                      styles.headingAbout,
                      { color: pressedQuanTam ? 'rgba(255, 255, 255, 1)' : 'rgba(89, 89, 89, 1)' },
                    ]}>
                      Quan tâm
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
      {selectedOption.showLocation && (
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={['50%', '50%']}
          enablePanDownToClose
        >
          <BottomSheetScrollView style={{ backgroundColor: '#F8F8F8', borderTopLeftRadius: 24, borderTopRightRadius: 24 }}>
            <View>
              <Text style={styles.bottomSheetText}>
                Có <Text style={styles.boldText}>{numberMaps}</Text> đại lý gần bạn
              </Text>
              {maps.map((item: any, index: any) => (
                <View key={index} style={{
                  marginBottom: 20, backgroundColor: '#FFFFFF', paddingTop: 12, paddingBottom: 12
                }}>
                  <TouchableOpacity onPress={() => handleOpenBottomSheetMore(item)}>
                    <Text style={styles.location}>{item.name}</Text>
                  </TouchableOpacity>
                  <Text style={styles.locationAdress}>{item.description}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, marginHorizontal: 20 }}>
                    <Text style={styles.numberReview}>{item.averageRating}</Text>
                    <View style={styles.stars}>
                      {[0.5, 1.5, 2.5, 3.5, 4.5].map((starIndex) => (
                        <View key={starIndex} style={{ marginLeft: starIndex === 0.5 ? 0 : 2 }}>
                          {item.averageRating >= starIndex ? (
                            item.averageRating >= starIndex + 0.5 ? (
                              <ColorStar width={10} height={10} />
                            ) : (
                              <HalfStar width={10} height={10} />
                            )
                          ) : (
                            <StarIcon width={10} height={10} />
                          )}
                        </View>
                      ))}
                    </View>
                    <Text style={styles.numberUserReview}>({item.totalReviews})</Text>
                  </View>
                  <View style={{ flexDirection: 'row', marginTop: 5, borderTopWidth: 1, borderBottomWidth: 1, justifyContent: 'space-between', paddingTop: 10, paddingBottom: 10, borderColor: 'rgba(221, 221, 221, 0.8)' }}>
                    <TouchableOpacity onPress={() => {
                      const numberPhone = item.phoneNumber;
                      console.log('phone:', numberPhone)
                      makePhoneCall(numberPhone)
                    }}>
                      <Call size={20} color='rgba(231, 79, 177, 1)' style={{ marginLeft: 35 }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <GoogleMapIcon />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text style={{ marginRight: 21, fontWeight: '700', fontSize: 16, color: 'rgba(231, 79, 177, 1)' }}>{item.distance} Km</Text>
                    </TouchableOpacity>
                  </View>
                  <View key={index} style={[styles.locationContainer, { marginHorizontal: 20 }]}>
                    <View style={styles.openingHoursContainer}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[styles.openingStatus, { color: currentTime.isBetween(moment(item.openingHours.monday.open, 'HH:mm'), moment(item.openingHours.monday.close, 'HH:mm'), null, '[)') ? '#504099' : 'red' }]}>
                          {currentTime.isBetween(moment(item.openingHours.monday.open, 'HH:mm'), moment(item.openingHours.monday.close, 'HH:mm'), null, '[)') ? 'Đang mở cửa' : 'Đang đóng cửa'}
                        </Text>
                        <Text style={styles.openingTime}>
                          {' · '}
                          Mở cửa lúc {item.openingHours.monday.open}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Text style={styles.locationReview}>{`${item.address.detailAddress}, ${item.address.ward}, ${item.address.district}, ${item.address.city}`}</Text>
                </View>
              ))}
            </View>
          </BottomSheetScrollView>
        </BottomSheet>
      )}
      <Modal
        visible={selectedOption.showModalEvent}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSelectedOption((prev) => ({ ...prev, showModalEvent: false }))}>
        <View style={styles.modalContainer}>
          <View style={styles.modalEvent}>
            <TouchableOpacity onPress={() => setSelectedOption((prev) => ({ ...prev, showModalEvent: false }))} style={{ alignSelf: 'flex-end', padding: 10 }}>
              <CloseCircle color='#59595999' variant="Bold" size={35} />
            </TouchableOpacity>
            <ScrollView >
              <View style={styles.imageContainer}>
                {eventDetails?.image ? (
                  <Image source={{ uri: eventDetails?.image }} style={styles.poster} />
                ) : (
                  <Text>No image available</Text>
                )}
                <LinearGradient
                  colors={['#FFFFFF', 'transparent']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 0.5 }}
                  style={[styles.gradient, styles.gradientTop]}
                />
                <LinearGradient
                  colors={['transparent', '#FFFFFF']}
                  start={{ x: 0.5, y: 0.5 }}
                  end={{ x: 0.5, y: 1 }}
                  style={[styles.gradient, styles.gradientBottom]}
                />
              </View>
              <View style={{ flexGrow: 1, marginTop: PAGE_HEIGHT * 0.27 }}>
                <View style={styles.textOverlay}>
                  <Text style={styles.title_date}>{formatVietnamDateMore(eventDetails?.startDate)}</Text>
                  <Text style={styles.title_event}>{eventDetails?.nameEvent}</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                  <View style={{ marginHorizontal: 15 }}>
                    <View style={styles.from_flowing}>
                      <TouchableOpacity
                        style={[
                          {
                            borderRadius: 8,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginTop: 10,
                            paddingVertical: 10,
                            paddingHorizontal: 20
                          },
                          { backgroundColor: pressedQuanTam ? 'rgba(82, 5, 127, 1)' : 'rgba(242, 242, 242, 1)' },
                        ]}
                        accessibilityLabel="Interested"
                        accessibilityHint="Mark your interest for the event"
                        onPress={handleQuanTamPress}
                      >
                        <View style={styles.titleIcon}>
                          {pressedQuanTam ? <ColorStar width={15} height={15} /> : <Star width={15} height={15} />}
                        </View>
                        <Text style={[
                          styles.headingAbout,
                          { color: pressedQuanTam ? 'rgba(255, 255, 255, 1)' : 'rgba(89, 89, 89, 1)' },
                        ]}>
                          Quan tâm
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          {
                            borderRadius: 8,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginTop: 10,
                            paddingVertical: 10,
                            paddingHorizontal: 20
                          },
                          { backgroundColor: pressedSeThamGia ? 'rgba(82, 5, 127, 1)' : 'rgba(242, 242, 242, 1)' },
                        ]}
                        accessibilityLabel="Will attend"
                        accessibilityHint="Mark your attendance for the event"
                        onPress={handleSeThamGiaPress}
                      >
                        <View style={styles.titleIcon}>
                          {pressedSeThamGia ? <ColorCheckOne /> : <CheckOne />}
                        </View>
                        <Text style={[
                          styles.headingAbout,
                          { color: pressedSeThamGia ? 'rgba(255, 255, 255, 1)' : 'rgba(89, 89, 89, 1)' },
                        ]}>
                          Sẽ tham gia
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.from_share} accessibilityLabel="Share" accessibilityHint="Share this event">
                        <Image source={AppImage.share} style={styles.shareIcon} />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.from_information}>
                      <Text style={styles.title_infomation}>Chi tiết</Text>
                      <View style={styles.information}>
                        <Profile2User color="rgba(166, 166, 166, 1)" variant="Bold" size={20} />
                        <Text style={styles.heading_information}>{eventDetails?.participantUsersCount} người đăng ký tham gia</Text>
                      </View>
                      <View style={styles.information}>
                        <User color="rgba(166, 166, 166, 1)" variant="Bold" size={20} />
                        <Text style={styles.heading_information}>Sự kiện của {eventDetails?.createBy}</Text>
                      </View>
                      <View style={styles.information}>
                        <Location color="rgba(166, 166, 166, 1)" variant="Bold" size={20} />
                        <Text style={styles.heading_information_link}>{eventDetails?.company}</Text>
                      </View>
                    </View>
                    <View>
                      <Text style={styles.title_text}>{eventDetails?.descriptionSections[0]?.title}</Text>
                      <ReadMore numberOfLines={3}
                        animate={true}
                        expandOnly={true}
                        seeMoreText="Đọc thêm"
                        seeMoreStyle={styles.seeMore}
                        style={styles.textStyle}
                      >
                        {eventDetails?.descriptionSections[0]?.content}
                      </ReadMore>
                    </View>
                    <View style={{ marginTop: 15 }}>
                      <Text style={styles.title_text}>{eventDetails?.descriptionSections[1]?.title}</Text>
                      <ReadMore numberOfLines={5}
                        animate={true}
                        expandOnly={true}
                        seeMoreText="Đọc thêm"
                        seeMoreStyle={styles.seeMore}
                        style={styles.textStyle}
                      >
                        {eventDetails?.descriptionSections[1]?.content}
                      </ReadMore>
                    </View>
                  </View>
                  <View style={{ marginTop: 20, marginHorizontal: 16 }}>
                    <Text style={styles.from_location}>Vị trí</Text>
                    <View style={styles.body_location}>
                      <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        region={{
                          latitude: eventDetails?.location.latitude,
                          longitude: eventDetails?.location.longitude,
                          latitudeDelta: 0.001,
                          longitudeDelta: 0.001,
                        }}>
                        <Marker
                          coordinate={{ latitude: eventDetails?.location.latitude, longitude: eventDetails?.location.longitude }}
                        >
                          <View style={{ flexDirection: 'row' }}>
                            <View style={styles.iconWrapper}>
                              <LocationIcon style={{ width: 40, height: 50 }} />
                            </View>
                            <Text style={{
                              fontSize: 14,
                              color: '#E74FB1',
                              fontFamily: fontFamilies.medium,
                              fontWeight: '500',
                              alignSelf: 'center',
                              padding: 'auto'
                            }}>{eventDetails?.company}</Text>
                          </View>
                        </Marker>
                      </MapView>
                      <View style={styles.from_location_map}>
                        <Text style={styles.title_map}>{eventDetails?.company}</Text>
                        <Text style={styles.location_map}>{eventDetails?.address}</Text>
                        <Text style={styles.location}>{eventDetails?.type}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={{ marginTop: 20, marginBottom: 40, marginHorizontal: 16 }}>
                    <Text style={styles.title_suggested_event}>Sự kiện gợi ý</Text>
                    {suggestedEvent?.slice(0, 2).map((suggestedEvent: any, index: any) => (
                      <View key={index} style={styles.from_date}>
                        <View style={{ flexDirection: 'row', paddingTop: 8, paddingHorizontal: 8, paddingBottom: 8 }}>
                          <View style={styles.body_date}>
                            <Text style={styles.month}>Tháng</Text>
                            <Text style={{ fontWeight: '700', fontSize: 36, color: 'rgba(231, 79, 177, 1)', alignSelf: 'center' }}>{suggestedEvent?.specificMonth}</Text>
                          </View>
                          <View style={{ marginTop: 5, alignSelf: 'center', width: PAGE_WIDTH * 0.67, marginLeft: 9 }}>
                            <Text style={styles.time_event}>{formatVietnamDateMore(suggestedEvent?.startDate)}</Text>
                            <Text numberOfLines={2} style={styles.title_time_event}>{suggestedEvent?.nameEvent}</Text>
                            <Text style={styles.location_event}>{suggestedEvent?.address}</Text>
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
      {selectedOption.bottomSheetMoreOpen && (
        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={['50%', '100%']}
          enablePanDownToClose
          enableDynamicSizing
        >
          <BottomSheetScrollView style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24 }}>
            <View style={{ zIndex: 999 }}>
              <Carousel
                {...baseOptions}
                style={{
                  width: PAGE_WIDTH,
                  height: PAGE_HEIGHT * 0.25,
                  borderRadius: 8,
                }}
                loop
                pagingEnabled
                snapEnabled
                onProgressChange={(_, absoluteProgress) => {
                  progressValue.value = absoluteProgress;
                  setActiveIndex(Math.round(absoluteProgress));
                }}
                mode="parallax"
                data={locations.images || []}
                renderItem={({ item, index }: any) => (
                  <View key={index} style={{ flexDirection: 'row', width: PAGE_WIDTH, height: '100%', borderRadius: 8 }}>
                    <Image source={{ uri: item }} style={{ width: '100%', height: '100%', margin: 5, alignItems: 'center', borderRadius: 8 }} />
                    <View style={{
                      position: 'absolute',
                      top: 5,
                      left: 5,
                      right: -5,
                      bottom: -5,
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      borderRadius: 8,
                    }} />
                  </View>
                )}
              />
            </View>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 8
            }}>
              {locations.images.map((_: any, index: any) => (
                <View
                  key={index}
                  style={[
                    {
                      width: 6,
                      height: 6,
                      borderRadius: 5,
                      marginHorizontal: 5,
                    },
                    activeIndex === index ? {
                      backgroundColor: '#722ED1',
                    } : {
                      backgroundColor: '#DDDDDD',
                    },
                  ]}
                />
              ))}
            </View>
            <View style={{ marginTop: 32 }}>
              <TouchableOpacity>
                <Text style={styles.location}>{locations.name}</Text>
              </TouchableOpacity>
              <Text style={styles.locationAdress}>{locations.description}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, marginHorizontal: 20 }}>
                <Text style={styles.numberReview}>{locations.averageRating}</Text>
                <View style={styles.stars}>
                  <View >
                    {locations.averageRating >= 1 ? <ColorStar width={10} height={10} /> : <StarIcon width={10} height={10} />}
                  </View>
                  <View style={{ marginLeft: 2 }}>
                    {locations.averageRating >= 2 ? <ColorStar width={10} height={10} /> : <StarIcon width={10} height={10} />}
                  </View>
                  <View style={{ marginLeft: 2 }}>
                    {locations.averageRating >= 3 ? <ColorStar width={10} height={10} /> : <StarIcon width={10} height={10} />}
                  </View>
                  <View style={{ marginLeft: 2 }}>
                    {locations.averageRating >= 4 ? <ColorStar width={10} height={10} /> : <StarIcon width={10} height={10} />}
                  </View>
                  <View style={{ marginLeft: 2 }}>
                    {locations.averageRating >= 5 ? <ColorStar width={10} height={10} /> : <StarIcon width={10} height={10} />}
                  </View>
                </View>
                <Text style={styles.numberUserReview}>({locations.totalReviews})</Text>
              </View>
              <View style={[styles.locationContainer, { marginHorizontal: 20 }]}>
                <View style={styles.openingHoursContainer}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[styles.openingStatus, { color: currentTime.isBetween(moment(locations.openingHours.monday.open, 'HH:mm'), moment(locations.openingHours.monday.close, 'HH:mm'), null, '[)') ? '#504099' : 'red' }]}>
                      {currentTime.isBetween(moment(locations.openingHours.monday.open, 'HH:mm'), moment(locations.openingHours.monday.close, 'HH:mm'), null, '[)') ? 'Đang mở cửa' : 'Đang đóng cửa'}
                    </Text>
                    <Text style={styles.openingTime}>
                      {' · '}
                      {currentTime.isBetween(moment(locations.openingHours.monday.open, 'HH:mm'), moment(locations.openingHours.monday.close, 'HH:mm'), null, '[)') ?
                        `Mở cửa lúc ${locations.openingHours.monday.open}` :
                        `Đóng cửa lúc ${locations.openingHours.monday.close}`
                      }
                    </Text>
                  </View>
                </View>
              </View>
              <Text style={styles.locationReview}>
                {`${locations.address.detailAddress}, ${locations.address.ward}, ${locations.address.district}, ${locations.address.city}`}
              </Text>
              <BottomSheetScrollView style={{ flexDirection: 'row', marginTop: 12, paddingVertical: 5 }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <TouchableOpacity
                  style={{
                    width: 120,
                    height: 40,
                    backgroundColor: '#E74FB11A',
                    borderRadius: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 16,
                    borderColor: '#E74FB1',
                    borderWidth: 1,
                  }}
                  onPress={() => {
                    const latitude = locations.latitude;
                    const longitude = locations.longitude;
                    if (latitude && longitude) {
                      const url = `http://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
                      Linking.openURL(url);
                    }
                  }}
                >
                  <GoogleMapIcon style={{ marginLeft: 18 }} />
                  <Text
                    style={{
                      marginLeft: 8,
                      fontFamily: 'Roboto-Medium',
                      fontWeight: '600',
                      fontSize: 14,
                      color: '#E74FB1',
                    }}
                  >
                    Đường đi
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                  width: 85,
                  height: 40,
                  backgroundColor: '#E74FB11A',
                  borderRadius: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 16
                }}
                  onPress={() => {
                    const numberPhoneMore = locations.phoneNumber;
                    console.log('phone:', numberPhoneMore)
                    makePhoneCallMore(numberPhoneMore)
                  }}
                >
                  <Call color='#E74FB1' style={{ marginLeft: 16 }} />
                  <Text style={{ marginLeft: 4, fontWeight: '600', fontFamily: 'Roboto-Medium', fontSize: 14, color: '#E74FB1' }}>Gọi</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[{
                  width: 90,
                  height: 40,
                  backgroundColor: '#E74FB11A',
                  borderRadius: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 16
                },
                { backgroundColor: toggleLocationSaved ? '#E74FB1' : '#E74FB11A' }]}
                  accessibilityLabel="isSaved"
                  accessibilityHint="Mark your isSaved for the Location"
                  onPress={handleSaveLocationPress}>
                  <View>
                    {toggleLocationSaved ? <ArchiveMinusColor color='#FFFFFF' style={{ marginLeft: 18 }} /> : <ArchiveMinus color='#E74FB1' style={{ marginLeft: 18 }} />}
                  </View>
                  <Text style={[{
                    marginLeft: 4,
                    fontWeight: '600',
                    fontFamily: 'Roboto-Medium',
                    fontSize: 14,
                    color: '#E74FB1'
                  },
                  { color: toggleLocationSaved ? '#FFFFFF' : '#E74FB1' }
                  ]}>
                    Lưu
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ width: 100, height: 40, backgroundColor: '#E74FB11A', borderRadius: 20, flexDirection: 'row', alignItems: 'center', marginHorizontal: 16 }}>
                  <ShareColorIcon style={{ marginLeft: 16 }} />
                  <Text style={{ marginLeft: 4, fontWeight: '600', fontFamily: 'Roboto-Medium', fontSize: 14, color: '#E74FB1' }}>Chia sẻ</Text>
                </TouchableOpacity>
              </BottomSheetScrollView>
              <View style={{ flexDirection: 'row', marginTop: 12, justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#DDDDDDCC' }}>
                <TouchableOpacity style={{ marginLeft: 30 }}>
                  <Text style={{ fontFamily: 'Roboto-Regular', fontWeight: '400', fontSize: 16, color: '#722ED1', borderBottomWidth: 1, paddingHorizontal: 10, borderColor: '#722ED1', paddingBottom: 20 }}>Tổng quan</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginRight: 100 }} onPress={() => {
                  navigation.navigate('EvaluateScreen', { id: locations._id })
                }}>
                  <Text style={{ fontFamily: 'Roboto-Regular', fontWeight: '400', fontSize: 16, color: '#1E1E1E' }}>Đánh giá</Text>
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 20, borderBottomWidth: 1, paddingBottom: 20, borderColor: '#DDDDDDCC' }}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Location color='#974EC3' size={20} style={{ marginTop: 5, marginLeft: 16, marginRight: 12 }} />
                  <Text style={{
                    fontWeight: '400',
                    fontSize: 14,
                    color: '#1E1E1E',
                    marginTop: 5,
                    fontFamily: 'Roboto-Regular',
                    width: PAGE_WIDTH * 0.85
                  }}>
                    {`${locations.address.detailAddress}, ${locations.address.ward}, ${locations.address.district}, ${locations.address.city}`}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                  <Clock color='#974EC3' size={20} style={{ marginTop: 5, marginLeft: 16, marginRight: 12 }} />
                  <View style={{
                    backgroundColor: '#FFFFFF',
                    alignSelf: 'center'
                  }}>
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[styles.openingStatus, { color: currentTime.isBetween(moment(locations.openingHours.monday.open, 'HH:mm'), moment(locations.openingHours.monday.close, 'HH:mm'), null, '[)') ? '#504099' : 'red' }]}>
                          {currentTime.isBetween(moment(locations.openingHours.monday.open, 'HH:mm'), moment(locations.openingHours.monday.close, 'HH:mm'), null, '[)') ? 'Đang mở cửa' : 'Đang đóng cửa'}
                        </Text>
                        <Text style={styles.openingTime}>
                          {' · '}
                          Mở cửa lúc {locations.openingHours.monday.open}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                  <Global color='#974EC3' size={20} style={{ marginTop: 5, marginLeft: 16, marginRight: 12 }} />
                  <Text style={{
                    fontWeight: '400',
                    fontSize: 14,
                    color: '#1E1E1E',
                    marginTop: 5,
                    fontFamily: 'Roboto-Regular',
                  }}>{locations.website}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                  <Edit2 color='#974EC3' size={20} style={{ marginTop: 5, marginLeft: 16, marginRight: 12 }} />
                  <Text style={{
                    fontWeight: '400',
                    fontSize: 14,
                    color: '#1E1E1E',
                    marginTop: 5,
                    fontFamily: 'Roboto-Regular',
                  }}>Đề xuất chỉnh sửa</Text>
                </TouchableOpacity>
              </View>
              <View style={{ borderBottomWidth: 1, paddingBottom: 20, borderColor: '#DDDDDDCC' }}>
                <View style={{ marginTop: 20, marginHorizontal: 20 }}>
                  <Text style={styles.title1}>Số lượt đánh giá</Text>
                  <View style={{ flexDirection: 'row', marginTop: 12 }}>
                    <View style={{ alignSelf: 'center', marginBottom: 15 }}>
                      <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: '500', fontFamily: 'Roboto-Medium', color: '#1E1E1E' }}>{summaryReview.averageRating}</Text>
                      <View style={styles.totalWrap}>
                        <View>
                          {summaryReview.averageRating >= 1 ? <ColorStar width={15} height={15} /> : <StarIcon width={15} height={15} />}
                        </View>
                        <View style={{ marginLeft: 5 }}>
                          {summaryReview.averageRating >= 2 ? <ColorStar width={15} height={15} /> : <StarIcon width={15} height={15} />}
                        </View>
                        <View style={{ marginLeft: 5 }}>
                          {summaryReview.averageRating >= 3 ? <ColorStar width={15} height={15} /> : <StarIcon width={15} height={15} />}
                        </View>
                        <View style={{ marginLeft: 5 }}>
                          {summaryReview.averageRating >= 4 ? <ColorStar width={15} height={15} /> : <StarIcon width={15} height={15} />}
                        </View>
                        <View style={{ marginLeft: 5 }}>
                          {summaryReview.averageRating >= 5 ? <ColorStar width={15} height={15} /> : <StarIcon width={15} height={15} />}
                        </View>
                      </View>
                      <Text style={{ alignSelf: 'center', color: '#ADAFB2', fontFamily: 'Roboto-Regular', fontWeight: '400' }}>({summaryReview.totalReviews})</Text>
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
                  <TouchableOpacity onPress={() => {
                    navigation.navigate('EvaluateScreen', {
                      id: locations._id,
                    })
                  }}
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
                <Text style={{ marginLeft: 16, fontWeight: '500', fontFamily: 'Roboto-Medium', fontSize: 16, color: '#1E1E1E' }}>Bài đánh giá</Text>
                {reviews.slice(0, 4).map((item: any, index: any) => (
                  <View key={index}
                    style={
                      index < 3
                        ? { borderBottomWidth: 1, paddingBottom: 20, borderColor: '#DDDDDDCC', marginTop: 22 }
                        : { marginTop: 22 }
                    }
                  >
                    <View style={{ flexDirection: 'row' }}>
                      <View style={{ width: PAGE_WIDTH * 0.12, height: PAGE_HEIGHT * 0.06, marginLeft: 15 }}>
                        <Image source={{ uri: item.avatar }} style={{ width: '100%', height: '100%', borderRadius: 50 }} />
                      </View>
                      <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontWeight: '500', fontFamily: 'Roboto-Medium', fontSize: 14, color: '#1E1E1E' }}>
                          {item.fullName}
                        </Text>
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
                    <Text style={{ marginTop: 10, marginHorizontal: 16, fontWeight: '400', fontFamily: 'Roboto-Regular', color: '#595959' }}>
                      {item.comment}
                    </Text>
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
                ))}
                <TouchableOpacity onPress={() => {
                  navigation.navigate('EvaluateScreen', {
                    id: locations._id,
                  })
                }}>
                  <View style={{ backgroundColor: '#DDDDDD', height: 40, marginHorizontal: 16, borderRadius: 8, alignItems: 'center', marginBottom: 35, marginTop: 20 }}>
                    <Text style={{ paddingVertical: 10 }}>Xem thêm</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </BottomSheetScrollView>
        </BottomSheet>
      )}
    </View>
  );
};

export default MapsScreen;