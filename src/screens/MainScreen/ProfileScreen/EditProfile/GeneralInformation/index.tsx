// import React, { useState } from "react";
// import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
// import HeaderEditProfile from "~component/HeaderEditProfile";
// import DatePicker from 'react-native-date-picker';
// import { ArrowDown2 } from "iconsax-react-native";
// import Input from "~component/Input";
// import axios from "axios";
// import { BASE_URL } from "~services/ApiBaseUrl";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const GeneralInformation = ({ route, navigation }: any) => {
//     const { informationData } = route.params;
//     const [date, setDate] = useState<Date | null>(null)
//     const [open, setOpen] = useState(false)

//     const formDate = (date: Date) => {
//         return `${date.getDate()}/${date.getUTCMonth() + 1}/${date.getFullYear()}`;
//     }

//     const updateInformation = async () => {
//         const accessToken = await AsyncStorage.getItem('accessToken')
//         const response = await axios.put(`${BASE_URL}profile/updateInformation`,
//             {
//                 fullName: informationData.fullName,
//                 dateOfBirth: informationData.dateOfBirth,
//                 jobType: informationData.jobType,
//                 email: informationData.email,
//                 phoneNumber: informationData.phoneNumber,
//                 currentAddress: informationData.currentAddress
//             },
//             {
//                 headers: {
//                     'Authorization': accessToken
//                 }
//             }
//         )
//         console.log(response.data)
//     }

//     return (
//         <>
//             <HeaderEditProfile
//                 title='Thông tin chung'
//                 btn
//                 onPress={() => {
//                     updateInformation(),
//                     navigation.navigate('EditProfile')
//                 }} />
//             <View style={{ backgroundColor: 'rgba(255, 255, 255, 1)', height: '100%', paddingHorizontal: 20 }}>
//                 <Input
//                     text='Tên'
//                     value={informationData.fullName}
//                 />
//                 <Input
//                     text='Email'
//                     value={informationData.email}
//                 />
//                 <View style={{ flexDirection: 'row' }}>
//                     <View style={{ flex: 1 }}>
//                         <Input
//                             text='Số điện thoại'
//                             value={informationData.phoneNumber}
//                         />
//                     </View>
//                     <View style={{ flex: 1, marginLeft: 19 }}>
//                         <Text style={{ fontSize: 14, fontWeight: '500', lineHeight: 22, marginTop: 24 }}>
//                             Ngày sinh
//                         </Text>
//                         <TouchableOpacity
//                             style={{ height: 44, width: '100%', borderWidth: 1, borderRadius: 8, borderColor: 'rgba(221, 221, 221, 1)', marginTop: 4, paddingHorizontal: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
//                             onPress={() => setOpen(true)}
//                         >
//                             <TextInput
//                                 placeholder="dd/mm/yyyy"
//                                 placeholderTextColor={'rgba(166, 166, 166, 1)'}
//                                 value={date ? formDate(date) : `${informationData.dateOfBirth ?? ''}`}
//                             />
//                             <ArrowDown2 size={24} color="rgba(114, 46, 209, 1)" />
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//                 <Input
//                     text='Công việc'
//                     placeholder='Nhập công việc'
//                     value={informationData.jobType}
//                 />
//                 <Input
//                     text='Địa chỉ hiện tại'
//                     placeholder='Nhập địa chỉ hiện tại'
//                     value={informationData.currentAddress}
//                 />
//                 <View>
//                     <DatePicker
//                         modal
//                         open={open}
//                         date={date || new Date()}
//                         onConfirm={(selectedDate) => {
//                             setOpen(false)
//                             setDate(selectedDate)
//                         }}
//                         onCancel={() => {
//                             setOpen(false)
//                         }}
//                         mode="date"
//                         title={null}
//                     />
//                 </View>
//             </View>
//         </>
//     )
// }

// export default GeneralInformation;

import React, { useState, useEffect } from "react";
import { Button, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import HeaderEditProfile from "~component/HeaderEditProfile";
import DatePicker from 'react-native-date-picker';
import { ArrowDown2 } from "iconsax-react-native";
import Input from "~component/Input";
import axios from "axios";
import { BASE_URL } from "~services/ApiBaseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GeneralInformation = ({ route, navigation }: any) => {
    const { informationData } = route.params;
    const [fullName, setFullName] = useState(informationData.fullName);
    const [email, setEmail] = useState(informationData.email);
    const [phoneNumber, setPhoneNumber] = useState(informationData.phoneNumber);
    const [dateOfBirth, setDateOfBirth] = useState(informationData.dateOfBirth);
    const [jobType, setJobType] = useState(informationData.jobType);
    const [currentAddress, setCurrentAddress] = useState(informationData.currentAddress);
    const [date, setDate] = useState<Date | null>(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setDateOfBirth(date ? formDate(date) : informationData.dateOfBirth);
    }, [date]);

    const formDate = (date: Date) => {
        return `${date.getDate()}/${date.getUTCMonth() + 1}/${date.getFullYear()}`;
    }

    const updateInformation = async () => {
        const accessToken = await AsyncStorage.getItem('accessToken')
        const response = await axios.put(`${BASE_URL}profile/updateInformation`,
            {
                fullName,
                dateOfBirth,
                jobType,
                email,
                phoneNumber,
                currentAddress
            },
            {
                headers: {
                    'Authorization': accessToken
                }
            }
        )
        console.log(response.data)
    }

    return (
        <>
            <HeaderEditProfile
                title='Thông tin chung'
                btn
                onPress={() => {
                    updateInformation();
                    navigation.navigate('EditProfile');
                }} />
            <ScrollView style={{ backgroundColor: 'rgba(255, 255, 255, 1)', height: '100%', paddingHorizontal: 20 }}>
                <Input
                    text='Tên'
                    value={fullName}
                    onChangeText={setFullName}
                />
                <Input
                    text='Email'
                    value={email}
                    onChangeText={setEmail}
                />
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <Input
                            text='Số điện thoại'
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                        />
                    </View>
                    <View style={{ flex: 1, marginLeft: 19 }}>
                        <Text style={{ fontSize: 14, fontWeight: '500', lineHeight: 22, marginTop: 24 }}>
                            Ngày sinh
                        </Text>
                        <TouchableOpacity
                            style={{ height: 44, width: '100%', borderWidth: 1, borderRadius: 8, borderColor: 'rgba(221, 221, 221, 1)', marginTop: 4, paddingHorizontal: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
                            onPress={() => setOpen(true)}
                        >
                            <TextInput
                                placeholder="dd/mm/yyyy"
                                placeholderTextColor={'rgba(166, 166, 166, 1)'}
                                value={dateOfBirth}
                                editable={false}
                            />
                            <ArrowDown2 size={24} color="rgba(114, 46, 209, 1)" />
                        </TouchableOpacity>
                    </View>
                </View>
                <Input
                    text='Công việc'
                    placeholder='Nhập công việc'
                    value={jobType}
                    onChangeText={setJobType}
                />
                <Input
                    text='Địa chỉ hiện tại'
                    placeholder='Nhập địa chỉ hiện tại'
                    value={currentAddress}
                    onChangeText={setCurrentAddress}
                />
                <View>
                    <DatePicker
                        modal
                        open={open}
                        date={date || new Date()}
                        onConfirm={(selectedDate) => {
                            setOpen(false);
                            setDate(selectedDate);
                        }}
                        onCancel={() => {
                            setOpen(false);
                        }}
                        mode="date"
                        title={null}
                    />
                </View>
            </ScrollView>
        </>
    )
}

export default GeneralInformation;
