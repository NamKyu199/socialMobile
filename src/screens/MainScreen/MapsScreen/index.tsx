import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView, Image, Modal, Dimensions, Animated, StyleSheet, SafeAreaView, PermissionsAndroid, Alert, Linking } from 'react-native';
import { ArchiveMinus, ArchiveSlash, Calendar, Call, Clock, CloseCircle, Edit2, Global, Location, Microphone2, Profile2User, SearchNormal1, Star1, User } from 'iconsax-react-native';
import { CheckOne, ColorCheckOne, ColorStar, DirectIcon, GoogleMapIcon, LocationIcon, ShareColorIcon, Star, StarIcon } from '~utils/images/svg';
import styles from '~screens/MainScreen/MapsScreen/styles'
import AppImage from '~utils/images/app_images';
import ReadMore from '@fawazahmed/react-native-read-more';
import { useSharedValue } from 'react-native-reanimated';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import Carousel from 'react-native-reanimated-carousel';
import axios from 'axios';
import moment from "moment";
import { GOOGLE_MAPS_API_KEY } from '~constant/APIKEY';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { fontFamilies } from '~constant/fontFamilies';
import { SaveLocation, reviewSaveLocation_1, reviewSaveLocation_2 } from '~utils/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
interface Location {
  latitude: number;
  longitude: number;
}

const MapsScreen = ({ navigation }: any) => {
  const [search, setSearch] = useState('');
  const [selectedSearch, setSelectedSearch] = useState('search');
  const [voteDEtail, setVoteDetail] = useState<any>([])

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
    setSelectedOption((prevState) => ({ ...prevState, showLocation: false, showSaveLocation: false, showEvent: !selectedOption.showEvent }))
  };

  const handleShowSaveLocation = () => {
    setSelectedOption((prev) => ({ ...prev, showLocation: false, showEvent: false, showSaveLocation: !selectedOption.showSaveLocation }));
  };

  const handleSearchClear = () => {
    setSearch('');
  };

  useEffect(() => {
    setSelectedOption((prev) => ({ ...prev, showNotification: true }));
  }, []);

  const [eventDetails, setEventDetails] = useState<any>(null);
  const handleShowModalEvent = async (eventId: any) => {
    try {
      const response = await axios.get(`http://192.53.172.131:1050/home/getEvent/${eventId}`);
      console.log('Response data:', response.data); // Log response data to check
      setEventDetails(response.data); // Set event details to state or perform other logic
      setSelectedOption((prev) => ({ ...prev, showModalEvent: true }));
    } catch (error: any) {
      console.error('Error fetching event details:', error.message);
      // Handle error state or display error message to user
    }
  };


  const handleOpenBottomSheetMore = async (item: any) => {
    try {
      const response = await axios.get(`http://192.53.172.131:1050/map/locationId/${item._id}`);
      console.log('Response from API:', response.data); // In ra nội dung phản hồi từ API
      setLocations(response.data);
      if (!selectedOption.hasOpenedOnce) {
        setSelectedOption((prev) => ({ ...prev, bottomSheetMoreOpen: !selectedOption.bottomSheetMoreOpen, hasOpenedOnce: true }));
      }
      bottomSheetRef.current?.expand();
      setSelectedOption((prev) => ({ ...prev, showLocation: false, showEvent: false, showSaveLocation: false }));
      const voteDetail = item.id == 1 ? reviewSaveLocation_1 : item.id == 2 ? reviewSaveLocation_2 : [];
      setVoteDetail(voteDetail);
    } catch (error: any) {
      console.error('Error fetching event details:', error.message);
    }
  };

  const QuanTamButton = () => {
    const [pressed, setPressed] = useState(false);

    const handlePress = () => {
      setPressed(!pressed);
    };

    return (
      <TouchableOpacity
        style={[
          {
            borderRadius: 8,
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
            paddingVertical: 10,
            paddingHorizontal: 15,
            marginHorizontal: 12,
          },
          { backgroundColor: pressed ? 'rgba(82, 5, 127, 1)' : 'rgba(242, 242, 242, 1)' },
        ]}
        accessibilityLabel="Interested"
        accessibilityHint="Mark your interest for the event"
        onPress={handlePress}
      >
        <View style={styles.titleIcon}>
          {pressed ? <ColorStar width={16} height={16} /> : <Star1 size={16} color='#A6A6A6' />}
        </View>
        <Text style={[
          styles.headingAbout,
          { color: pressed ? 'rgba(255, 255, 255, 1)' : 'rgba(89, 89, 89, 1)' },
        ]}>
          Quan tâm
        </Text>
      </TouchableOpacity>
    );
  };

  const SeThamGiaButton = () => {
    const [pressed1, setPressed1] = useState(false);

    const handlePress1 = () => {
      setPressed1(!pressed1);
    };

    return (
      <TouchableOpacity
        style={[
          styles.careAbout,
          { backgroundColor: pressed1 ? 'rgba(82, 5, 127, 1)' : 'rgba(242, 242, 242, 1)' },
        ]}
        accessibilityLabel="Will attend"
        accessibilityHint="Mark your attendance for the event"
        onPress={handlePress1}
      >
        <View style={styles.titleIcon}>
          {pressed1 ? <ColorCheckOne /> : <CheckOne />}
        </View>
        <Text style={[
          styles.headingAbout,
          { color: pressed1 ? 'rgba(255, 255, 255, 1)' : 'rgba(89, 89, 89, 1)' },
        ]}>
          Sẽ tham gia
        </Text>
      </TouchableOpacity>
    );
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

  const [isOpen, setIsOpen] = useState<boolean[]>([]);
  const [locations, setLocations] = useState<any | []>([]);
  const [maps, setMaps] = useState<any[]>([]);
  const [position, setPosition] = useState<{ latitude: number; longitude: number } | null>(null);

  const handleShareLocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Location');
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
      console.log('latitude:', position.latitude)
      console.log('longitude:', position.longitude)
    }
  }, [position]);

  const fetchLocations = async (latitude: number, longitude: number) => {
    try {
      const response = await axios.post('http://192.53.172.131:1050/map/locations', {
        latitude: latitude,
        longitude: longitude
      });
      console.log('Response data:', response.data.formattedLocations);
      setMaps(response.data.formattedLocations);
    } catch (error: any) {
      console.error('Error fetching locations:', error.message);
    }
  };

  const currentTime = moment();

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
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // const [pressedQuanTam, setPressedQuanTam] = useState(false);
  // const handleQuanTamPress = async () => {
  //   try {
  //     const response = await fetch(`http://192.53.172.131:1050/home/getEventsLocation`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY2N2I3MGEwOTg4Njc3MTNkNGU2NmFkYiIsImZ1bGxOYW1lIjoixJDhu5cgUXVhbmcgR2nDoXAiLCJlbWFpbCI6ImdpYXBkb0BnbWFpbC5jb20iLCJwaG9uZU51bWJlciI6IjA5NjIzNTUzMzUiLCJwYXNzd29yZCI6IiQyYSQxMCRWMTFMSUZ6UUw3TmNJUGxkQklNSGd1bHhWRi5VRTRMVG9pbVhiek4wRW5uc3F6TnVCNjEydSIsImFjdGl2ZSI6dHJ1ZSwiZm9sbG93aW5nIjpbXSwiZm9sbG93ZXJzIjpbIjY2N2I3MDYyOTg4Njc3MTNkNGU2NmFkMSJdLCJ2aWV3cyI6MSwidmlld2VkQnkiOlsiNjY3YjcwNjI5ODg2NzcxM2Q0ZTY2YWQxIl0sImlzQWRtaW4iOmZhbHNlLCJjcmVhdGVkQXQiOiIyMDI0LTA2LTI2VDAxOjM2OjMyLjk1N1oiLCJ1cGRhdGVkQXQiOiIyMDI0LTA2LTI2VDAyOjI1OjI5LjQwNVoiLCJzbHVnIjoixJHhu5ctcXVhbmctZ2nDoXAiLCJyb2xlSWQiOiI2NjM4ODA3NzY0YWEzZWYzNmZjNDQzMWIiLCJfX3YiOjJ9LCJyb2xlIjoidXNlciIsImlhdCI6MTcxOTk5ODQ1NywiZXhwIjoxNzIwMDg0ODU3fQ.rawffGuh1G0oBCtqLHRtKzd-RRkdDsd571BCs_zjuzA',
  //       },
  //     });
  //     const result = await response.json();
  //     console.log('Toggle pressedQuanTam Result:', result);
  //     if (result.isInterested !== undefined) {
  //       setPressedQuanTam(result.isInterested);
  //       await AsyncStorage.setItem(`pressedQuanTam${events.id}`, JSON.stringify(result.isInterested));
  //     } else {
  //       console.error('Invalid toggleInterestEvent response:', result);
  //     }
  //   } catch (error: any) {
  //     console.error('Error toggling interest:', error.message);
  //   }
  // };

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
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}>
              {position?.latitude && position?.longitude && (
                <Marker
                  coordinate={{ latitude: position.latitude, longitude: position.longitude }}
                  title="Your Location"
                  description="This is your current location"
                />
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
            <TouchableOpacity style={styles.iconButton} onPress={handleOpenBottomSheetMore}>
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
            {SaveLocation.slice(0, 5).map((item: any, index: any) => (
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
                <Image source={AppImage.posterLocation} style={{ borderRadius: 4, maxWidth: '30%', height: '100%' }} />
                <View style={{ gap: 4 }}>
                  <View style={{
                    flexDirection: 'row',
                  }}>
                    <TouchableOpacity>
                      <Text style={{
                        fontWeight: '600',
                        fontFamily: 'Roboto-Medium',
                        fontSize: 16,
                        color: '#1E1E1E',
                        maxWidth: PAGE_WIDTH * 0.6
                      }}>{item.title}</Text>
                    </TouchableOpacity>
                    <ArchiveSlash color='#974EC3' variant="Bold" size={20} style={{ marginLeft: 8 }} />
                  </View>
                  <Text style={{ fontFamily: 'Roboto-Light', fontWeight: '300', fontSize: 13 }}>{item.title_location}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.numberReview}>{item.rating}</Text>
                    <View style={styles.stars}>
                      <View style={{ marginLeft: 5 }}>
                        {item.rating >= 1 ? <ColorStar width={16} height={16} /> : <StarIcon width={16} height={16} />}
                      </View>
                      <View style={{ marginLeft: 2 }}>
                        {item.rating >= 2 ? <ColorStar width={16} height={16} /> : <StarIcon width={16} height={16} />}
                      </View>
                      <View style={{ marginLeft: 2 }}>
                        {item.rating >= 3 ? <ColorStar width={16} height={16} /> : <StarIcon width={16} height={16} />}
                      </View>
                      <View style={{ marginLeft: 2 }}>
                        {item.rating >= 4 ? <ColorStar width={16} height={16} /> : <StarIcon width={16} height={16} />}
                      </View>
                      <View style={{ marginLeft: 2, marginRight: 5 }}>
                        {item.rating >= 5 ? <ColorStar width={16} height={16} /> : <StarIcon width={16} height={16} />}
                      </View>
                    </View>
                    <Text style={styles.numberUserReview}>({item.rating})</Text>
                  </View>
                  <Text style={{
                    fontWeight: '400',
                    fontSize: 14,
                    fontFamily: 'Roboto-Regular',
                  }}>
                    <Text style={{ color: isOpen ? '#504099' : 'red' }}>
                      {isOpen ? 'Đang mở cửa' : 'Đang đóng cửa'}
                    </Text>
                    {' · '}
                    <Text style={{ color: 'black' }}>
                      Mở cửa lúc 8:00
                    </Text>
                  </Text>
                  <Text style={{
                    fontWeight: '400',
                    fontSize: 14,
                    color: '#1E1E1E',
                    fontFamily: 'Roboto-Regular',
                    maxWidth: PAGE_WIDTH * 0.6
                  }}
                    numberOfLines={2}
                  >{item.location}</Text>
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
                  <TouchableOpacity style={{ zIndex: 99 }} onPress={() => handleShowModalEvent(item?.id)}>
                    <Text style={styles.title_event1} numberOfLines={2}>{item?.nameEvent}</Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity
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
                  </TouchableOpacity> */}
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
                Có <Text style={styles.boldText}>12</Text> đại lý gần bạn
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
                      <View>
                        {item.averageRating >= 1 ? <ColorStar width={10} height={10} /> : <StarIcon width={10} height={10} />}
                      </View>
                      <View style={{ marginLeft: 2 }}>
                        {item.averageRating >= 2 ? <ColorStar width={10} height={10} /> : <StarIcon width={10} height={10} />}
                      </View>
                      <View style={{ marginLeft: 2 }}>
                        {item.averageRating >= 3 ? <ColorStar width={10} height={10} /> : <StarIcon width={10} height={10} />}
                      </View>
                      <View style={{ marginLeft: 2 }}>
                        {item.averageRating >= 4 ? <ColorStar width={10} height={10} /> : <StarIcon width={10} height={10} />}
                      </View>
                      <View style={{ marginLeft: 2 }}>
                        {item.averageRating >= 5 ? <ColorStar width={10} height={10} /> : <StarIcon width={10} height={10} />}
                      </View>
                    </View>
                    <Text style={styles.numberUserReview}>({item.averageRating})</Text>
                  </View>
                  <View style={{ flexDirection: 'row', marginTop: 5, borderTopWidth: 1, borderBottomWidth: 1, justifyContent: 'space-between', paddingTop: 10, paddingBottom: 10, borderColor: 'rgba(221, 221, 221, 0.8)' }}>
                    <TouchableOpacity>
                      <Call size={20} color='rgba(231, 79, 177, 1)' style={{ marginLeft: 35 }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <GoogleMapIcon />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text style={{ marginRight: 21, fontWeight: '700', fontSize: 16, color: 'rgba(231, 79, 177, 1)' }}>1,9 Km</Text>
                    </TouchableOpacity>
                  </View>
                  <View key={index} style={styles.locationContainer}>
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
        onRequestClose={() => setSelectedOption((prev) => ({ ...prev, showModalEvent: false }))}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalEvent}>
            <TouchableOpacity onPress={() => setSelectedOption((prev) => ({ ...prev, showModalEvent: false }))} style={{ alignSelf: 'flex-end', padding: 10 }}>
              <CloseCircle color='#59595999' variant="Bold" size={35} />
            </TouchableOpacity>
            <ScrollView>
              <View style={{ marginTop: 5 }}>
                <Image source={AppImage.posterEvent} style={styles.poster} />
                <View style={styles.title}>
                  <Text style={styles.title_date}>Trung tâm MNQ7</Text>
                  <Text style={styles.title_event}>Trung tâm chuyên gia phát</Text>
                </View>
              </View>
              <View style={{ marginTop: 40, flexGrow: 1, minHeight: 200, paddingHorizontal: 15 }}>
                <View style={styles.from_flowing}>
                  <QuanTamButton />
                  <SeThamGiaButton />
                  <TouchableOpacity style={styles.from_share} accessibilityLabel="Share" accessibilityHint="Share this event">
                    <Image source={AppImage.share} style={styles.shareIcon1} />
                  </TouchableOpacity>
                </View>
                <View style={styles.from_information}>
                  <Text style={styles.title_infomation}>Chi tiết</Text>
                  <View style={styles.information}>
                    <Profile2User color="rgba(166, 166, 166, 1)" variant="Bold" size={20} />
                    <Text style={styles.heading_information}>100 người đăng ký tham gia</Text>
                  </View>
                  <View style={styles.information}>
                    <User color="rgba(166, 166, 166, 1)" variant="Bold" size={20} />
                    <Text style={styles.heading_information}>Sự kiện của Midu home</Text>
                  </View>
                  <View style={styles.information}>
                    <Location color="rgba(166, 166, 166, 1)" variant="Bold" size={20} />
                    <Text style={styles.heading_information_link}>Công ty Cổ phần Midu MenaQ7</Text>
                  </View>
                </View>
                <View>
                  <Text style={styles.title_text}>1. Chương trình khai xuân Giáp Thìn 2024</Text>
                  <ReadMore
                    numberOfLines={3}
                    animate={true}
                    expandOnly={true}
                    seeMoreText="Đọc thêm"
                    seeMoreStyle={styles.seeMore}
                    style={styles.textStyle}
                  >
                    "Để khai Xuân Giáp Thìn 2024 thật rực rỡ, Công ty Cổ phần Midu MenaQ7 tổ chức khai xuân đầu năm vào 10h00 Thứ Hai ngày 19/02/2024. Trong chương trình khai xuân đầu năm sẽ tổ chức "Vòng quay Lì xì", để chương trình được diễn ra tốt nhất mỗi Nhân sự của Midu sẽ chuẩn bị một bao lì xì cá nhân. Khi quay trúng vào tên của cá nhân nào sẽ trao lì xì chéo."
                  </ReadMore>
                </View>
                <View style={{ marginTop: 15 }}>
                  <Text style={styles.title_text}>2. Đăng kí mời mẹ tham gia chương trình "Ngày của mẹ" 2024</Text>
                  <ReadMore
                    numberOfLines={5}
                    animate={true}
                    expandOnly={true}
                    seeMoreText="Đọc thêm"
                    seeMoreStyle={styles.seeMore}
                    style={styles.textStyle}
                  >
                    Nhằm hưởng ứng và đây cũng là dịp để bày tỏ lòng biết ơn, trân trọng đối với người đã có công ơn sinh thành, dưỡng dục. Công ty Cổ phần Midu MenaQ7 long trọng tổ chức chương trình "Ngày của Mẹ" để lan tỏa và tôn vinh đến người mẹ, đấng sinh thành, dưỡng dục.{'\n'}
                    Cơ hội để Nhân sự của Công ty Cổ phần Midu MenaQ7 gửi lời tri ân, chia sẻ những tình cảm, lời muốn nói của mình gửi tới mẹ và những món quà ý nghĩa trao tặng cho đấng sinh thành.{'\n'}
                    Nhân sự đăng kí mời mẹ tham gia Chương trình "Ngày của mẹ" do Công ty Cổ phần Midu MenaQ7 tổ chức sẽ diễn ra vào Thứ Sáu Ngày 08/03/2024. CBNV vui lòng điền form đăng kí dưới đây:{'\n'}
                    https://forms.gle/ktHrhTuYzxLSrdZR6{'\n'}
                    Chương trình đăng kí sẽ được mở đến hết ngày 18/02/2024.{'\n'}
                    Trân trọng kính mời CBNV cùng Phụ huynh của Công ty Cổ phần Midu MenaQ7!
                  </ReadMore>
                </View>
                <View style={{ marginTop: 20 }}>
                  <Text style={styles.from_location}>Vị trí</Text>
                  <View style={styles.body_location}>
                    <Image source={AppImage.background} style={styles.map} />
                    <View style={styles.from_location_map}>
                      <Text style={styles.title_map}>Công ty Cổ phần Midu MenaQ7</Text>
                      <Text style={styles.location_map}>07 P. Sa Đôi, Đai Mỗ, Nam Từ Liêm, Hà Nội 100000, Việt Nam</Text>
                      <Text style={[styles.location, { marginHorizontal: 0 }]}>CHUYÊN GIA CHIỀU CAO</Text>
                    </View>
                  </View>
                </View>
                <View style={{ marginTop: 20, marginBottom: 40 }}>
                  <Text style={styles.title_suggested_event}>Sự kiện gợi ý</Text>
                  <View style={styles.from_date}>
                    <View style={styles.body_date}>
                      <Text style={styles.month}>Tháng</Text>
                      <Text style={{ fontWeight: '700', fontSize: 36, color: 'rgba(231, 79, 177, 1)', alignSelf: 'center' }}>7</Text>
                    </View>
                    <View style={{ width: PAGE_WIDTH * 0.57, height: PAGE_HEIGHT * 0.1, marginTop: 5, marginLeft: 15 }}>
                      <Text style={styles.time_event}>CHỦ NHẬT, 8 THÁNG 3, 2024 VÀO 14:00</Text>
                      <Text style={styles.title_time_event}>Khai trương trung tâm chiều cao Midu Đống Đa</Text>
                      <Text style={styles.location_event}>07 P. Sa Đôi, Đai Mỗ, Nam Từ Liêm, Hà Nội 100000, Việt Nam</Text>
                    </View>
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
          snapPoints={['55%', '55%']}
          enablePanDownToClose
          enableDynamicSizing
        >
          <BottomSheetScrollView style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24 }}>
            <View style={{ zIndex: 999 }}>
              {/* <Carousel
                {...baseOptions}
                loop
                pagingEnabled
                snapEnabled
                onProgressChange={(_, absoluteProgress) =>
                  (progressValue.value = absoluteProgress)
                }
                mode="parallax"
                modeConfig={{
                  parallaxScrollingScale: 0.8,
                  parallaxAdjacentItemScale: 0,
                }}
                data={locations.images || []}
                renderItem={({ item, index }: any) => (
                  <View key={index} style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    <Image source={{ uri: item }} style={{ width: PAGE_WIDTH, height: PAGE_HEIGHT * 0.3, margin: 5, alignItems: 'center' }} />
                  </View>
                )} */}
              {/* /> */}
              <Carousel
                {...baseOptions}
                style={{
                  width: PAGE_WIDTH,
                  height: PAGE_HEIGHT * 0.3,
                  borderRadius: 8
                }}
                loop
                pagingEnabled
                snapEnabled
                onProgressChange={(_, absoluteProgress) =>
                  (progressValue.value = absoluteProgress)
                }
                mode="parallax"
                data={locations.images || []}
                renderItem={({ item, index }: any) => (
                  <View key={index} style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    <Image source={{ uri: item }} style={{ width: PAGE_WIDTH, height: PAGE_HEIGHT * 0.3, margin: 5, alignItems: 'center', borderRadius: 8 }} />
                  </View>
                )}
              />

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
                <Text style={styles.numberUserReview}>({locations.averageRating})</Text>
              </View>
              <View style={styles.locationContainer}>
                <View style={styles.openingHoursContainer}>
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
              <Text style={styles.locationReview}>
                {`${locations.address.detailAddress}, ${locations.address.ward}, ${locations.address.district}, ${locations.address.city}`}
              </Text>
              <BottomSheetScrollView style={{ flexDirection: 'row', marginTop: 12 }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <TouchableOpacity style={{ width: 120, height: 40, backgroundColor: '#E74FB1', borderRadius: 20, flexDirection: 'row', alignItems: 'center', marginLeft: 16 }}>
                  <GoogleMapIcon style={{ marginLeft: 18 }} />
                  <Text style={{ marginLeft: 8, fontFamily: 'Roboto-Medium', fontWeight: '600', fontSize: 14, color: '#FFFFFF' }}>Đường đi</Text>
                </TouchableOpacity >
                <TouchableOpacity style={{ width: 85, height: 40, backgroundColor: '#E74FB11A', borderRadius: 20, flexDirection: 'row', alignItems: 'center', marginLeft: 16 }}>
                  <Call color='#FF4F81CC' style={{ marginLeft: 16 }} />
                  <Text style={{ marginLeft: 4, fontWeight: '600', fontFamily: 'Roboto-Medium', fontSize: 14, color: '#E74FB1' }}>Gọi</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: 90, height: 40, backgroundColor: '#E74FB11A', borderRadius: 20, flexDirection: 'row', alignItems: 'center', marginLeft: 16 }}>
                  <ArchiveMinus color='#E74FB1' style={{ marginLeft: 18 }} />
                  <Text style={{ marginLeft: 4, fontWeight: '600', fontFamily: 'Roboto-Medium', fontSize: 14, color: '#E74FB1' }}>Lưu</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: 100, height: 40, backgroundColor: '#E74FB11A', borderRadius: 20, flexDirection: 'row', alignItems: 'center', marginHorizontal: 16 }}>
                  <ShareColorIcon style={{ marginLeft: 16 }} />
                  <Text style={{ marginLeft: 4, fontWeight: '600', fontFamily: 'Roboto-Medium', fontSize: 14, color: '#E74FB1' }}>Chia sẻ</Text>
                </TouchableOpacity>
              </BottomSheetScrollView>
              <View style={{ flexDirection: 'row', height: 40, marginTop: 12, justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#DDDDDDCC' }}>
                <TouchableOpacity style={{ marginLeft: 30 }} >
                  <Text style={{ fontFamily: 'Roboto-Regular', fontWeight: '400', fontSize: 16, color: '#722ED1', borderBottomWidth: 1, paddingHorizontal: 10, borderColor: '#722ED1' }}>Tổng quan</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginRight: 100 }} onPress={() => {
                  navigation.navigate('EvaluateScreen', {
                    id: locations.id,
                  })
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
                      <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: '500', fontFamily: 'Roboto-Medium', color: '#1E1E1E' }}>{locations.averageRating}</Text>
                      <View style={styles.totalWrap}>
                        <View>
                          {locations.averageRating >= 1 ? <ColorStar width={15} height={15} /> : <StarIcon width={15} height={15} />}
                        </View>
                        <View style={{ marginLeft: 5 }}>
                          {locations.averageRating >= 2 ? <ColorStar width={15} height={15} /> : <StarIcon width={15} height={15} />}
                        </View>
                        <View style={{ marginLeft: 5 }}>
                          {locations.averageRating >= 3 ? <ColorStar width={15} height={15} /> : <StarIcon width={15} height={15} />}
                        </View>
                        <View style={{ marginLeft: 5 }}>
                          {locations.averageRating >= 4 ? <ColorStar width={15} height={15} /> : <StarIcon width={15} height={15} />}
                        </View>
                        <View style={{ marginLeft: 5 }}>
                          {locations.averageRating >= 5 ? <ColorStar width={15} height={15} /> : <StarIcon width={15} height={15} />}
                        </View>
                      </View>
                      <Text style={{ alignSelf: 'center', color: '#ADAFB2', fontFamily: 'Roboto-Regular', fontWeight: '400' }}>({locations.averageRating})</Text>
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
                  <Image source={AppImage.avatar} />
                  <TouchableOpacity onPress={() => { navigation.navigate('CreateReviewsScreen') }}
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
                {voteDEtail.slice(0, 4).map((item: any, index: any) => (
                  <View key={index}
                    style={
                      index < 3
                        ? { borderBottomWidth: 1, paddingBottom: 20, borderColor: '#DDDDDDCC', marginTop: 22 }
                        : { marginTop: 22 }
                    }
                  >
                    <View style={{ flexDirection: 'row' }}>
                      <Image source={AppImage.avatar} style={{ marginLeft: 16 }} />
                      <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontWeight: '500', fontFamily: 'Roboto-Medium', fontSize: 14, color: '#1E1E1E' }}>
                          {item.username}
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
                            {item.time}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <Text style={{ marginTop: 10, marginHorizontal: 16, fontWeight: '400', fontFamily: 'Roboto-Regular', color: '#595959' }}>
                      2
                    </Text>
                  </View>
                ))}
                <TouchableOpacity onPress={() => { navigation.navigate('EvaluateScreen') }}>
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