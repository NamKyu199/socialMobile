import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ParamListBase, useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import { Cake, Call, Edit2, GalleryAdd, Location, Sms } from "iconsax-react-native";
import React, { useCallback, useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { InformationModel } from "~models/InformationModel";
import { BASE_URL } from "~services/ApiBaseUrl";
import { AddImageIcon, CopyLinkIcon, EmptyImage, Mores } from "~utils/images/svg";

const Information = (props: any) => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const [informationData, setInformationData] = useState<InformationModel>();

    const fetchInformation = async () => {
        const accessToken = await AsyncStorage.getItem('accessToken')
        const response = await axios.get(`${BASE_URL}profile/getInformation`,
            {
                headers: {
                    'Authorization': accessToken
                }
            }
        )
        setInformationData(response.data.getUserInfo)
    }

    useFocusEffect(
        useCallback(() => {
            fetchInformation()
        }, [informationData])
    )

    const follow = [
        { id: 1, count: props.followingCount, text: 'Đang theo dõi' },
        { id: 2, count: props.followerCount, text: 'Người theo dõi' },
        { id: 3, count: props.totalPoints, text: 'Tương tác' },
        { id: 4, count: props.views, text: 'Lượt xem' },
    ]

    const info = [
        { id: 1, Icon: Cake, label: informationData?.dateOfBirth },
        { id: 2, Icon: Location, label: informationData?.currentAddress },
        { id: 3, Icon: Sms, label: informationData?.email },
        { id: 5, Icon: Call, label: informationData?.phoneNumber },
    ];

    return (
        <>
            <View style={{ backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                <View>
                    <Image style={{ height: 185, width: '100%' }} source={props.coverPhoto} />
                    <TouchableOpacity>
                        <AddImageIcon style={{ position: 'absolute', bottom: 14, right: 17 }} />
                    </TouchableOpacity>
                    <View style={{ backgroundColor: 'rgba(248, 249, 252, 1)', height: 142, width: 142, position: 'absolute', top: 80, justifyContent: 'center', alignSelf: 'center', borderRadius: 100 }}>
                        <Image source={props.avatar} style={{ alignSelf: 'center', height: 132, width: 132, borderRadius: 100 }} />
                        <TouchableOpacity onPress={() => bottomSheetRef.current?.present()}>
                            <AddImageIcon style={{ position: 'absolute', right: 3, bottom: 20 }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginTop: 45, paddingHorizontal: 16 }}>
                    <Text style={{ fontSize: 20, fontWeight: '700', lineHeight: 24, textAlign: 'center' }}>
                        {informationData?.fullName}
                    </Text>
                    {informationData?.jobType !== null && (
                        <Text style={{ fontSize: 14, fontWeight: '400', lineHeight: 22, textAlign: 'center', marginTop: 4 }}>
                            {informationData?.jobType}
                        </Text>
                    )}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 }}>
                        {follow.map(({ id, count, text }) => (
                            <View key={id} style={{ flexDirection: 'column' }}>
                                <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: '500', lineHeight: 21.96 }}>
                                    {count}
                                </Text>
                                <Text style={{ fontSize: 14, fontWeight: '400', lineHeight: 17.08, color: 'rgba(173, 175, 178, 1)' }}>
                                    {text}
                                </Text>
                            </View>
                        ))}
                    </View>
                    <TouchableOpacity
                        style={{ height: 42, width: '100%', backgroundColor: 'rgba(114, 46, 209, 1)', borderRadius: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => navigation.navigate('EditProfile')}
                    >
                        <Edit2 size={26} color="rgba(248, 249, 252, 1)" />
                        <Text style={{ fontSize: 16, fontWeight: '500', lineHeight: 24, marginLeft: 12, color: 'rgba(255, 255, 255, 1)' }}>
                            Chỉnh sửa thông tin cá nhân
                        </Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 16, fontWeight: '500', lineHeight: 19.52, letterSpacing: 0.001, marginTop: 20, marginBottom: 12 }}>
                        Giới thiệu
                    </Text>
                    {informationData?.dateOfBirth !== null ?
                        <>
                            {info.map(({ id, Icon, label }) => (
                                <View key={id} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 3 }}>
                                    <Icon size={20} color="rgba(166, 166, 166, 1)" />
                                    <Text style={{ fontSize: 16, fontWeight: '400', lineHeight: 19.52, letterSpacing: 0.004, marginLeft: 12 }}>{label}</Text>
                                </View>
                            ))}
                        </>
                        :
                        <>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Mores />
                                <Text style={{ fontSize: 16, fontWeight: '400', lineHeight: 19.52, letterSpacing: 0.001, color: 'rgba(89, 89, 89, 1)' }}>
                                    Thêm thông tin giới thiệu của bạn
                                </Text>
                            </TouchableOpacity>
                        </>
                    }
                    <Text style={{ fontSize: 16, fontWeight: '500', lineHeight: 19.52, letterSpacing: 0.001, marginTop: 20, marginBottom: 12 }}>
                        Link Giới thiệu
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ height: 41, width: '100%', borderWidth: 0.5, borderRadius: 8, borderColor: 'rgba(166, 166, 166, 1)', backgroundColor: 'rgba(249, 240, 255, 1)', justifyContent: 'center', marginRight: 10, flex: 1 }}>
                            <Text style={{ fontSize: 14, fontWeight: '400', lineHeight: 17.08, letterSpacing: 0.004, color: 'rgba(89, 89, 89, 1)', marginLeft: 12 }}>
                                http://xn--hu1b40go5ck8x.com/
                            </Text>
                        </View>
                        <TouchableOpacity>
                            <CopyLinkIcon />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 16, fontWeight: '500', lineHeight: 19.52, letterSpacing: 0.001, marginTop: 20, marginBottom: 12 }}>
                            Thư viện ảnh
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <GalleryAdd size={16} color="rgba(114, 46, 209, 1)" />
                            <Text style={{ fontSize: 14, fontWeight: '500', lineHeight: 17.08, letterSpacing: 0.001, color: 'rgba(114, 46, 209, 1)', marginLeft: 4 }}>
                                Thêm ảnh
                            </Text>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <EmptyImage />
                        <Text style={{ fontSize: 14, fontWeight: '400', lineHeight: 17.08, letterSpacing: 0.001, color: 'rgba(173, 175, 178, 1)', marginVertical: 12 }}>
                            Không có ảnh nào để hiển thị
                        </Text>
                    </View>
                </View>
            </View>
            <BottomSheetModal
                ref={bottomSheetRef}
                index={0}
                snapPoints={['20%', '30%']}
            >
                <BottomSheetView>
                    <View>

                    </View>
                </BottomSheetView>
            </BottomSheetModal>
        </>
    )
}

export default Information;