import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { More, Edit2, Trash, ArrowUp2, ArrowDown2 } from "iconsax-react-native";
import React, { useRef, useState } from "react";
import { View, Image, Text, TouchableOpacity, Modal } from "react-native";
import AppImage from "~utils/images/app_images";
import { Canvas, Skia, Path } from "@shopify/react-native-skia";
import QuestionDetailRepliesItem from "~component/QuestionDetailRepliesItem";

const CommentItem = () => {
    const [showReplies, setShowReplies] = useState(false);
    const bottomSheetCommentRef = useRef<BottomSheetModal>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [itemHeight, setItemHeight] = useState(0);

    const path = Skia.Path.Make();
    path.moveTo(20, 4);
    path.lineTo(20, itemHeight);

    return (
        <>
            <View style={{ flexDirection: 'row', marginTop: 12, borderWidth: 0 }} onLayout={(event) => {
                const { height } = event.nativeEvent.layout
                setItemHeight(height)
            }}>
                <View style={{ flexDirection: 'column' }}>
                    <Image source={AppImage.avatar} style={{ width: 40, height: 40 }} />
                    {showReplies && (
                        <Canvas style={{ flex: 1 }}>
                            <Path
                                path={path}
                                color="rgba(166, 166, 166, 1)"
                                style="stroke"
                                strokeWidth={1.2}
                            />
                        </Canvas>
                    )}
                </View>
                <View style={{ flex: 1, marginLeft: 8 }}>
                    <View >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 14, fontWeight: '700', lineHeight: 21, letterSpacing: 0.001, color: 'rgba(30, 30, 30, 1)' }}>
                                Man Van Truong 4
                            </Text>
                            <Text style={{ fontSize: 12, fontWeight: '500', lineHeight: 14.06, color: 'rgba(204, 204, 204, 1)', marginLeft: 20 }}>
                                4 giờ trước
                            </Text>
                        </View>
                        <Text style={{ fontSize: 14, fontWeight: '400', lineHeight: 21, letterSpacing: 0.02, color: 'rgba(89, 89, 89, 1)' }}>
                            Có thể dùng chung được chị nhé nhưng em không khuyến khích mình dùng chung 2 sản phẩm với nhau. Mỗi sản phẩm sẽ có liều lượng phù hợp với cơ thể tránh tình trang dùng chung gây ra bổ sung quá nhiều gây dư thừa chất ạ
                        </Text>
                        <Image source={AppImage.imgComment} style={{ width: '100%', borderRadius: 8, marginBottom: 10 }} />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 14, fontWeight: '500', lineHeight: 16.41, color: 'rgba(89, 89, 89, 1)' }}>
                                10 Thích
                            </Text>
                            <Text style={{ fontSize: 14, fontWeight: '500', lineHeight: 16.41, color: 'rgba(89, 89, 89, 1)', marginHorizontal: 56 }}>
                                Phản hồi
                            </Text>
                            <TouchableOpacity onPress={() => bottomSheetCommentRef.current?.present()}>
                                <More size={16} color="rgba(166, 166, 166, 1)" />
                            </TouchableOpacity>
                            <BottomSheetModal
                                ref={bottomSheetCommentRef}
                                index={0}
                                snapPoints={['10%', '20%']}
                                handleIndicatorStyle={{ width: 60, backgroundColor: 'rgba(204, 204, 204, 1)' }}
                            >
                                <BottomSheetView>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', height: 44, marginLeft: 20 }}>
                                        <Edit2 size={20} variant="Bold" color="rgba(151, 78, 195, 1)" />
                                        <Text style={{ fontSize: 16, fontWeight: '500', lineHeight: 18.75, color: 'rgba(30, 30, 30, 1)', marginLeft: 4 }}>Chỉnh sửa</Text>
                                    </View>
                                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', height: 44, marginLeft: 20 }} onPress={() => { setModalVisible(!modalVisible) }}>
                                        <Trash size={20} variant="Bold" color="rgba(151, 78, 195, 1)" />
                                        <Text style={{ fontSize: 16, fontWeight: '500', lineHeight: 18.75, color: 'rgba(30, 30, 30, 1)', marginLeft: 4 }}>Xoá</Text>
                                    </TouchableOpacity>
                                    <Modal
                                        animationType='fade'
                                        transparent={true}
                                        visible={modalVisible}
                                    >
                                        <View style={{ height: '100%', justifyContent: 'center', backgroundColor: '#000000AA' }}>
                                            <View style={{ backgroundColor: 'rgba(255, 255, 255, 1)', height: '25%', marginHorizontal: 23, borderRadius: 8 }}>
                                                <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '500', lineHeight: 28, color: 'rgba(0, 0, 0, 0.85)', marginTop: 40 }}>Xoá bình luận</Text>
                                                <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: '400', lineHeight: 22, color: 'rgba(0, 0, 0, 0.45)', marginTop: 8 }}>Bạn có chắc chắn xoá bình luận này không?</Text>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 49.5, marginTop: 40 }}>
                                                    <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                                        <Text style={{ fontSize: 16, fontWeight: '600', lineHeight: 24, color: 'rgba(114, 46, 209, 1)' }}>Không</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ backgroundColor: 'rgba(114, 46, 209, 1)', width: 112, height: 36.8, justifyContent: 'center', borderRadius: 8 }}>
                                                        <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '500', lineHeight: 24, color: 'rgba(255, 255, 255, 1)' }}>Xoá</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </Modal>
                                </BottomSheetView>
                            </BottomSheetModal>
                        </View>
                        <TouchableOpacity
                            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}
                            onPress={() => setShowReplies(!showReplies)}
                        >
                            {showReplies ? <ArrowUp2 size={20} color="rgba(53, 3, 173, 1)" variant="Bold" /> : <ArrowDown2 size={20} color="rgba(53, 3, 173, 1)" variant="Bold" />}
                            <Text>8 Phản hồi</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {showReplies && (
                <QuestionDetailRepliesItem />
            )}
        </>
    )
}

export default CommentItem;