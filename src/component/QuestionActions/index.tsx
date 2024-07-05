import { Eye, Heart } from "iconsax-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { CommentIcon, ShareIcon } from "~utils/images/svg";
import styles from "./style";

const QuestionActions = ({ item, handleVoteQuestion }: any) => {
    return (
        <View style={styles.container}>
            <View style={[styles.row, { alignItems: 'center' }]}>
                <TouchableOpacity onPress={() => handleVoteQuestion(item.questionId)}>
                    <View style={[styles.viewLike, { backgroundColor: item.isVoted ? 'rgba(82, 5, 127, 1)' : 'rgba(242, 242, 242, 1)' }]}>
                        <Heart
                            size={16}
                            color={item.isVoted ? 'rgba(255, 79, 129, 1)' : 'rgba(166, 166, 166, 1)'}
                            variant={item.isVoted ? 'Bold' : 'Linear'}
                            style={{ marginRight: 1 }}
                        />
                        <Text style={[styles.textLike, { color: item.isVoted ? 'rgba(255, 255, 255, 1)' : 'rgba(89, 89, 89, 1)' }]}>
                            {item.totalVotes !== 0 ? item.totalVotes + ' Thích' : 'Thích'}
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={[styles.row, { marginLeft: 24 }]}>
                    <CommentIcon />
                    <Text style={[styles.text, { marginLeft: 2, marginRight: 24 }]}>
                        {item.totalAnswers}
                    </Text>
                </View>
                <ShareIcon />
            </View>
            <View style={[styles.row, { alignItems: 'center' }]}>
                <Eye size={16} color="rgba(150, 143, 143, 1)" />
                <Text style={[styles.text, { marginLeft: 4 }]}>
                    {item.totalViews}
                </Text>
            </View>
        </View>
    )
}

export default QuestionActions;