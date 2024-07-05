import { Heart, Eye } from "iconsax-react-native";
import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { CommentIcon, ShareIcon } from "~utils/images/svg";

const QuestionAnswerAction = ({questionData}: any) => {
    
    return (
        <>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity>
                        <View style={{
                            height: 36,
                            width: 98,
                            backgroundColor: questionData.isVoted ? 'rgba(82, 5, 127, 1)' : 'rgba(242, 242, 242, 1)',
                            borderRadius: 20,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Heart
                                size={16}
                                color={questionData.isVoted ? 'rgba(255, 79, 129, 1)' : 'rgba(166, 166, 166, 1)'}
                                variant={questionData.isVoted ? 'Bold' : 'Linear'}
                                style={{ marginRight: 1 }}
                            />
                            <Text style={{
                                fontSize: 14,
                                fontWeight: '400',
                                color: questionData.isVoted ? 'rgba(255, 255, 255, 1)' : 'rgba(89, 89, 89, 1)',
                                marginLeft: 2,
                            }}>
                                {questionData.totalVotes !== 0 ? questionData.totalVotes + ' Thích' : 'Thích'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', marginLeft: 24 }}>
                        <CommentIcon />
                        <Text style={{ marginLeft: 2, fontSize: 14, fontWeight: '500', color: 'rgba(89, 89, 89, 1)', marginRight: 24 }}>
                            {questionData.totalAnswers}
                        </Text>
                    </View>
                    <ShareIcon />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Eye size={16} color="rgba(150, 143, 143, 1)" />
                    <Text style={{ marginLeft: 4, fontSize: 14, fontWeight: '500', color: 'rgba(89, 89, 89, 1)' }}>
                        {questionData.totalViews}
                    </Text>
                </View>
            </View>
        </>
    )
}

export default QuestionAnswerAction;