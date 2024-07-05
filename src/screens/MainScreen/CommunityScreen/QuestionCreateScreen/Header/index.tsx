import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Close } from "~utils/images/svg";

const Header = ({styles, navigation, isValid, handleSubmit}: any) => {
    return (
        <>
            <View style={styles.headerView}>
                <Text style={styles.headerText}>Tạo câu hỏi</Text>
                <TouchableOpacity style={styles.prefixIcon} onPress={() => navigation.goBack()}>
                    <Close />
                </TouchableOpacity>
                <TouchableOpacity
                    disabled={!isValid}
                    style={[styles.suffixBtn, { backgroundColor: isValid ? 'rgba(231, 79, 177, 1)' : 'rgba(166, 166, 166, 1)' }]}
                    onPress={() => {
                        handleSubmit()
                    }}
                >
                    <Text style={styles.textBtn}>Đăng</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default Header;