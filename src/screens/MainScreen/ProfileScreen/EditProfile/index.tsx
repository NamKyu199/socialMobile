import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { Briefcase, Cake, Call, Edit2, Map1, ProfileCircle, Sms } from "iconsax-react-native";
import React, { useCallback, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import HeaderEditProfile from "~component/HeaderEditProfile";
import { InformationModel } from "~models/InformationModel";
import { BASE_URL } from "~services/ApiBaseUrl";
import { PlusCirclePink } from "~utils/images/svg";

const EditProfile = ({ navigation }: any) => {
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
            fetchInformation();
        }, [informationData])
    );

    const info = [
        { id: 1, Icon: ProfileCircle, fontWeight: '500', label: informationData?.fullName, color: 'rgba(30, 30, 30, 1)'},
        { id: 2, Icon: Call, fontWeight: '500', label: informationData?.phoneNumber, color: 'rgba(30, 30, 30, 1)' },
        { id: 3, Icon: Sms, fontWeight: '500', label: informationData?.email, color: 'rgba(30, 30, 30, 1)' },
        { id: 4, Icon: Cake, fontWeight: informationData?.dateOfBirth !== null ? '500' : '400', label: informationData?.dateOfBirth ?? 'Ngày sinh', color: informationData?.dateOfBirth !== null ? 'rgba(30, 30, 30, 1)' : 'rgba(166, 166, 166, 1)' },
        { id: 5, Icon: Briefcase, fontWeight: informationData?.dateOfBirth !== null ? '500' : '400', label: informationData?.jobType ?? 'Công việc', color: informationData?.dateOfBirth !== null ? 'rgba(30, 30, 30, 1)' : 'rgba(166, 166, 166, 1)' },
        { id: 6, Icon: Map1, fontWeight: informationData?.dateOfBirth !== null ? '500' : '400', label: informationData?.currentAddress ?? 'Địa chỉ hiện tại', color: informationData?.dateOfBirth !== null ? 'rgba(30, 30, 30, 1)' : 'rgba(166, 166, 166, 1)'}
    ];

    const view = [
        {
            id: 1,
            title: 'Thông tin chung',
            edit: 'Chỉnh sửa',
            action: () => navigation.navigate('GeneralInformation', {informationData: informationData}),
            content: info.map(({ id, Icon, fontWeight, label, color }) => (
                <View key={id} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon size={20} color="rgba(114, 46, 209, 1)" />
                    <Text style={{ fontSize: 16, fontWeight: fontWeight as '400' | '500', lineHeight: 24, marginLeft: 14, marginVertical: 14, color: color }}>
                        {label}
                    </Text>
                </View>
            )),
            line:
                <View style={{ borderWidth: 0.4, borderColor: 'rgba(215, 215, 215, 1)', marginTop: 10 }} />
        },
        {
            id: 2,
            title: 'Tiểu sử',
            edit: 'Chỉnh sửa',
            action: () => navigation.navigate('Story'),
            content:
                <TouchableOpacity
                    style={{ borderWidth: 1, borderRadius: 8, borderColor: 'rgba(221, 221, 221, 1)', marginVertical: 14 }}
                    onPress={() => navigation.navigate('Story')}
                >
                    <Text style={{ fontSize: 16, fontWeight: '400', lineHeight: 24, marginHorizontal: 8, marginVertical: 12, color: 'rgba(166, 166, 166, 1)' }}>
                        Nhập tiểu sử
                    </Text>
                </TouchableOpacity>,
            line:
                <View style={{ borderWidth: 0.4, borderColor: 'rgba(215, 215, 215, 1)', marginTop: 10 }} />
        },
        {
            id: 3,
            title: 'Học vấn',
            edit: 'Chỉnh sửa',
            action: () => navigation.navigate('Education'),
            content:
                <View style={{ marginVertical: 14, flexWrap: 'wrap' }}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', borderWidth: 1, borderRadius: 16, borderColor: 'rgba(231, 79, 177, 1)', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 7 }}
                        onPress={() => navigation.navigate('Education')}
                    >
                        <PlusCirclePink fill={'rgba(231, 79, 177, 1)'} />
                        <Text style={{ fontSize: 12, fontWeight: '400', lineHeight: 14.06, color: 'rgba(231, 79, 177, 1)', marginLeft: 4 }}>
                            Thêm trường học
                        </Text>
                    </TouchableOpacity>
                </View>,
            line:
                <View style={{ borderWidth: 0.4, borderColor: 'rgba(215, 215, 215, 1)', marginTop: 10 }} />
        },
        {
            id: 4,
            title: 'Kinh nghiệm làm việc',
            edit: 'Chỉnh sửa',
            action: () => navigation.navigate('Experience'),
            content:
                <View style={{ marginVertical: 14 }}>
                    <View style={{ flexWrap: 'wrap' }}>
                        <TouchableOpacity
                            style={{ flexDirection: 'row', borderWidth: 1, borderRadius: 16, borderColor: 'rgba(231, 79, 177, 1)', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 7 }}
                            onPress={() => navigation.navigate('Experience')}
                        >
                            <PlusCirclePink fill={'rgba(231, 79, 177, 1)'} />
                            <Text style={{ fontSize: 12, fontWeight: '400', lineHeight: 14.06, color: 'rgba(231, 79, 177, 1)', marginLeft: 4 }}>
                                Thêm kinh nghiệm làm việc
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 24 }}>
                        <Text style={{ fontSize: 16, fontWeight: '500', lineHeight: 24, color: 'rgba(0, 0, 0, 1)' }}>
                            Business Analyst
                        </Text>
                        <Edit2 size={24} color="rgba(101, 103, 107, 1)" />
                    </View>
                    <Text style={{ fontSize: 16, fontWeight: '400', lineHeight: 24, marginVertical: 2 }}>
                        29 tháng 9, 2020 - 30 tháng 3, 2021
                    </Text>
                    <Text style={{ fontSize: 12, fontWeight: '400', lineHeight: 20, color: 'rgba(166, 166, 166, 1)' }}>
                        Lorem Ipsum has been the industry's standard
                    </Text>
                </View>,
            line:
                <View style={{ borderWidth: 0.4, borderColor: 'rgba(215, 215, 215, 1)', marginTop: 10 }} />
        },
        {
            id: 5,
            title: 'Chứng chỉ',
            edit: 'Chỉnh sửa',
            action: () => navigation.navigate('Certificate'),
            content:
                <View style={{ marginVertical: 14 }}>
                    <View style={{ flexWrap: 'wrap' }}>
                        <TouchableOpacity
                            style={{ flexDirection: 'row', borderWidth: 1, borderRadius: 16, borderColor: 'rgba(231, 79, 177, 1)', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 7 }}
                            onPress={() => navigation.navigate('Certificate')}
                        >
                            <PlusCirclePink fill={'rgba(231, 79, 177, 1)'} />
                            <Text style={{ fontSize: 12, fontWeight: '400', lineHeight: 14.06, color: 'rgba(231, 79, 177, 1)', marginLeft: 4 }}>
                                Thêm chứng chỉ
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 24 }}>
                        <Text style={{ fontSize: 16, fontWeight: '500', lineHeight: 24, color: 'rgba(0, 0, 0, 1)' }}>
                            Business Analyst
                        </Text>
                        <Edit2 size={24} color="rgba(101, 103, 107, 1)" />
                    </View>
                    <Text style={{ fontSize: 16, fontWeight: '400', lineHeight: 24, marginVertical: 2 }}>
                        29 tháng 9, 2020 - 30 tháng 3, 2021
                    </Text>
                    <Text style={{ fontSize: 12, fontWeight: '400', lineHeight: 20, color: 'rgba(166, 166, 166, 1)' }}>
                        Lorem Ipsum has been the industry's standard
                    </Text>
                </View>,
            line:
                <View style={{ borderWidth: 0.4, borderColor: 'rgba(215, 215, 215, 1)', marginTop: 10 }} />
        },
        {
            id: 6,
            title: 'Thành tích',
            edit: 'Chỉnh sửa',
            action: () => navigation.naigate('Achievements'),
            content:
                <View style={{ marginVertical: 14 }}>
                    <View style={{ flexWrap: 'wrap' }}>
                        <TouchableOpacity
                            style={{ flexDirection: 'row', borderWidth: 1, borderRadius: 16, borderColor: 'rgba(231, 79, 177, 1)', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 7 }}
                            onPress={() => navigation.navigate('Achievements')}
                        >
                            <PlusCirclePink fill={'rgba(231, 79, 177, 1)'} />
                            <Text style={{ fontSize: 12, fontWeight: '400', lineHeight: 14.06, color: 'rgba(231, 79, 177, 1)', marginLeft: 4 }}>
                                Thêm thành tích
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 24 }}>
                        <Text style={{ fontSize: 16, fontWeight: '500', lineHeight: 24, color: 'rgba(0, 0, 0, 1)' }}>
                            Học bổng loại Giỏi - Đại học Luật Hà Nội
                        </Text>
                        <Edit2 size={24} color="rgba(101, 103, 107, 1)" />
                    </View>
                    <Text style={{ fontSize: 16, fontWeight: '400', lineHeight: 24, marginVertical: 2 }}>
                        30 tháng 3, 2021
                    </Text>
                    <Text style={{ fontSize: 12, fontWeight: '400', lineHeight: 20, color: 'rgba(166, 166, 166, 1)' }}>
                        Lorem Ipsum has been the industry's standard
                    </Text>
                </View>,
            line: null
        },
    ];

    const handlePress = (action: any) => {
        action();
    }

    return (
        <>
            <HeaderEditProfile title='Chỉnh sửa thông tin cá nhân' />
            <ScrollView style={{ backgroundColor: 'rgba(255, 255, 255, 1)', height: '100%' }}>
                {view.map(({ id, title, edit, action, content, line }) => (
                    <View key={id}>
                        <View style={{ marginHorizontal: 16 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 24.5, marginBottom: 10 }}>
                                <Text style={{ fontSize: 20, fontWeight: '600', lineHeight: 23.44, letterSpacing: -0.02 }}>
                                    {title}
                                </Text>
                                <TouchableOpacity onPress={() => handlePress(action)}>
                                    <Text style={{ fontSize: 16, fontWeight: '400', lineHeight: 24, color: 'rgba(114, 46, 209, 1)' }}>
                                        {edit}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            {content}
                        </View>
                        {line}
                    </View>
                ))}
                <View style={{ height: 50, backgroundColor: 'rgba(255, 255, 255, 1)' }} />
            </ScrollView>
            <BottomSheetModal>
                <BottomSheetView>
                    <View>

                    </View>
                </BottomSheetView>
            </BottomSheetModal>
        </>
    )
}

export default EditProfile;