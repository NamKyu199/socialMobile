import React from "react";
import { Text, Image, View } from "react-native";
import AppImage from "~utils/images/app_images";
import styles from "./style";

const QuestionAnswerContent = ({ questionData }: any) => {
    const colors = [
        'rgba(171, 81, 228, 1)',
        'rgba(114, 46, 209, 1)',
        'rgba(105, 24, 165, 1)',
        'rgba(74, 10, 120, 1)',
        'rgba(49, 0, 84, 1)',
    ];

    return (
        <>
            <Text style={styles.title}>
                {questionData.title}
            </Text>
            <Text style={styles.description}>
                {questionData.description}
            </Text>
            {questionData.images.map((imageUrl: any, index: number) => (
                <Image 
                    key={`${questionData.questionId}-images-${index}`}
                    style={styles.image}
                    source={{uri: imageUrl}}
                />
            ))}
            <View style={styles.row}>
                {questionData.topic.slice(0, 3).map((topic: any, index: any) => (
                    <View key={`${questionData.questionId}-topic-${index}`} style={[styles.viewTopic, { backgroundColor: colors[index], borderRadius: 16 }]}>
                        <Text style={[styles.textTopic, { color: 'rgba(255, 255, 255, 1)', paddingHorizontal: 12 }]}>
                            {topic.trim()}
                        </Text>
                    </View>
                ))}
                {questionData.topic.length > 3 && (
                    <View style={[styles.viewTopic, { width: 26, backgroundColor: 'rgba(221, 221, 221, 1)', borderRadius: 60 }]}>
                        <Text style={[styles.textTopic, { lineHeight: 14.06, color: 'rgba(89, 89, 89, 1)' }]}>
                            +{questionData.topic.length - 3}
                        </Text>
                    </View>
                )}
            </View>
        </>
    )
}

export default QuestionAnswerContent;