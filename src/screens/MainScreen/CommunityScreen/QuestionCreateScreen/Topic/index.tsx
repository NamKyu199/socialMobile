import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { PlusCircle } from "~utils/images/svg";

const Topic = ({styles, hashtag, handleHashtagChange, addHashtag}: any) => {
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const startEditing = (index: number) => {
        setEditingIndex(index);
    };

    const stopEditing = () => {
        setEditingIndex(null);
    };
    const colors = [
        'rgba(171, 81, 228, 1)',
        'rgba(114, 46, 209, 1)',
        'rgba(105, 24, 165, 1)',
        'rgba(74, 10, 120, 1)',
        'rgba(49, 0, 84, 1)',
    ];

    return (
        <>
            <View style={styles.textView}>
                <Text style={styles.text}>Chủ đề</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {hashtag.map((hashtag: any, index: any) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => startEditing(index)}
                            style={{ height: 26, backgroundColor: colors[index], borderRadius: 16, justifyContent: 'center', marginRight: 4, marginBottom: 2 }}
                        >
                            {editingIndex === index ? (
                                <TextInput
                                    style={{ textAlign: 'center', fontSize: 12, fontWeight: '500', color: 'rgba(255, 255, 255, 1)', paddingHorizontal: 12 }}
                                    value={hashtag}
                                    onChangeText={(text) => handleHashtagChange(index, text)}
                                    onBlur={stopEditing}
                                />
                            ) : (
                                <Text style={{ textAlign: 'center', fontSize: 12, fontWeight: '500', color: 'rgba(255, 255, 255, 1)', paddingHorizontal: 12 }}>
                                    {hashtag}
                                </Text>
                            )}
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(24, 144, 255, 1)', borderRadius: 16, width: 114, height: 28 }}
                        onPress={addHashtag}
                    >
                        <PlusCircle fill={'rgba(24, 144, 255, 1)'}/>
                        <Text style={{ fontSize: 12, fontWeight: '400', color: 'rgba(24, 144, 255, 1)' }}>Thêm chủ đề</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default Topic;