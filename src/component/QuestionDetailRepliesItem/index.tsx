import React, { useState } from "react";
import { View, Image, Text, FlatList } from "react-native";
import AppImage from "~utils/images/app_images";
import { Canvas, Skia, Path } from "@shopify/react-native-skia";
import { QuestionRepliesAnswerModel } from "~models/QuestionRepliesAnswerModel";

const QuestionDetailRepliesItem = ({ questionRepliesAnswerData, totalRepliesAnswer }: any) => {
    const [itemHeight, setItemHeight] = useState(0);

    const path = Skia.Path.Make();
    path.moveTo(20, 0);
    path.quadTo(20, 20, 43, 20);
    // path.quadTo(29, 20, 20, 0);
    // path.lineTo(20, itemHeight)

    const path1 = Skia.Path.Make();
    path1.moveTo(43, 20);
    path1.quadTo(20, 20, 20, 0);
    path1.lineTo(20, itemHeight);

    const renderQuestionRepliesAnswerItem = (item: QuestionRepliesAnswerModel, index: number) => (
        <>
            <View style={{ flexDirection: 'row', flex: 1 }} onLayout={(event) => {
                const { height } = event.nativeEvent.layout
                setItemHeight(height)
            }}>
                <Canvas style={{ width: 51 }}>
                    <Path
                        path={path}
                        color="rgba(166, 166, 166, 1)"
                        style="stroke"
                        strokeWidth={1.2}
                    />
                    {index < totalRepliesAnswer - 1 && (
                        <Path
                            path={path1}
                            color="rgba(166, 166, 166, 1)"
                            style="stroke"
                            strokeWidth={1.2}
                        />
                    )}
                </Canvas>
                <Image source={AppImage.avatar} style={{ width: 24, height: 24, marginTop: 8 }} />
                <View style={{ flex: 1, marginLeft: 8, marginTop: 8 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 12, fontWeight: '700', lineHeight: 18, letterSpacing: 0.001, color: 'rgba(30, 30, 30, 1)' }}>
                            {item.username}
                        </Text>
                        <Text style={{ fontSize: 12, fontWeight: '500', lineHeight: 14.06, color: 'rgba(204, 204, 204, 1)', marginLeft: 20 }}>
                            {item.createdAt}
                        </Text>
                    </View>
                    <Text style={{ fontSize: 14, fontWeight: '400', lineHeight: 21, letterSpacing: 0.004, color: 'rgba(89, 89, 89, 1)' }}>
                        {item.content}
                    </Text>
                    {item.image !== null && (
                        <Image source={{uri: item.image}} style={{height: 120, width: '100%', borderRadius: 8, marginBottom: 6}}/>
                    )}
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                        <Text style={{ fontSize: 14, fontWeight: '500', lineHeight: 16.41, color: 'rgba(89, 89, 89, 1)' }}>
                            {item.totalVotes !== 0 ? item.totalVotes + ' Thích' : 'Thích'}
                        </Text>
                        <Text style={{ fontSize: 14, fontWeight: '500', lineHeight: 16.41, color: 'rgba(89, 89, 89, 1)', marginHorizontal: 56 }}>
                            Phản hồi
                        </Text>
                    </View>
                </View>
            </View>
        </>
    )

    return (
        <>
            <FlatList
                data={questionRepliesAnswerData}
                renderItem={({ item, index }) => renderQuestionRepliesAnswerItem(item, index)}
                keyExtractor={(subItem) => subItem.answerId.toString()}
            />
        </>
    )
}

export default QuestionDetailRepliesItem;