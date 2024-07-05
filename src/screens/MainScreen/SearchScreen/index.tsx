import { Clock, CloseCircle, SearchNormal1 } from "iconsax-react-native";
import React, { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ColorClose } from "~utils/images/svg";

const SearchScreen = ({ navigation }: any) => {
    const [text, setText] = useState('');
    const [showClearText, setShowClearText] = useState(false);
    const [showList, setShowList] = useState(false);
    const [deleteItem, setDeleteItem] = useState(false);

    const clearText = () => {
        setText('');
    }
    return (
        <>
            <View style={{ backgroundColor: 'rgba(255, 255, 255, 1)', height: 108 }}>
                <View style={{ flexDirection: 'row', marginTop: 62, alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 16 }}>
                    <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'rgba(240, 240, 240, 1)', height: 34, width: '100%', borderRadius: 8, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 8 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <SearchNormal1 size={16} color="rgba(89, 89, 89, 1)" />
                            <TextInput
                                style={{ fontSize: 14, fontWeight: '400', lineHeight: 18.2, letterSpacing: 0.001, color: 'rgba(89, 89, 89, 1)', marginLeft: 6 }}
                                placeholder="Tìm kiếm "
                                placeholderTextColor={'rgba(89, 89, 89, 1)'}
                                selectionColor={'rgba(231, 79, 177, 1)'}
                                value={text}
                                onChangeText={(value) => setText(value)}
                                onFocus={() => {
                                    setShowClearText(!showClearText)
                                    setShowList(!showList)
                                }}
                                onSubmitEditing={()=>navigation.navigate('SearchDetailScreen', {text: text})}
                                returnKeyType="done"
                            />
                        </View>
                        {showClearText && (
                            <TouchableOpacity onPress={clearText}>
                                <CloseCircle size={16} color="rgba(166, 166, 166, 1)" variant="Bold" />
                            </TouchableOpacity>
                        )}
                    </View>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={{ fontSize: 14, fontWeight: '500', lineHeight: 16.8, letterSpacing: 0.001, color: 'rgba(231, 79, 177, 1)', marginLeft: 15 }}>
                            Huỷ
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ backgroundColor: 'rgba(255, 255, 255, 1)', paddingVertical: 2 }}>
                {!deleteItem && (
                    <>
                        <View style={{ flexDirection: 'row', alignItems: 'center', height: 40, width: '100%', justifyContent: 'space-between', paddingHorizontal: 16, marginVertical: 2 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Clock color="rgba(166, 166, 166, 1)" size={20} />
                                <Text style={{ fontSize: 16, fontWeight: '400', lineHeight: 18.75, color: 'rgba(89, 89, 89, 1)', marginLeft: 12 }}>
                                    Sức khoẻ mẹ bầu
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => setDeleteItem(!deleteItem)}>
                                <ColorClose />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', height: 40, width: '100%', justifyContent: 'space-between', paddingHorizontal: 16, marginVertical: 2 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Clock color="rgba(166, 166, 166, 1)" size={20} />
                                <Text style={{ fontSize: 16, fontWeight: '400', lineHeight: 18.75, color: 'rgba(89, 89, 89, 1)', marginLeft: 12 }}>
                                    Midu Q7
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => setDeleteItem(!deleteItem)}>
                                <ColorClose />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', height: 40, width: '100%', justifyContent: 'space-between', paddingHorizontal: 16, marginVertical: 2 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Clock color="rgba(166, 166, 166, 1)" size={20} />
                                <Text style={{ fontSize: 16, fontWeight: '400', lineHeight: 18.75, color: 'rgba(89, 89, 89, 1)', marginLeft: 12 }}>
                                    Phát triển chiều cao cho trẻ
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => setDeleteItem(!deleteItem)}>
                                <ColorClose />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', height: 40, width: '100%', justifyContent: 'space-between', paddingHorizontal: 16, marginVertical: 2 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Clock color="rgba(166, 166, 166, 1)" size={20} />
                                <Text style={{ fontSize: 16, fontWeight: '400', lineHeight: 18.75, color: 'rgba(89, 89, 89, 1)', marginLeft: 12 }}>
                                    Sức khoẻ
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => setDeleteItem(!deleteItem)}>
                                <ColorClose />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', height: 40, width: '100%', justifyContent: 'space-between', paddingHorizontal: 16, marginVertical: 2 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Clock color="rgba(166, 166, 166, 1)" size={20} />
                                <Text style={{ fontSize: 16, fontWeight: '400', lineHeight: 18.75, color: 'rgba(89, 89, 89, 1)', marginLeft: 12 }}>
                                    Hội thảo phát triển chiều cao
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => setDeleteItem(!deleteItem)}>
                                <ColorClose />
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </View>
            {!showList && (
                <ScrollView style={{ backgroundColor: 'rgba(255, 255, 255, 1)', marginTop: 12, paddingTop: 12, paddingHorizontal: 16 }}>
                    <Text style={{ fontSize: 18, fontWeight: '700', lineHeight: 21.09, color: 'rgba(30, 30, 30, 1)', marginBottom: 12 }}>
                        Chủ đề được quan tâm
                    </Text>
                    <View style={{ marginBottom: 20 }}>
                        <Text style={{ fontSize: 14, fontWeight: '600', lineHeight: 16.41, color: 'rgba(89, 89, 89, 1)' }}>
                            Phát triển chiều cao - Nổi bật
                        </Text>
                        <View>
                            <Text style={{ fontSize: 16, fontWeight: '500', lineHeight: 18.75, color: 'rgba(114, 46, 209, 1)', marginTop: 8 }}>
                                Dinh dưỡng và chế độ ăn uống
                            </Text>
                            <Text style={{ fontSize: 14, fontWeight: '400', lineHeight: 16.41, color: 'rgba(173, 175, 178, 1)', marginTop: 8 }}>
                                12N bài viết
                            </Text>
                            <View style={{ borderWidth: 0.6, borderColor: 'rgba(215, 215, 215, 0.8)', marginTop: 8 }}></View>
                        </View>
                        <View>
                            <Text style={{ fontSize: 16, fontWeight: '500', lineHeight: 18.75, color: 'rgba(114, 46, 209, 1)', marginTop: 8 }}>
                                Hoạt động và thể dục
                            </Text>
                            <Text style={{ fontSize: 14, fontWeight: '400', lineHeight: 16.41, color: 'rgba(173, 175, 178, 1)', marginTop: 8 }}>
                                12N bài viết
                            </Text>
                            <View style={{ borderWidth: 0.6, borderColor: 'rgba(215, 215, 215, 0.8)', marginTop: 8 }}></View>
                        </View>
                        <View>
                            <Text style={{ fontSize: 16, fontWeight: '500', lineHeight: 18.75, color: 'rgba(114, 46, 209, 1)', marginTop: 8 }}>
                                Chế độ sinh hoạt ảnh hưởng đến phát triển chiều cao
                            </Text>
                            <Text style={{ fontSize: 14, fontWeight: '400', lineHeight: 16.41, color: 'rgba(173, 175, 178, 1)', marginTop: 8 }}>
                                12N bài viết
                            </Text>
                        </View>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Text style={{ fontSize: 14, fontWeight: '600', lineHeight: 16.41, color: 'rgba(89, 89, 89, 1)' }}>
                            Thực phẩm chức năng - Nổi bật
                        </Text>
                        <View>
                            <Text style={{ fontSize: 16, fontWeight: '500', lineHeight: 18.75, color: 'rgba(114, 46, 209, 1)', marginTop: 8 }}>
                                Midu MenaQ7 180mgc - Chân ái cho phát triển chiều cao của bé
                            </Text>
                            <Text style={{ fontSize: 14, fontWeight: '400', lineHeight: 16.41, color: 'rgba(173, 175, 178, 1)', marginTop: 8 }}>
                                12N bài viết
                            </Text>
                            <View style={{ borderWidth: 0.6, borderColor: 'rgba(215, 215, 215, 0.8)', marginTop: 8 }}></View>
                        </View>
                        <View>
                            <Text style={{ fontSize: 16, fontWeight: '500', lineHeight: 18.75, color: 'rgba(114, 46, 209, 1)', marginTop: 8 }}>
                                Hoạt động và thể dục
                            </Text>
                            <Text style={{ fontSize: 14, fontWeight: '400', lineHeight: 16.41, color: 'rgba(173, 175, 178, 1)', marginTop: 8 }}>
                                12N bài viết
                            </Text>
                            <View style={{ borderWidth: 0.6, borderColor: 'rgba(215, 215, 215, 0.8)', marginTop: 8 }}></View>
                        </View>
                        <View>
                            <Text style={{ fontSize: 16, fontWeight: '500', lineHeight: 18.75, color: 'rgba(114, 46, 209, 1)', marginTop: 8 }}>
                                Midu MenaQ7 180mgc - Chân ái cho phát triển chiều cao của bé
                            </Text>
                            <Text style={{ fontSize: 14, fontWeight: '400', lineHeight: 16.41, color: 'rgba(173, 175, 178, 1)', marginTop: 8 }}>
                                12N bài viết
                            </Text>
                        </View>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Text style={{ fontSize: 14, fontWeight: '600', lineHeight: 16.41, color: 'rgba(89, 89, 89, 1)' }}>
                            Thực phẩm chức năng - Nổi bật
                        </Text>
                        <View>
                            <Text style={{ fontSize: 16, fontWeight: '500', lineHeight: 18.75, color: 'rgba(114, 46, 209, 1)', marginTop: 8 }}>
                                Midu MenaQ7 180mgc - Chân ái cho phát triển chiều cao của bé
                            </Text>
                            <Text style={{ fontSize: 14, fontWeight: '400', lineHeight: 16.41, color: 'rgba(173, 175, 178, 1)', marginTop: 8 }}>
                                12N bài viết
                            </Text>
                            <View style={{ borderWidth: 0.6, borderColor: 'rgba(215, 215, 215, 0.8)', marginTop: 8 }}></View>
                        </View>
                        <View>
                            <Text style={{ fontSize: 16, fontWeight: '500', lineHeight: 18.75, color: 'rgba(114, 46, 209, 1)', marginTop: 8 }}>
                                Hoạt động và thể dục
                            </Text>
                            <Text style={{ fontSize: 14, fontWeight: '400', lineHeight: 16.41, color: 'rgba(173, 175, 178, 1)', marginTop: 8 }}>
                                12N bài viết
                            </Text>
                            <View style={{ borderWidth: 0.6, borderColor: 'rgba(215, 215, 215, 0.8)', marginTop: 8 }}></View>
                        </View>
                        <View>
                            <Text style={{ fontSize: 16, fontWeight: '500', lineHeight: 18.75, color: 'rgba(114, 46, 209, 1)', marginTop: 8 }}>
                                Midu MenaQ7 180mgc - Chân ái cho phát triển chiều cao của bé
                            </Text>
                            <Text style={{ fontSize: 14, fontWeight: '400', lineHeight: 16.41, color: 'rgba(173, 175, 178, 1)', marginTop: 8 }}>
                                12N bài viết
                            </Text>
                        </View>
                    </View>
                    <View style={{ height: 50 }}></View>
                </ScrollView>
            )}
        </>
    )
}

export default SearchScreen;