import React, { useRef } from "react";
import { View, Image, TextInput, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { StatusTextInput } from "~constant/StatusTextInput";
import AppImage from "~utils/images/app_images";
import { Camera } from "~utils/images/svg";

const QuestionComment = (props: any) => {
    const statusTextInput = props.statusTextInput ?? StatusTextInput.DEFAULT;

    const textInputRef = useRef<TextInput>(null);

    const unfocusTextInput = () => {
        if (textInputRef.current) {
            textInputRef.current?.blur();
        }
    };

    console.log('Is Focus: ', textInputRef.current?.isFocused())

    return (
        <>
            <View style={{ backgroundColor: 'rgba(255, 255, 255, 1)', borderTopWidth: 1, borderTopColor: 'rgba(221, 221, 221, 0.5)', alignItems: 'center', paddingTop: 24, paddingBottom: 24 }}>
                {statusTextInput === StatusTextInput.REPLIES && (
                    <View style={{ width: '100%', paddingHorizontal: 69 }}>
                        <Text style={{ fontSize: 12, fontWeight: '400', lineHeight: 18, letterSpacing: 0.02, color: 'rgba(89, 89, 89, 1)' }}>
                            Đang phản hồi
                        </Text>
                    </View>
                )}
                <View style={{ flexDirection: 'row', marginHorizontal: 16 }}>
                    <Image source={AppImage.avatar} />
                    <View style={{ borderWidth: 1, borderRadius: 8, borderColor: 'rgba(221, 221, 221, 1)', width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, flex: 1, marginLeft: 12 }}>
                        <TextInput
                            ref={textInputRef}
                            placeholder="Thêm bình luận"
                            multiline={true}
                            placeholderTextColor={'rgba(89, 89, 89, 1)'}
                            value={props.value}
                            onChangeText={props.onChangeText}
                            onFocus={() =>
                                props.onFocus()
                            }
                            editable={true}
                        />
                        {statusTextInput === StatusTextInput.DEFAULT && (
                            <Camera />
                        )}
                    </View>
                </View>
                {statusTextInput !== StatusTextInput.DEFAULT && (
                    <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', marginTop: 8, paddingHorizontal: 16, justifyContent: 'space-between' }}>
                        <Camera style={{ marginLeft: 48 }} />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => {
                                unfocusTextInput()
                                props.onCancel()
                            }}>
                                <Text style={{ fontSize: 14, fontWeight: '500', lineHeight: 16.41, color: 'rgba(89, 89, 89, 1)' }}>
                                    Huỷ
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ backgroundColor: 'rgba(236, 227, 254, 1)', borderRadius: 20, paddingHorizontal: 8, paddingVertical: 6, marginLeft: 28 }}
                                onPress={() => {
                                    unfocusTextInput()
                                    props.onClick()
                                }}
                            >
                                <Text style={{ fontSize: 14, fontWeight: '600', lineHeight: 16.41, color: 'rgba(53, 3, 173, 1)' }}>
                                    {statusTextInput}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
        </>
    )
}

export default QuestionComment;