import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import moment from "moment";
import React from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import AppImage from "~utils/images/app_images";
import { Mores } from "~utils/images/svg";

const QuestionAnswerHeader = ({questionData}: any) => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    return (
        <>
            <View style={{ backgroundColor: 'rgba(248, 249, 252, 1)', height: 104, borderWidth: 0.4, borderColor: 'rgba(221, 221, 221, 1)' }}>
                <View style={{ flexDirection: 'row', marginTop: 56, alignItems: 'center', marginHorizontal: 16 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={AppImage.leftArrowIcon} style={{ width: 7.67, height: 13.31, marginRight: 16 }} />
                    </TouchableOpacity>
                    <Image source={{uri: questionData.avatar}} style={{width: 40, height: 40, borderRadius: 100}}/>
                    <View style={{ marginLeft: 12, flexDirection: 'column', alignSelf: 'stretch' }}>
                        <Text style={{ fontSize: 14, fontWeight: '700', letterSpacing: 0.1, color: 'rgba(30, 30, 30, 1)', lineHeight: 21 }}>
                            {questionData.username}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ backgroundColor: 'rgba(228, 230, 238, 1)', borderRadius: 8 }}>
                                <Text style={{ fontSize: 10, fontWeight: '600', lineHeight: 15, letterSpacing: 0.1, color: 'rgba(80, 64, 153, 1)', paddingHorizontal: 4 }}>
                                    Người ảnh hưởng
                                </Text>
                            </View>
                            <Text style={{ fontSize: 12, fontWeight: '500', color: 'rgba(204, 204, 204, 1)', lineHeight: 14.06, marginLeft: 4 }}>
                                {/* {questionData.createdAt} */}
                                {moment.utc(questionData.createdAt).tz('Asia/Ho_Chi_Minh').format('DD-MM-YYYY HH:mm:ss')}
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={{ position: 'absolute', right: 0, bottom: 18 }}
                    >
                        <Mores />
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default QuestionAnswerHeader;