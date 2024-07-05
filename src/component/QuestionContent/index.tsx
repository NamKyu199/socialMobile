import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./style";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const QuestionContent = ({ item }: any) => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
    const colors = [
        'rgba(171, 81, 228, 1)',
        'rgba(114, 46, 209, 1)',
        'rgba(105, 24, 165, 1)',
        'rgba(74, 10, 120, 1)',
        'rgba(49, 0, 84, 1)',
    ];

    return (
        <>
            <TouchableOpacity onPress={() =>
                navigation.navigate('QuestionDetailScreen', { questionData: item })
            }>
                <Text key={`${item.questionId}-title`} style={styles.title}>
                    {item.title}
                </Text>
            </TouchableOpacity>
            <Text style={styles.description}>
                {item.description}
            </Text>
            {item.images.map((imageUrl: any, index: number) => (
                <Image
                    key={`${item.questionId}-images-${index}`}
                    style={styles.image}
                    source={{ uri: imageUrl }}
                />
            ))}
            <View style={styles.view}>
                {item.topic.slice(0, 3).map((topic: any, index: any) => (
                    <View key={`${item.questionId}-topic-${index}`} style={[styles.viewTopic, { backgroundColor: colors[index], borderRadius: 16 }]}>
                        <Text style={[styles.textTopic, { color: 'rgba(255, 255, 255, 1)', paddingHorizontal: 12 }]}>
                            {topic.trim()}
                        </Text>
                    </View>
                ))}
                {item.topic.length > 3 && (
                    <View style={[styles.viewTopic, { width: 26, backgroundColor: 'rgba(221, 221, 221, 1)', borderRadius: 60 }]}>
                        <Text style={[styles.textTopic, { lineHeight: 14.06, color: 'rgba(89, 89, 89, 1)' }]}>
                            +{item.topic.length - 3}
                        </Text>
                    </View>
                )}
            </View>
        </>
    )
}

export default QuestionContent;
