import { ArrowLeft2, Briefcase, Cake, Call, Edit2, Map1, ProfileCircle, Sms } from "iconsax-react-native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { PlusCirclePink } from "~utils/images/svg";

const EditProfile = ({ navigation }: any) => {
    const info = [
        { id: 1, Icon: ProfileCircle, label: 'Man Van Truong' },
        { id: 2, Icon: Call, label: '0942328562' },
        { id: 3, Icon: Sms, label: 'abcd@gmail.com' },
        { id: 4, Icon: Cake, label: 'Ngày sinh' },
        { id: 5, Icon: Briefcase, label: 'Công việc' },
        { id: 6, Icon: Map1, label: 'Địa chỉ hiện tại' }
    ];

    const view = [
        {
            id: 1,
            title: 'Thông tin chung',
            edit: 'Chỉnh sửa',
            action: () => navigation.navigate('GeneralInformation'),
            content: info.map(({ id, Icon, label }) => (
                <View key={id} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon size={20} color="rgba(114, 46, 209, 1)" />
                    <Text style={{ fontSize: 16, fontWeight: '500', lineHeight: 24, marginLeft: 14, marginVertical: 14 }}>{label}</Text>
                </View>
            )),
            line:
                <View style={{ borderWidth: 0.4, borderColor: 'rgba(215, 215, 215, 1)', marginTop: 10 }} />
        },
        {
            id: 2,
            title: 'Tiểu sử',
            edit: 'Chỉnh sửa',
            content:
                <View style={{ borderWidth: 1, borderRadius: 8, borderColor: 'rgba(221, 221, 221, 1)', marginVertical: 14 }}>
                    <Text style={{ fontSize: 16, fontWeight: '400', lineHeight: 24, marginHorizontal: 8, marginVertical: 12, color: 'rgba(166, 166, 166, 1)' }}>
                        Nhập tiểu sử
                    </Text>
                </View>,
            line:
                <View style={{ borderWidth: 0.4, borderColor: 'rgba(215, 215, 215, 1)', marginTop: 10 }} />
        },
        {
            id: 3,
            title: 'Học vấn',
            edit: 'Chỉnh sửa',
            content:
                <View style={{ marginVertical: 14 }}>
                    <View style={{ flexDirection: 'row', borderWidth: 1, borderRadius: 16, borderColor: 'rgba(231, 79, 177, 1)', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 7 }}>
                        <PlusCirclePink fill={'rgba(231, 79, 177, 1)'} />
                        <Text style={{ fontSize: 12, fontWeight: '400', lineHeight: 14.06, color: 'rgba(231, 79, 177, 1)', marginLeft: 4 }}>
                            Thêm trường học
                        </Text>
                    </View>
                </View>,
            line:
                <View style={{ borderWidth: 0.4, borderColor: 'rgba(215, 215, 215, 1)', marginTop: 10 }} />
        },
        {
            id: 4,
            title: 'Kinh nghiệm làm việc',
            edit: 'Chỉnh sửa',
            content:
                <View style={{ marginVertical: 14 }}>
                    <View style={{ flexDirection: 'row', borderWidth: 1, borderRadius: 16, borderColor: 'rgba(231, 79, 177, 1)', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 7 }}>
                        <PlusCirclePink fill={'rgba(231, 79, 177, 1)'} />
                        <Text style={{ fontSize: 12, fontWeight: '400', lineHeight: 14.06, color: 'rgba(231, 79, 177, 1)', marginLeft: 4 }}>
                            Thêm kinh nghiệm làm việc
                        </Text>
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
            content:
                <View style={{ marginVertical: 14 }}>
                    <View style={{ flexDirection: 'row', borderWidth: 1, borderRadius: 16, borderColor: 'rgba(231, 79, 177, 1)', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 7 }}>
                        <PlusCirclePink fill={'rgba(231, 79, 177, 1)'} />
                        <Text style={{ fontSize: 12, fontWeight: '400', lineHeight: 14.06, color: 'rgba(231, 79, 177, 1)', marginLeft: 4 }}>
                            Thêm chứng chỉ
                        </Text>
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
            content:
                <View style={{ marginVertical: 14 }}>
                    <View style={{ flexDirection: 'row', borderWidth: 1, borderRadius: 16, borderColor: 'rgba(231, 79, 177, 1)', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 7 }}>
                        <PlusCirclePink fill={'rgba(231, 79, 177, 1)'} />
                        <Text style={{ fontSize: 12, fontWeight: '400', lineHeight: 14.06, color: 'rgba(231, 79, 177, 1)', marginLeft: 4 }}>
                            Thêm thành tích
                        </Text>
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
            <View style={{ backgroundColor: 'rgba(248, 249, 252, 1)', height: 98, borderWidth: 0.4, borderColor: 'rgba(221, 221, 221, 1)' }}>
                <Text style={{ fontSize: 18, fontWeight: '700', lineHeight: 21.09, textAlign: 'center', marginTop: 54 }}>
                    Chỉnh sửa thông tin cá nhân
                </Text>
                <TouchableOpacity style={{ position: 'absolute', top: 54, left: 16 }} onPress={() => navigation.goBack()}>
                    <ArrowLeft2 color="rgba(41, 45, 50, 1)" size={24} />
                </TouchableOpacity>
            </View>
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
        </>
    )
}

export default EditProfile;