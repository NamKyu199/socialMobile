import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Mores } from "~utils/images/svg";
import styles from "./style";
import moment from "moment";

const QuestionHeader = ({ item, index, bottomSheetQuestionRefs }: any) => {

    const formatVietnamDate = (utcDate: string) => {
        const vietnamDate = moment.utc(utcDate).tz('Asia/Ho_Chi_Minh');
        return vietnamDate.fromNow();
    };
    return (
        <>
            <Image source={{ uri: item.avatar }} style={{ width: 40, height: 40, borderRadius: 100 }} />
            <View style={{ marginLeft: 12 }}>
                <Text style={styles.username}>
                    {item.username}
                </Text>
                <View style={styles.row}>
                    <View style={styles.viewLevel}>
                        <Text style={styles.textLevel}>
                            Người ảnh hưởng
                        </Text>
                    </View>
                    <Text style={styles.time}>
                        {formatVietnamDate(item.createdAt)}
                    </Text>
                </View>
            </View>
            <TouchableOpacity
                style={styles.btn}
                onPress={() => bottomSheetQuestionRefs.current[index]?.present()}
            >
                <Mores />
            </TouchableOpacity>
        </>
    )
}

export default QuestionHeader;