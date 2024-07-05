import { Eye, Heart } from "iconsax-react-native";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import AppImage from "~utils/images/app_images";
import { Mores } from "~utils/images/svg";

const CommunityRoute = () => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(10);

    const handleLike = () => {
        if (isLiked) {
            setLikeCount(likeCount - 1)
        } else {
            setLikeCount(likeCount + 1)
        }
        setIsLiked(!isLiked)
    }
    
    return (
        <ScrollView style={{backgroundColor: 'rgba(255, 255, 255, 1)', paddingHorizontal: 16}}>
            <View style={{ height: 330.03, backgroundColor: 'rgba(255, 255, 255, 1)', paddingTop: 16 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={AppImage.avatar} />
                        <View style={{ marginLeft: 12 }}>
                            <Text style={{ fontSize: 14, fontWeight: '700', letterSpacing: 0.1, color: 'rgba(30, 30, 30, 1)' }}>
                                Man Van Truong
                            </Text>
                            <Text style={{ fontSize: 12, fontWeight: '500', color: 'rgba(204, 204, 204, 1)' }}>
                                2 giờ trước
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={{ position: 'absolute', right: 0, bottom: 18 }}
                        // onPress={() => bottomSheetSaveQuestionRef.current?.present()}
                        >
                            <Mores />
                        </TouchableOpacity>
                        {/* <BottomSheetModal
                            ref={bottomSheetSaveQuestionRef}
                            index={0}
                            snapPoints={['10%', '20%']}
                            handleIndicatorStyle={{ width: 60, backgroundColor: 'rgba(204, 204, 204, 1)' }}
                        >
                            <BottomSheetView>
                                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', height: 44, marginLeft: 20 }}>
                                    <ArchiveSlash size={20} variant="Bold" color="rgba(151, 78, 195, 1)" />
                                    <Text style={{ fontSize: 16, fontWeight: '500', lineHeight: 18.75, color: 'rgba(30, 30, 30, 1)', marginLeft: 4 }}>Bỏ lưu câu hỏi</Text>
                                </TouchableOpacity>
                            </BottomSheetView>
                        </BottomSheetModal> */}
                    </View>
                    <Text style={{ fontSize: 18, fontWeight: '600', letterSpacing: 0.4, marginTop: 12 }}>
                        Whereas disregard and contempt for human rights have resulted. Whereas disregard and contempt to t for human rights have ?
                    </Text>
                    <Text style={{ fontSize: 14, fontWeight: '400', letterSpacing: 0.4, color: 'rgba(89, 89, 89, 1)' }}>
                        Whereas disregard and contempt for human rights have resulted. Whereas disregard and contempt to t for human rights have resulted. Whereas disregard and contempt for human rights have resulted
                    </Text>
                    <View style={{ marginTop: 12, flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <View style={{ height: 26, backgroundColor: 'rgba(171, 81, 228, 1)', borderRadius: 16, justifyContent: 'center', marginLeft: 4 }}>
                            <Text style={{ textAlign: 'center', fontSize: 12, fontWeight: '500', color: 'rgba(255, 255, 255, 1)', paddingHorizontal: 12 }}>
                                #Hashtag
                            </Text>
                        </View>
                    </View>
                    <View style={{ borderWidth: 0.4, borderColor: 'rgba(215, 215, 215, 0.8)', marginVertical: 8 }}></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={handleLike}>
                                <View style={{
                                    height: 36,
                                    width: 98,
                                    backgroundColor: isLiked ? 'rgba(82, 5, 127, 1)' : 'rgba(242, 242, 242, 1)',
                                    borderRadius: 20,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Heart
                                        size={16}
                                        color={isLiked ? 'rgba(255, 79, 129, 1)' : 'rgba(166, 166, 166, 1)'}
                                        variant={isLiked ? 'Bold' : 'Linear'}
                                        style={{ marginRight: 1 }}
                                    />
                                    <Text style={{
                                        fontSize: 14,
                                        fontWeight: '400',
                                        color: isLiked ? 'rgba(255, 255, 255, 1)' : 'rgba(89, 89, 89, 1)',
                                        marginLeft: 2,
                                    }}>
                                        {likeCount !== 0 ? `${likeCount} Thích` : `Thích`}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row', marginLeft: 24 }}>
                                <Image source={AppImage.commentIcon} />
                                <Text style={{ marginLeft: 2, fontSize: 14, fontWeight: '500', color: 'rgba(89, 89, 89, 1)', marginRight: 24 }}>
                                    12
                                </Text>
                            </View>
                            <Image source={AppImage.shareIcon} />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Eye size={16} color="rgba(150, 143, 143, 1)" />
                            <Text style={{ marginLeft: 4, fontSize: 14, fontWeight: '500', color: 'rgba(89, 89, 89, 1)' }}>
                                120
                            </Text>
                        </View>
                    </View>
                </View>
        </ScrollView>
    )
}

export default CommunityRoute;