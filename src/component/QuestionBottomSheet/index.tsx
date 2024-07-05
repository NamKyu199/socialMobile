import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Archive, ArchiveSlash, Edit2, Trash } from "iconsax-react-native";
import React, { useRef, useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";


const QuestionBottomSheet = ({
    bottomSheetQuestionRefs,
    item,
    index,
    userId,
    handleSaveQuestion,
    handleUnsaveQuestion,
    handleDeleteQuestion,
}: any) => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <BottomSheetModal
            ref={(ref) => bottomSheetQuestionRefs.current[index] = ref}
            index={0}
            snapPoints={['10%', '20%']}
            handleIndicatorStyle={{ width: 60, backgroundColor: 'rgba(204, 204, 204, 1)' }}
        >
            <BottomSheetView>
                {item.userId !== userId ?
                    <>
                        {item.isSaved ?
                            <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: 'center', height: 44, marginLeft: 20 }}
                                onPress={() => {
                                    bottomSheetQuestionRefs.current[index]?.dismiss()
                                    handleUnsaveQuestion(item.questionId)
                                }}
                            >
                                <ArchiveSlash size={20} variant="Bold" color="rgba(151, 78, 195, 1)" />
                                <Text style={{ fontSize: 16, fontWeight: '500', lineHeight: 18.75, color: 'rgba(30, 30, 30, 1)', marginLeft: 4 }}>Bỏ lưu câu hỏi</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: 'center', height: 44, marginLeft: 20 }}
                                onPress={() => {
                                    bottomSheetQuestionRefs.current[index]?.dismiss()
                                    handleSaveQuestion(item.questionId)
                                }}
                            >
                                <Archive size={20} variant="Bold" color="rgba(151, 78, 195, 1)" />
                                <Text style={{ fontSize: 16, fontWeight: '500', lineHeight: 18.75, color: 'rgba(30, 30, 30, 1)', marginLeft: 4 }}>Lưu câu hỏi</Text>
                            </TouchableOpacity>
                        }
                    </>
                    :
                    <>
                        <TouchableOpacity
                            style={{ flexDirection: 'row', alignItems: 'center', height: 44, marginLeft: 20 }}
                            onPress={() => {
                                bottomSheetQuestionRefs.current[index]?.dismiss()
                                navigation.navigate('QuestionUpdateScreen', { questionData: item })
                            }}
                        >
                            <Edit2 size={20} variant="Bold" color="rgba(151, 78, 195, 1)" />
                            <Text style={{ fontSize: 16, fontWeight: '500', lineHeight: 18.75, color: 'rgba(30, 30, 30, 1)', marginLeft: 4 }}>Chỉnh sửa câu hỏi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', height: 44, marginLeft: 20 }} onPress={() => { setModalVisible(!modalVisible) }}>
                            <Trash size={20} variant="Bold" color="rgba(151, 78, 195, 1)" />
                            <Text style={{ fontSize: 16, fontWeight: '500', lineHeight: 18.75, color: 'rgba(30, 30, 30, 1)', marginLeft: 4 }}>Xoá câu hỏi</Text>
                        </TouchableOpacity>
                    </>
                }
                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={{ height: '100%', justifyContent: 'center', backgroundColor: '#000000AA' }}>
                        <View style={{ backgroundColor: 'rgba(255, 255, 255, 1)', height: '25%', marginHorizontal: 23, borderRadius: 8 }}>
                            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '500', lineHeight: 28, color: 'rgba(0, 0, 0, 0.85)', marginTop: 40 }}>Xoá câu hỏi</Text>
                            <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: '400', lineHeight: 22, color: 'rgba(0, 0, 0, 0.45)', marginTop: 8 }}>Bạn có chắc chắn xoá câu hỏi này không?</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 49.5, marginTop: 40 }}>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={{ fontSize: 16, fontWeight: '600', lineHeight: 24, color: 'rgba(114, 46, 209, 1)' }}>Không</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ backgroundColor: 'rgba(114, 46, 209, 1)', width: 112, height: 36.8, justifyContent: 'center', borderRadius: 8 }}
                                    onPress={() => {
                                        handleDeleteQuestion(item.questionId)
                                        setModalVisible(false);
                                    }}
                                >
                                    <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '500', lineHeight: 24, color: 'rgba(255, 255, 255, 1)' }}>Xoá</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </BottomSheetView>
        </BottomSheetModal>
    )
}

export default React.memo(QuestionBottomSheet);